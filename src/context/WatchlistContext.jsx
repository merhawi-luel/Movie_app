import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Auto-clear the toast after 3s; the cleanup cancels a pending timer
  // whenever a new message arrives, so overlapping timers can't stack up.
  useEffect(() => {
    if (!toastMessage) return undefined;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  function addToWatchlist(movie) {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
    setToastMessage(`Added "${movie.title || movie.name}" to your watchlist`);
  }

  function removeFromWatchlist(movieId) {
    // Look up the title from the CURRENT watchlist BEFORE removing it,
    // otherwise the movie is gone and we can't build the toast message.
    const movie = watchlist.find((m) => m.id === movieId);
    setToastMessage(
      movie
        ? `Removed "${movie.title || movie.name}" from your watchlist`
        : "Removed from watchlist"
    );
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }

  function isInWatchlist(movieId) {
    return watchlist.some((m) => m.id === movieId);
  }

  const value = {
    watchlist,
    toastMessage,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}