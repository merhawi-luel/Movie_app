import useMovies from "../hooks/useMovies";
import MediaRow from "../components/movie/MediaRow";
import HeroBanner from "../components/movie/HeroBanner";

function Home() {
  const trending = useMovies("/trending/movie/week");
  const popular = useMovies("/movie/popular");
  const topRated = useMovies("/movie/top_rated");
  const genres = useMovies("/genre/movie/list");

  const isLoading = trending.loading || popular.loading || topRated.loading || genres.loading;
  const hasError = trending.error || popular.error || topRated.error || genres.error;

  if (isLoading) return <p className="p-6 text-cinema-text">Loading...</p>;
  if (hasError) return <p className="p-6 text-cinema-text">Something went wrong.</p>;

  const genreMap = genres.data.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  return (
    <div>
      <HeroBanner movies={trending.data.results.slice(0, 5)} genreMap={genreMap} />

      <div className="px-6 mt-8">
        <MediaRow title="Trending" items={trending.data.results.slice(0, 3)} genreMap={genreMap} mediaType="movie" />
        <MediaRow title="Popular" items={popular.data.results.slice(0, 3)} genreMap={genreMap} mediaType="movie" />
        <MediaRow title="Top Rated" items={topRated.data.results.slice(0, 3)} genreMap={genreMap} mediaType="movie" />
      </div>
    </div>
  );
}

export default Home;