import MovieCard from "./MovieCard";


export default function MovieRow({ title, movies, genreMap }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-cinema-text">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <div key={movie.id} className="w-48 shrink-0">
            <MovieCard movie={movie} genreMap={genreMap} />
          </div>
        ))}
      </div>
    </section>
  );
}