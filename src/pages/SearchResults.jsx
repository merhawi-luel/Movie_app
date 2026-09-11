import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useMovies from "../hooks/useMovies";
import SearchInput from "../components/ui/SearchInput";
import MediaCard from "../components/movie/MediaCard";
import PersonCard from "../components/people/PersonCard";
import SkeletonCard from "../components/movie/SkeletonCard";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const debouncedQuery = useDebounce(query, 500);

  const endpoint = debouncedQuery
    ? `/search/${searchType}?query=${encodeURIComponent(debouncedQuery)}`
    : null;

  const { data, loading, error } = useMovies(endpoint);

  const results = data?.results || [];

  const typeOptions = [
    { label: "Movies", value: "movie" },
    { label: "Series", value: "tv" },
    { label: "Celebrities", value: "person" },
  ];

  return (
    <div className="px-6 pt-15 pb-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-cinema-accent text-xs font-bold tracking-widest uppercase mb-3">
          Search anything you want, from movies to celebrities.
        </p>
        
        <div className="flex justify-center gap-2 mb-6">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSearchType(option.value)}
              className={`text-sm font-semibold px-5 py-2 rounded-full transition-colors ${
                searchType === option.value
                  ? "bg-cinema-accent text-white"
                  : "bg-cinema-surface/60 text-cinema-muted hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <SearchInput value={query} onChange={setQuery} />
      </div>

      {!debouncedQuery && (
        <p className="text-center text-cinema-muted">
          Start typing to search {typeOptions.find((o) => o.value === searchType)?.label.toLowerCase()}.
        </p>
      )}

      {debouncedQuery && error && (
        <p className="text-center text-cinema-text">Something went wrong.</p>
      )}

      {debouncedQuery && !error && !loading && results.length === 0 && (
        <p className="text-center text-cinema-muted">
          No results found for "{debouncedQuery}".
        </p>
      )}

      {debouncedQuery && !error && (loading || results.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : results.map((item) =>
                searchType === "person" ? (
                  <PersonCard key={item.id} person={item} />
                ) : (
                  <MediaCard key={item.id} media={item} mediaType={searchType} />
                )
              )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;