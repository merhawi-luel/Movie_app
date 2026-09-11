import { useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import MediaCard from "../components/movie/MediaCard";

function CelebrityDetail() {
  const { id } = useParams();

  const { data: person, loading, error } = useMovies(`/person/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(`/person/${id}/combined_credits`);

  if (loading) return <p className="p-6 text-cinema-text">Loading...</p>;
  if (error) return <p className="p-6 text-cinema-text">Something went wrong.</p>;

  const filmography = credits?.cast
    ?.filter((item) => item.poster_path)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 12) || [];

  return (
    <div className="px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
              : "https://placehold.co/342x513?text=No+Image"
          }
          alt={person.name}
          className="w-48 rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-cinema-text mb-2">{person.name}</h1>
          <p className="text-cinema-muted text-sm mb-4">
            {person.known_for_department}
            {person.birthday && ` · Born ${person.birthday}`}
            {person.place_of_birth && ` in ${person.place_of_birth}`}
          </p>
          <p className="text-cinema-text/90 max-w-2xl">
            {person.biography || "No biography available."}
          </p>
        </div>
      </div>

      {!creditsLoading && filmography.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-cinema-text mb-4">Known For</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filmography.map((item) => (
              <MediaCard
                key={item.id}
                media={item}
                mediaType={item.media_type}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CelebrityDetail;