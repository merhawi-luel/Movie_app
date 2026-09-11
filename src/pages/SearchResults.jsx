import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useMovies from "../hooks/useMovies";
import SearchInput from "../components/ui/SearchInput";
import MovieGrid from "../components/movie/MovieGrid";

function SearchResults() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const endpoint = debouncedQuery
    ? `/search/movie?query=${encodeURIComponent(debouncedQuery)}`
    : null;

  const { data, loading, error } = useMovies(endpoint);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-cinema-text mb-6">Search</h1>

      <div className="max-w-xl mb-8">
        <SearchInput value={query} onChange={setQuery} />
      </div>

      {!debouncedQuery && (
        <p className="text-cinema-muted">Start typing to search for movies.</p>
      )}

      {debouncedQuery && error && (
        <p className="text-cinema-text">Something went wrong.</p>
      )}

      {debouncedQuery && !error && !loading && data?.results?.length === 0 && (
        <p className="text-cinema-muted">No results found for "{debouncedQuery}".</p>
      )}

      {debouncedQuery && !error && (loading || data?.results?.length > 0) && (
        <MovieGrid movies={data?.results || []} loading={loading} />
      )}
    </div>
  );
}

export default SearchResults;