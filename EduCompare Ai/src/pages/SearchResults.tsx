import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { SlidersHorizontal, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { courses, platforms } from "@/lib/courseData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const subcategoryParam = searchParams.get("subcategory") || "";
  const priceRangeParam = searchParams.get("priceRange") || "";

  const [filters, setFilters] = useState({
    category: categoryParam,
    subcategory: subcategoryParam,
    platform: searchParams.get("platform") || "",
    level: searchParams.get("level") || "",
    priceRange: priceRangeParam,
    mode: "",
    language: "",
    sortBy: "",
  });

  // Sync filters when URL params change (nav button clicks)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam,
      subcategory: subcategoryParam,
      priceRange: priceRangeParam,
    }));
  }, [categoryParam, subcategoryParam, priceRangeParam]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: "", subcategory: "", platform: "", level: "", priceRange: "", mode: "", language: "", sortBy: "" });
  };

  const matchedPlatform = useMemo(() => {
    if (!query) return null;
    return platforms.find(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.slug.includes(query.toLowerCase().replace(/\s+/g, "-"))
    );
  }, [query]);

  const filtered = useMemo(() => {
    let result = [...courses];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q) ||
          c.subcategory.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (filters.category) result = result.filter((c) => c.category === filters.category);
    if (filters.subcategory) result = result.filter((c) => c.subcategory === filters.subcategory);
    if (filters.platform) result = result.filter((c) => c.platformSlug === filters.platform);
    if (filters.level) result = result.filter((c) => c.targetLevel === filters.level);
    if (filters.mode) result = result.filter((c) => c.mode === filters.mode);
    if (filters.language) result = result.filter((c) => c.language === filters.language);

    if (filters.priceRange) {
      if (filters.priceRange === "free") {
        result = result.filter((c) => c.price === 0);
      } else {
        const [min, max] = filters.priceRange.split("-").map(Number);
        result = result.filter((c) => c.price >= min && c.price <= max);
      }
    }

    switch (filters.sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [query, filters]);

  const pageTitle = query
    ? `Results for "${query}"`
    : filters.category
    ? `${filters.category} Courses`
    : "All Courses";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/8 via-background to-accent/5 border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0 hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">{pageTitle}</h1>
              <p className="text-sm text-muted-foreground">{filtered.length} courses found</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-2 ml-auto"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {matchedPlatform && (
            <Link
              to={`/platform/${matchedPlatform.slug}`}
              className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold"
                style={{ backgroundColor: matchedPlatform.color }}
              >
                {matchedPlatform.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-primary">
                View all {matchedPlatform.name} courses →
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
            totalResults={filtered.length}
            show={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
          />

          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h2 className="font-display font-semibold text-lg text-foreground mb-2">No courses found</h2>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search query</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
