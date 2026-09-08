import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-800 bg-black/40 px-6 py-8 text-sm text-gray-400">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
        <Link to="/" className="text-white font-bold tracking-wide">
          CINEMA<span className="text-red-600">.</span>
        </Link>

        <div className="flex gap-6">
          <Link to="/browse" className="hover:text-white transition-colors">
            Browse
          </Link>
          <Link to="/search" className="hover:text-white transition-colors">
            Search
          </Link>
          <Link to="/watchlist" className="hover:text-white transition-colors">
            Watchlist
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center sm:text-right">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>

      <p className="text-center text-xs text-gray-600 mt-6">
        © {new Date().getFullYear()} Cinema. Built for learning purposes.
      </p>
    </footer>
  );
}

export default Footer;