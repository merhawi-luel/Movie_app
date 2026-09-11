function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="genre-select" className="text-sm text-cinema-muted font-medium">
        Genre:
      </label>
      <select
        id="genre-select"
        value={selectedGenre ?? ""}
        onChange={(e) =>
          onSelectGenre(e.target.value === "" ? null : Number(e.target.value))
        }
        className="bg-cinema-surface text-cinema-text text-sm px-4 py-2 rounded-lg border border-cinema-muted/20 focus:outline-none focus:border-cinema-accent"
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;