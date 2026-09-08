import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-white tracking-wide">
        CINEMA<span className="text-red-600">.</span>
      </Link>

      <div className="hidden sm:flex gap-6 text-sm text-gray-300">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/browse" className="hover:text-white transition-colors">
          Browse
        </Link>
        <Link to="/search" className="hover:text-white transition-colors">
          Search
        </Link>
      </div>

      <Link
        to="/watchlist"
        className="relative text-sm text-gray-300 hover:text-white transition-colors"
      >
        Watchlist
        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-red-600 text-white rounded-full">
          0
        </span>
      </Link>
    </nav>
  );
}

export default Navbar;