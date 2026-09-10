function SortSelect({ sortBy, onChangeSort }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onChangeSort(e.target.value)}
      className="bg-cinema-surface text-cinema-text text-sm px-4 py-2 rounded-lg border border-cinema-muted/20 focus:outline-none focus:border-cinema-accent"
    >
      <option value="popularity.desc">Most Popular</option>
      <option value="vote_average.desc">Highest Rated</option>
      <option value="release_date.desc">Newest</option>
      <option value="release_date.asc">Oldest</option>
    </select>
  );
}

export default SortSelect;