import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieGrid from "../components/movie/MovieGrid";
import GenreFilter from "../components/ui/GenreFilter";
import SortSelect from "../components/ui/SortSelect";

function Browse() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const genresResult = useMovies("/genre/movie/list");

  const endpoint =
    `/discover/movie?sort_by=${sortBy}` +
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
      <h1 className="text-2xl font-bold text-cinema-text mb-6">Browse</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {genresResult.data && (
          <GenreFilter
            genres={genresResult.data.genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        )}
        <SortSelect sortBy={sortBy} onChangeSort={setSortBy} />
      </div>

      <MovieGrid
        movies={data?.results || []}
        genreMap={genreMap}
        loading={loading || genresResult.loading}
      />
    </div>
  );
}

export default Browse;