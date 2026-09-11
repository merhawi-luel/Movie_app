import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWatchlist } from "../../context/WatchlistContext";

function Navbar() {
  const { watchlist } = useWatchlist();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/browse" },
    { label: "Series", path: "/series" },
    { label: "Celebrities", path: "/celebrities" },
    { label: "Search", path: "/search" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-cinema-bg/95 backdrop-blur-md border-b border-cinema-muted/10"
          : "bg-gradient-to-b from-black/75 to-transparent"
      }`}
    >
      <Link to="/" className="text-2xl tracking-wider text-white select-none">
        CINEMA
      </Link>

      <div className="hidden md:flex items-center gap-8 bg-cinema-surface/60 border border-cinema-muted/20 rounded-full px-2 py-1.5">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
              location.pathname === link.path
                ? "bg-cinema-accent text-white"
                : "text-cinema-muted hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        to="/watchlist"
        className="relative flex items-center gap-2 bg-cinema-accent hover:brightness-110 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
      >
        Watchlist
        {watchlist.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-cinema-accent text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {watchlist.length}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;