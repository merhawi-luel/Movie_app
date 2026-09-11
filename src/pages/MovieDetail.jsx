import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Plus, Check } from "lucide-react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/movie/MovieCard";
import TrailerModal from "../components/movie/TrailerModal";
import RatingBadge from "../components/ui/RatingBadge";
import { useWatchlist } from "../context/WatchlistContext";

function MovieDetail() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: movie, loading, error } = useMovies(`/movie/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(`/movie/${id}/credits`);
  const { data: videos, loading: videosLoading } = useMovies(`/movie/${id}/videos`);
  const { data: similar, loading: similarLoading } = useMovies(`/movie/${id}/similar`);

  if (loading) return <p className="p-6 text-cinema-text">Loading...</p>;
  if (error) return <p className="p-6 text-cinema-text">Something went wrong.</p>;

  const trailer = videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const cast = credits?.cast?.slice(0, 10) || [];
  const similarMovies = similar?.results?.slice(0, 10) || [];
  const inWatchlist = isInWatchlist(movie.id);

  function handleWatchlistClick() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        genre_ids: movie.genres?.map((g) => g.id) || [],
      });
    }
  }

  function formatRuntime(minutes) {
    if (!minutes) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  return (
    <div>
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-transparent" />

        <div className="relative z-10 flex gap-6 px-8 pb-10 items-end max-w-4xl">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-40 rounded-lg shadow-lg hidden sm:block"
          />

          <div>
            <div className="flex gap-2 mb-3">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs font-bold uppercase text-cinema-accent border border-cinema-accent/50 bg-cinema-accent/10 px-3 py-1 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-cinema-text mb-3">{movie.title}</h1>

            <div className="flex items-center gap-3 text-sm text-cinema-muted mb-4">
              <RatingBadge rating={movie.vote_average} />
              <span>{movie.release_date?.slice(0, 4)}</span>
              {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
            </div>

            <p className="text-cinema-text/90 max-w-xl mb-6">{movie.overview}</p>

            <div className="flex gap-4">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
                >
                  <Play size={18} fill="white" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition ${
                  inWatchlist
                    ? "bg-cinema-accent text-white hover:brightness-110"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {!creditsLoading && cast.length > 0 && (
        <section className="px-8 py-8">
          <h2 className="text-xl font-semibold text-cinema-text mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {cast.map((person) => (
              <div key={person.id} className="w-28 shrink-0 text-center">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : "https://placehold.co/185x278?text=No+Image"
                  }
                  alt={person.name}
                  className="w-full h-36 object-cover rounded-lg mb-2"
                />
                <p className="text-cinema-text text-xs font-semibold truncate">{person.name}</p>
                <p className="text-cinema-muted text-xs truncate">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!similarLoading && similarMovies.length > 0 && (
        <section className="px-8 py-8">
          <h2 className="text-xl font-semibold text-cinema-text mb-4">Similar Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {similarMovies.map((m) => (
              <div key={m.id} className="w-48 shrink-0">
                <MovieCard movie={m} />
              </div>
            ))}
          </div>
        </section>
      )}

      {showTrailer && trailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}

export default MovieDetail;