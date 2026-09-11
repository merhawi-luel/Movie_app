import { Link } from "react-router-dom";
import { Star, Play, Plus, Check } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";

function MovieCard({ movie, genreMap = {} }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const primaryGenre = movie.genre_ids?.[0];
  const genreName = genreMap[primaryGenre];
  const year = movie.release_date?.slice(0, 4);

  function handleWatchlistClick(e) {
    e.preventDefault();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative group block rounded-lg overflow-hidden bg-cinema-surface shadow-md hover:scale-105 transition-transform"
    >
      {genreName && (
        <span className="absolute top-2 left-2 z-10 bg-cinema-accent text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">
          {genreName}
        </span>
      )}

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <span className="bg-cinema-accent text-white rounded-full p-3 hover:scale-110 transition-transform">
          <Play size={20} fill="white" />
        </span>
        <button
          onClick={handleWatchlistClick}
          className={`rounded-full p-3 hover:scale-110 transition-transform ${
            inWatchlist ? "bg-cinema-accent text-white" : "bg-white/20 text-white"
          }`}
        >
          {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
        </button>
      </div>

      <div className="p-3">
        <h2 className="text-cinema-text font-semibold text-sm truncate">{movie.title}</h2>
        <div className="flex items-center gap-2 mt-1 text-xs text-cinema-muted">
          <span className="flex items-center gap-1 text-cinema-gold">
            <Star size={12} fill="currentColor" />
            {movie.vote_average?.toFixed(1)}
          </span>
          {year && <span>{year}</span>}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;