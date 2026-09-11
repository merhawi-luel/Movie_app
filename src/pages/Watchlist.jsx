import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/movie/MovieCard";

function Watchlist() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <h2 className="text-2xl font-bold text-cinema-text mb-2">
          Your watchlist is empty
        </h2>
        <p className="text-cinema-muted mb-6">
          Add movies you want to watch later by clicking the + icon on any card.
        </p>
        <Link
          to="/browse"
          className="bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-cinema-text mb-6">
        My Watchlist ({watchlist.length})
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;