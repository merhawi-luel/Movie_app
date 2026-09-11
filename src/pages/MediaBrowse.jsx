import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MediaGrid from "../components/movie/MediaGrid";
import GenreFilter from "../components/ui/GenreFilter";
import SortSelect from "../components/ui/SortSelect";

function MediaBrowse({ mediaType }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const genresResult = useMovies(`/genre/${mediaType}/list`);

  const endpoint =
    `/discover/${mediaType}?sort_by=${sortBy}` +
    (selectedGenre ? `&with_genres=${selectedGenre}` : "");

  const { data, loading, error } = useMovies(endpoint);

  if (genresResult.error || error) {
    return <p className="p-6 text-cinema-text">Something went wrong.</p>;
  }

  const genreMap = genresResult.data
    ? genresResult.data.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {})
    : {};

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-cinema-text mb-6">
        {mediaType === "movie" ? "Browse Movies" : "Browse Series"}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {genresResult.data && (
          <GenreFilter
            genres={genresResult.data.genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        )}
        <SortSelect sortBy={sortBy} onChangeSort={setSortBy} />
      </div>

      <MediaGrid
        items={data?.results || []}
        genreMap={genreMap}
        loading={loading || genresResult.loading}
        mediaType={mediaType}
      />
    </div>
  );
}

export default MediaBrowse;