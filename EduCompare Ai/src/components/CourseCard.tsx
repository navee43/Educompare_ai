import { Link } from "react-router-dom";
import { Star, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { deals } from "@/lib/courseData";

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

export const CourseCard = ({ course, compact }: CourseCardProps) => {
  const courseDeal = deals.find((d) => d.courseId === course.id);
  const discountPercent = course.originalPrice > 0
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 card-hover flex flex-col group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <Link to={`/course/${course.id}`} className="block">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {course.name}
            </h3>
          </Link>
          <Link
            to={`/platform/${course.platformSlug}`}
            className="platform-badge inline-block mt-1.5"
          >
            {course.platform}
          </Link>
        </div>
        {courseDeal && (
          <span className="deal-badge shrink-0">{courseDeal.discount}</span>
        )}
      </div>

      {!compact && (
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3 leading-relaxed">
          {course.description}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {course.rating} ({course.reviewCount.toLocaleString()})
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {course.duration}
        </span>
        <span className="bg-secondary px-2 py-0.5 rounded-md text-xs font-medium">
          {course.targetLevel}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-baseline gap-2">
          {course.price === 0 ? (
            <span className="font-display font-bold text-success text-lg">FREE</span>
          ) : (
            <>
              <span className="font-display font-bold text-foreground text-lg">
                ₹{course.price.toLocaleString()}
              </span>
              {discountPercent > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Link to={`/course/${course.id}`}>
            <Button variant="outline" size="sm" className="text-xs">Details</Button>
          </Link>
          <a href={course.url} target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="sm" className="gap-1 text-xs shadow-sm shadow-primary/20">
              Buy <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
