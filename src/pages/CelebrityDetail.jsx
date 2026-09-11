import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import useMovies from "../hooks/useMovies";
import MediaCard from "../components/movie/MediaCard";

function CelebrityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person, loading, error } = useMovies(`/person/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(
    `/person/${id}/combined_credits`
  );

  // Reset scroll when moving between people
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <p className="p-6 text-cinema-text">Loading...</p>;
  }

  if (error || !person) {
    return (
      <div className="p-6 flex flex-col items-center gap-4">
        <p className="text-cinema-text">Something went wrong.</p>
        <Link
          to="/celebrities"
          className="bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
        >
          Back to Celebrities
        </Link>
      </div>
    );
  }

  const filmography =
    credits?.cast
      ?.filter((item) => item.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 12) || [];

  const totalCredits =
    (credits?.cast?.length || 0) + (credits?.crew?.length || 0);

  return (
    <div>
      {/* Photo hero */}
      <div className="relative flex items-end overflow-hidden">
        {person.profile_path && (
          <div
            className="absolute inset-0 bg-cover bg-center blur-1x1 scale-110 opacity-100"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${person.profile_path})`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-cinema-bg/40" />

        <div className="relative z-10 px-8 py-10 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/10 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition mb-6"
          >
            Back to Celebrities
          </button>

          <div className="flex flex-col sm:flex-row gap-8">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
                  : "https://placehold.co/342x513?text=No+Image"
              }
              alt={person.name}
              className="w-48 shrink-0 rounded-lg shadow-lg"
            />

            <div>
              {person.known_for_department && (
                <span className="inline-block text-xs font-bold uppercase text-cinema-accent border border-cinema-accent/50 bg-cinema-accent/10 px-3 py-1 rounded-full mb-4">
                  {person.known_for_department}
                </span>
              )}

              <h1 className="text-5xl font-bold text-cinema-text mb-3">
                {person.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-cinema-muted">
                {person.popularity > 0 && (
                  <span className="flex items-center gap-1 text-cinema-gold">
                    <Star size={12} fill="currentColor" />
                    {person.popularity.toFixed(1)} popularity
                  </span>
                )}
                {person.birthday && <span>Born {person.birthday}</span>}
                {person.deathday && <span>Died {person.deathday}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography + facts */}
      <div className="px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-cinema-text mb-3">
            Biography
          </h2>
          <p className="text-cinema-text/90 leading-relaxed whitespace-pre-line">
            {person.biography || "No biography available."}
          </p>
        </div>

        <aside className="space-y-4 text-sm">
          {person.birthday && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Born
              </p>
              <p className="text-cinema-text">{person.birthday}</p>
            </div>
          )}
          {person.deathday && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Died
              </p>
              <p className="text-cinema-text">{person.deathday}</p>
            </div>
          )}
          {person.place_of_birth && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Place of Birth
              </p>
              <p className="text-cinema-text">{person.place_of_birth}</p>
            </div>
          )}
          {person.known_for_department && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Known For
              </p>
              <p className="text-cinema-text">{person.known_for_department}</p>
            </div>
          )}
          {totalCredits > 0 && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Credits
              </p>
              <p className="text-cinema-text">
                {totalCredits.toLocaleString()} titles
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Known for */}
      <div className="px-8 pb-12">
        <h2 className="text-xl font-semibold text-cinema-text mb-4">
          Known For
        </h2>

        {creditsLoading ? (
          <p className="text-cinema-muted text-sm">Loading credits...</p>
        ) : filmography.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filmography.map((item) => (
              <MediaCard key={item.id} media={item} mediaType={item.media_type} />
            ))}
          </div>
        ) : (
          <p className="text-cinema-muted text-sm">
            No filmography available.
          </p>
        )}
      </div>
    </div>
  );
}

export default CelebrityDetail;