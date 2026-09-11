import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Toast from "./components/ui/Toast";
import { useWatchlist } from "./context/WatchlistContext";
import Home from "./pages/Home";
import MediaBrowse from "./pages/MediaBrowse";
import MediaDetail from "./pages/MediaDetail";
import Celebrities from "./pages/Celebrities";
import CelebrityDetail from "./pages/CelebrityDetail";
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
          <Route path="/browse" element={<MediaBrowse mediaType="movie" />} />
          <Route path="/series" element={<MediaBrowse mediaType="tv" />} />
          <Route path="/movie/:id" element={<MediaDetail mediaType="movie" />} />
          <Route path="/tv/:id" element={<MediaDetail mediaType="tv" />} />
          <Route path="/celebrities" element={<Celebrities />} />
          <Route path="/person/:id" element={<CelebrityDetail />} />
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