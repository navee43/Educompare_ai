import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platforms, targetLevels, subcategories } from "@/lib/courseData";

interface FilterSidebarProps {
  filters: {
    category: string;
    subcategory: string;
    platform: string;
    level: string;
    priceRange: string;
    mode: string;
    language: string;
    sortBy: string;
  };
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  totalResults: number;
  show: boolean;
  onClose: () => void;
}

const priceRanges = [
  { label: "Free", value: "free" },
  { label: "Under ₹1,000", value: "0-1000" },
  { label: "₹1K – ₹5K", value: "1000-5000" },
  { label: "₹5K – ₹15K", value: "5000-15000" },
  { label: "₹15K – ₹50K", value: "15000-50000" },
  { label: "₹50K+", value: "50000-999999" },
];

const categoryOptions = [
  { label: "All", value: "" },
  { label: "School (K-12)", value: "School" },
  { label: "Competitive", value: "Competitive" },
  { label: "Professional", value: "Professional" },
  { label: "Govt Jobs", value: "Government" },
  { label: "Skills", value: "Skills" },
  { label: "Lifestyle", value: "Lifestyle" },
];

const modes = ["Online", "Offline", "Hybrid"];
const languages = ["Hindi", "English", "Hindi/English", "English/Hindi"];
const sortOptions = [
  { label: "Relevance", value: "" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export const FilterSidebar = ({ filters, onChange, onClear, totalResults, show, onClose }: FilterSidebarProps) => {
  const activeCount = Object.values(filters).filter((v) => v && v !== "").length;

  const content = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-foreground">
          Filters {activeCount > 0 && <span className="text-primary text-sm">({activeCount})</span>}
        </h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs">
            Clear all
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{totalResults} courses found</p>

      {/* Sort */}
      <FilterSection title="Sort By">
        <select
          value={filters.sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
          className="w-full bg-secondary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-wrap gap-1.5">
          {categoryOptions.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange("category", c.value)}
              className={`filter-chip ${filters.category === c.value ? "filter-chip-active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Subcategory */}
      <FilterSection title="Exam / Subject">
        <select
          value={filters.subcategory}
          onChange={(e) => onChange("subcategory", e.target.value)}
          className="w-full bg-secondary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Exams</option>
          {subcategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </FilterSection>

      {/* Platform */}
      <FilterSection title="Platform">
        <select
          value={filters.platform}
          onChange={(e) => onChange("platform", e.target.value)}
          className="w-full bg-secondary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Platforms</option>
          {platforms.map((p) => (
            <option key={p.slug} value={p.slug}>{p.name}</option>
          ))}
        </select>
      </FilterSection>

      {/* Level */}
      <FilterSection title="Class / Level">
        <select
          value={filters.level}
          onChange={(e) => onChange("level", e.target.value)}
          className="w-full bg-secondary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Levels</option>
          {targetLevels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </FilterSection>

      {/* Budget */}
      <FilterSection title="Budget">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange("priceRange", "")}
            className={`filter-chip ${filters.priceRange === "" ? "filter-chip-active" : ""}`}
          >
            Any
          </button>
          {priceRanges.map((pr) => (
            <button
              key={pr.value}
              onClick={() => onChange("priceRange", pr.value)}
              className={`filter-chip ${filters.priceRange === pr.value ? "filter-chip-active" : ""}`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Mode */}
      <FilterSection title="Mode">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange("mode", "")}
            className={`filter-chip ${filters.mode === "" ? "filter-chip-active" : ""}`}
          >
            Any
          </button>
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => onChange("mode", m)}
              className={`filter-chip ${filters.mode === m ? "filter-chip-active" : ""}`}
            >
              {m}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection title="Language">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange("language", "")}
            className={`filter-chip ${filters.language === "" ? "filter-chip-active" : ""}`}
          >
            Any
          </button>
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => onChange("language", l)}
              className={`filter-chip ${filters.language === l ? "filter-chip-active" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 bg-card border border-border rounded-lg p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile overlay */}
      {show && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-card p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</h3>
    {children}
  </div>
);
