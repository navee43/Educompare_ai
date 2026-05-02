import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const trendingSearches = ["JEE 2026", "NEET", "UPSC", "Python", "CA Foundation", "SSC CGL", "CUET", "Video Editing"];

export const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTrending = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(243,75%,59%,0.06)] via-background to-[hsl(270,70%,60%,0.04)]" />
      <div className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-[hsl(243,75%,59%)]" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 bg-[hsl(270,70%,60%)]" />
      <div className="absolute top-[60%] right-[30%] w-[200px] h-[200px] rounded-full blur-[80px] opacity-10 bg-accent" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(243 75% 59%) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-primary/15 shadow-sm shadow-primary/5">
          <Sparkles className="h-4 w-4" />
          Compare 20+ Indian platforms in one place
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
          Find Your{" "}
          <span className="gradient-text">Perfect</span>
          <br className="hidden sm:block" />
          {" "}Course
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Allen, PW, Unacademy, Vedantu & more — real ratings, live deals, and honest reviews to help every Indian student succeed.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-[hsl(var(--highlight))]/15 to-accent/15 rounded-[20px] blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, platforms, or exams..."
                className="search-input pl-14 pr-36"
              />
              <Button type="submit" variant="hero" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl shadow-lg shadow-primary/25">
                Search
              </Button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 flex-wrap max-w-xl mx-auto">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-muted-foreground">Trending:</span>
          {trendingSearches.map((term) => (
            <button
              key={term}
              onClick={() => handleTrending(term)}
              className="filter-chip text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
