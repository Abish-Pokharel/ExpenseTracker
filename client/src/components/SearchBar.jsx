import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({ value = "", onChange = () => {} }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, category, or note"
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
        />
      </div>
      <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-line bg-white text-sm text-muted hover:text-ink hover:border-ink transition-colors">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>
    </div>
  );
}