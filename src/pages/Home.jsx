import useMovies from "../hooks/useMovies";

function Home() {
  const { data, loading, error } = useMovies("/movie/popular");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div>
      {/* map over data.results, render each movie's title */}
      {/* remember: each item in a list needs a unique "key" prop */}
    </div>
  );
}

export default Home;