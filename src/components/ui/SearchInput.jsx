import { Search } from "lucide-react";

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        className="w-full bg-cinema-surface text-cinema-text pl-10 pr-4 py-3 rounded-lg border border-cinema-muted/20 focus:outline-none focus:border-cinema-accent"
      />
    </div>
  );
}

export default SearchInput;