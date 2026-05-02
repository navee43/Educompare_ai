import { Link } from "react-router-dom";
import { Tag, ChevronRight } from "lucide-react";
import { deals, courses } from "@/lib/courseData";

export const DealsBar = () => {
  const activeDeals = deals.slice(0, 5);

  return (
    <section className="bg-accent/5 border-b border-accent/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <Tag className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Live Deals</span>
          </div>
          {activeDeals.map((deal) => {
            const course = courses.find((c) => c.id === deal.courseId);
            if (!course) return null;
            return (
              <Link
                key={deal.id}
                to={`/course/${deal.courseId}`}
                className="shrink-0 flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 hover:border-accent/40 transition-colors duration-150"
              >
                <span className="deal-badge">{deal.discount}</span>
                <span className="text-xs text-foreground font-medium truncate max-w-[180px]">
                  {course.name}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
