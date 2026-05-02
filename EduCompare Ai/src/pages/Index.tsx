import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, GraduationCap, Target, Briefcase, Building2, Code2, Heart, Zap, TrendingUp, Users, ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { courses, categories, platforms } from "@/lib/courseData";
import { HeroSearch } from "@/components/HeroSearch";
import { DealsBar } from "@/components/DealsBar";
import { Button } from "@/components/ui/button";

const categoryIcons: Record<string, React.ReactNode> = {
  "school": <GraduationCap className="h-6 w-6" />,
  "competitive": <Target className="h-6 w-6" />,
  "professional": <Briefcase className="h-6 w-6" />,
  "government": <Building2 className="h-6 w-6" />,
  "skills": <Code2 className="h-6 w-6" />,
  "lifestyle": <Heart className="h-6 w-6" />,
};

const Index = () => {
  const navigate = useNavigate();

  const trendingJEE = courses.filter((c) => c.subcategory === "JEE").slice(0, 4);
  const trendingNEET = courses.filter((c) => c.subcategory === "NEET").slice(0, 4);
  const trendingUPSC = courses.filter((c) => c.subcategory === "UPSC").slice(0, 4);
  const trendingSkills = courses.filter((c) => c.category === "Skills").slice(0, 4);
  const freeCourses = courses.filter((c) => c.price === 0).slice(0, 4);
  const lifestyleCourses = courses.filter((c) => c.category === "Lifestyle").slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <DealsBar />
      <HeroSearch />

      {/* Stats Strip */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap className="h-5 w-5 text-accent" />, value: "200+", label: "Courses Listed" },
              { icon: <Building2 className="h-5 w-5 text-primary" />, value: "20+", label: "Platforms" },
              { icon: <Users className="h-5 w-5 text-[hsl(var(--highlight))]" />, value: "50K+", label: "Monthly Users" },
              { icon: <TrendingUp className="h-5 w-5 text-success" />, value: "Live", label: "Deals & Prices" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-foreground leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16 section-glow">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Explore</p>
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">Browse by Category</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Find courses tailored to your learning goals — from school boards to competitive exams</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const catValue = cat.label.includes("School") ? "School" : cat.label.includes("Competitive") ? "Competitive" : cat.label.includes("Professional") ? "Professional" : cat.label.includes("Government") ? "Government" : cat.label.includes("Skill") ? "Skills" : "Lifestyle";
            return (
              <Link
                key={cat.id}
                to={`/search?category=${catValue}`}
                className="glass-card rounded-2xl p-5 text-center group relative overflow-hidden card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-3 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm">
                    {categoryIcons[cat.id] || <span className="text-2xl">{cat.icon}</span>}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Course Sections */}
      <CourseSection title="🔥 Trending in JEE" courses={trendingJEE} link="/search?subcategory=JEE" accent="primary" />
      <CourseSection title="🩺 Top for NEET" courses={trendingNEET} link="/search?subcategory=NEET" accent="success" />
      <CourseSection title="🏛️ UPSC & Govt Jobs" courses={trendingUPSC} link="/search?category=Government" accent="accent" />
      <CourseSection title="💻 Popular Skill Courses" courses={trendingSkills} link="/search?category=Skills" accent="primary" />
      <CourseSection title="🆓 Free Courses" courses={freeCourses} link="/search?priceRange=free" accent="success" />
      <CourseSection title="🌱 Knowledge & Lifestyle" courses={lifestyleCourses} link="/search?category=Lifestyle" accent="accent" />

      {/* Platforms */}
      <section className="container mx-auto px-4 py-16 section-glow">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Platforms</p>
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">Explore Platforms</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Compare India's top learning platforms side by side</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {platforms.slice(0, 10).map((p) => (
            <Link
              key={p.slug}
              to={`/platform/${p.slug}`}
              className="glass-card rounded-2xl p-5 card-hover text-center group"
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center font-display font-bold text-primary-foreground text-lg shadow-lg"
                style={{ backgroundColor: p.color }}
              >
                {p.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">{p.name}</h3>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="text-accent text-xs">★</span>
                <span className="text-xs text-muted-foreground font-medium">{p.rating}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/search">
            <Button variant="outline" className="rounded-full gap-2 px-6">
              View all 20+ platforms <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-14">
          <div className="text-center">
            <p className="font-display font-bold text-2xl mb-2">
              <span className="gradient-text">EduCompare AI</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Helping Indian students find the best courses since 2026. Compare, review, and save across 20+ platforms.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
              <span>© 2026 EduCompare AI</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Not affiliated with any coaching institute</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CourseSection = ({ title, courses: sectionCourses, link, accent }: { title: string; courses: typeof courses; link: string; accent?: string }) => {
  if (sectionCourses.length === 0) return null;
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">{title}</h2>
        <Link to={link} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline group">
          View all <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sectionCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Index;
