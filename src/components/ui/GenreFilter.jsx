function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-2">
      <button
        onClick={() => onSelectGenre(null)}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          selectedGenre === null
            ? "bg-cinema-accent text-white"
            : "bg-cinema-surface text-cinema-muted hover:text-white"
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            selectedGenre === genre.id
              ? "bg-cinema-accent text-white"
              : "bg-cinema-surface text-cinema-muted hover:text-white"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;