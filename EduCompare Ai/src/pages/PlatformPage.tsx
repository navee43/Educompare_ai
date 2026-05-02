import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowLeft, Star, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { courses, platforms } from "@/lib/courseData";

const PlatformPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = platforms.find((p) => p.slug === slug);
  const platformCourses = courses.filter((c) => c.platformSlug === slug);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categoryOptions = useMemo(() => {
    const cats = [...new Set(platformCourses.map((c) => c.category))];
    return cats;
  }, [platformCourses]);

  const subcategoryOptions = useMemo(() => {
    const subs = [...new Set(platformCourses.map((c) => c.subcategory))];
    return subs;
  }, [platformCourses]);

  const filtered = useMemo(() => {
    let result = [...platformCourses];
    if (categoryFilter) result = result.filter((c) => c.category === categoryFilter);
    if (subcategoryFilter) result = result.filter((c) => c.subcategory === subcategoryFilter);
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [platformCourses, categoryFilter, subcategoryFilter, sortBy]);

  if (!platform) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="font-display font-bold text-xl mb-2">Platform not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Platform Hero */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <Link to="/search" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center font-display font-bold text-primary-foreground text-2xl shrink-0"
              style={{ backgroundColor: platform.color }}
            >
              {platform.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">{platform.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {platform.rating} ({platform.reviewCount.toLocaleString()} reviews)
                </span>
                <span>{platformCourses.length} courses on EduCompare</span>
              </div>
            </div>
            <a href={platform.website} target="_blank" rel="noopener noreferrer" className="ml-auto hidden sm:block">
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" /> Visit Website
              </Button>
            </a>
          </div>
          <p className="text-muted-foreground mt-4 max-w-3xl">{platform.description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="text-sm text-muted-foreground shrink-0">Filter:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-secondary rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="bg-secondary rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Exams/Subjects</option>
            {subcategoryOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Sort by Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
          <span className="text-sm text-muted-foreground shrink-0">{filtered.length} courses</span>
        </div>
      </div>

      {/* Courses */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-muted-foreground">No courses match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;
