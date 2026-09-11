import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Plus, Check, Star, ArrowLeft, Clock } from "lucide-react";
import useMovies from "../hooks/useMovies";
import { useWatchlist } from "../context/WatchlistContext";
import TrailerModal from "../components/movie/TrailerModal";
import MediaGrid from "../components/movie/MediaGrid";
import RatingBadge from "../components/ui/RatingBadge";

function MediaDetail({ mediaType }) {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);

  const { data: details, loading, error } = useMovies(`/${mediaType}/${id}`);
  const { data: credits, loading: creditsLoading } = useMovies(
    `/${mediaType}/${id}/credits`
  );
  const { data: videos } = useMovies(`/${mediaType}/${id}/videos`);
  const { data: similar, loading: similarLoading } = useMovies(
    `/${mediaType}/${id}/similar`
  );

  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(id);

  // Reset scroll and trailer state when moving between titles
  useEffect(() => {
    window.scrollTo(0, 0);
    setTrailerKey(null);
  }, [id]);

  const trailer = videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  if (loading) {
    return <p className="p-6 text-cinema-text">Loading...</p>;
  }

  if (error || !details) {
    return (
      <div className="p-6 flex flex-col items-center gap-4">
        <p className="text-cinema-text">Something went wrong.</p>
        <Link
          to="/"
          className="bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const title = details.title || details.name;
  const dateField = details.release_date || details.first_air_date;
  const year = dateField?.slice(0, 4);
  const runtime = details.episode_run_time?.[0] || details.runtime;
  const crew = credits?.crew || [];
  const director = crew.find((member) => member.job === "Director");
  const creator = details.created_by?.[0]?.name;

  function handleWatchlistClick() {
    if (inWatchlist) {
      removeFromWatchlist(details.id);
    } else {
      addToWatchlist({
        id: details.id,
        title: details.title,
        name: details.name,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
        release_date: details.release_date,
        first_air_date: details.first_air_date,
        genre_ids: details.genres?.map((genre) => genre.id) || [],
        mediaType,
      });
    }
  }

  return (
    <div>
      {/* Backdrop hero */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${
            details.backdrop_path || details.poster_path
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/60 to-transparent" />

        <div className="relative z-10 px-8 pb-10 max-w-3xl">
          <Link
            to={mediaType === "tv" ? "/series" : "/browse"}
            className="flex items-center gap-2 text-cinema-muted hover:text-cinema-text transition mb-4"
          >
            <ArrowLeft size={18} />
            Back to {mediaType === "tv" ? "Series" : "Movies"}
          </Link>

          {details.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {details.genres.slice(0, 4).map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs font-bold uppercase text-cinema-accent border border-cinema-accent/50 bg-cinema-accent/10 px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-5xl font-bold text-cinema-text mb-3">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-cinema-muted mb-4">
            <RatingBadge rating={details.vote_average} />
            {year && <span>{year}</span>}
            {runtime && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {`${Math.floor(runtime / 60)}h ${runtime % 60}m`}
              </span>
            )}
            {mediaType === "tv" && details.number_of_seasons && (
              <span>
                {details.number_of_seasons} season
                {details.number_of_seasons > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {trailer && (
              <button
                onClick={() => setTrailerKey(trailer.key)}
                className="flex items-center gap-2 bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
              >
                <Play size={18} fill="white" />
                Play Trailer
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

      {/* Overview + facts */}
      <div className="px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-cinema-text mb-3">Overview</h2>
          <p className="text-cinema-text/90 leading-relaxed">
            {details.overview || "No overview available."}
          </p>

          {creditsLoading && (
            <p className="text-cinema-muted mt-6 text-sm">Loading credits...</p>
          )}

          {credits && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
              {director && (
                <div>
                  <p className="text-cinema-muted text-xs uppercase tracking-wide">
                    Director
                  </p>
                  <p className="text-cinema-text font-medium">{director.name}</p>
                </div>
              )}
              {creator && (
                <div>
                  <p className="text-cinema-muted text-xs uppercase tracking-wide">
                    Creator
                  </p>
                  <p className="text-cinema-text font-medium">{creator}</p>
                </div>
              )}
              {credits.cast?.slice(0, 4).map((member) => (
                <div key={member.credit_id}>
                  <p className="text-cinema-muted text-xs uppercase tracking-wide">
                    {member.character ? "Starring" : "Cast"}
                  </p>
                  <p className="text-cinema-text font-medium">{member.name}</p>
                  {member.character && (
                    <p className="text-cinema-muted text-sm">{member.character}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4 text-sm">
          {details.status && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">Status</p>
              <p className="text-cinema-text">{details.status.replace(/_/g, " ")}</p>
            </div>
          )}
          {dateField && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                {mediaType === "tv" ? "First Aired" : "Release Date"}
              </p>
              <p className="text-cinema-text">{dateField}</p>
            </div>
          )}
          {details.vote_count > 0 && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">Votes</p>
              <p className="text-cinema-text flex items-center gap-1">
                <Star size={12} className="text-cinema-gold" fill="currentColor" />
                {details.vote_average.toFixed(1)} ({details.vote_count.toLocaleString()}{" "}
                votes)
              </p>
            </div>
          )}
          {details.spoken_languages?.length > 0 && (
            <div>
              <p className="text-cinema-muted text-xs uppercase tracking-wide">
                Languages
              </p>
              <p className="text-cinema-text">
                {details.spoken_languages.map((lang) => lang.english_name).join(", ")}
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Similar titles */}
      {similar?.results?.length > 0 && (
        <div className="px-8 pb-12">
          <h2 className="text-xl font-semibold text-cinema-text mb-4">
            More Like This
          </h2>
          <MediaGrid
            items={similar.results.slice(0, 10)}
            loading={similarLoading}
            mediaType={mediaType}
          />
        </div>
      )}

      {trailerKey && <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />}
    </div>
  );
}

export default MediaDetail;
