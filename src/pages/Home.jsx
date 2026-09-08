import useMovies from "../hooks/useMovies";
import MovieCard from "../components/movie/MovieCard";

function Home() {
  const { data, loading, error } = useMovies("/movie/popular");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Home;