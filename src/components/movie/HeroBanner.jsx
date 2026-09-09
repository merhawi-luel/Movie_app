import { useState, useEffect } from "react";
import { Play, Info, Star } from "lucide-react";
import useMovies from "../../hooks/useMovies";

function HeroBanner({ movies = [], genreMap = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) {
    return null;
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie) => (
          <HeroSlide
            key={movie.id}
            movie={movie}
            genreMap={genreMap}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-8 z-20 flex gap-2">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-cinema-accent"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroSlide({ movie, genreMap }) {
  const { data: details, loading } = useMovies(`/movie/${movie.id}`);

  const year = movie.release_date?.slice(0, 4);

  const genreNames = movie.genre_ids
    ?.slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean);

  function formatRuntime(minutes) {
    if (!minutes) return null;

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m}m`;
  }

  return (
    <div
      className="relative min-w-full h-full bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/60 to-transparent" />

      <div className="relative z-10 px-8 pb-10 max-w-2xl">
        
        {genreNames?.length > 0 && (
          <div className="flex gap-2 mb-4">
            {genreNames.map((name) => (
              <span
                key={name}
                className="text-xs font-bold uppercase text-cinema-accent border border-cinema-accent/50 bg-cinema-accent/10 px-3 py-1 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-5xl font-bold text-cinema-text mb-3">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-cinema-muted mb-4">
          <span className="flex items-center gap-1 text-cinema-gold">
            <Star size={14} fill="currentColor" />
            {movie.vote_average?.toFixed(1)}
          </span>

          {year && <span>{year}</span>}

          {!loading && details?.runtime && (
            <span>{formatRuntime(details.runtime)}</span>
          )}
        </div>

        <p className="text-cinema-text/90 mb-6 line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition">
            <Play size={18} fill="white" />
            Play Now
          </button>

          <button className="flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition">
            <Info size={18} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;