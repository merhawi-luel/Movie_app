import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Toast from "./components/ui/Toast";
import { useWatchlist } from "./context/WatchlistContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";

export default function App() {
  const { toastMessage } = useWatchlist();

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg text-cinema-text">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast message={toastMessage} />
    </div>
  );
}