import useMovies from "../hooks/useMovies";
import PersonCard from "../components/people/PersonCard";
import SkeletonCard from "../components/movie/SkeletonCard";

function Celebrities() {
  const { data, loading, error } = useMovies("/person/popular");

  if (error) {
    return <p className="p-6 text-cinema-text">Something went wrong.</p>;
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-cinema-text mb-6">Celebrities</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : data.results.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
      </div>
    </div>
  );
}

export default Celebrities;