import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/movie/MovieCard";
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

  if (genresResult.loading || loading) {
    return <p className="p-6 text-cinema-text">Loading...</p>;
  }

  if (genresResult.error || error) {
    return <p className="p-6 text-cinema-text">Something went wrong.</p>;
  }

  const genreMap = genresResult.data.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-cinema-text mb-6">Browse</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <GenreFilter
          genres={genresResult.data.genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
        <SortSelect sortBy={sortBy} onChangeSort={setSortBy} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
        ))}
      </div>
    </div>
  );
}

export default Browse;