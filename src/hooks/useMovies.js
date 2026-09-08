import { useState, useEffect } from "react";
import tmdb from "../api/tmdb";

function useMovies(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await tmdb.get(endpoint, {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [endpoint]);

  return { data, loading, error };
}

export default useMovies;