import { useParams, Link } from "react-router-dom";
import { Star, Clock, ExternalLink, ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, deals, sampleReviews, platforms } from "@/lib/courseData";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === id);
  const platform = course ? platforms.find((p) => p.slug === course.platformSlug) : null;
  const courseDeal = deals.find((d) => d.courseId === id);
  const courseReviews = sampleReviews.filter((r) => r.courseId === id);
  const redditReviews = courseReviews.filter((r) => r.source === "reddit");
  const userReviews = courseReviews.filter((r) => r.source === "user");

  const [activeTab, setActiveTab] = useState<"details" | "reddit" | "reviews" | "deals">("details");
  const [votes, setVotes] = useState({ up: 42, down: 8 });
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { author: "Arjun P.", text: "Enrolled last month, the faculty is great for Physics. Maths could improve though.", date: "2026-03-10" },
    { author: "Sneha R.", text: "Good value for money. The test series is really helpful.", date: "2026-03-08" },
  ]);
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="font-display font-bold text-xl mb-2">Course not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  const discountPercent = course.originalPrice > 0
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const handleVote = (type: "up" | "down") => {
    if (!user) { setShowAuth(true); return; }
    if (userVote === type) {
      setUserVote(null);
      setVotes((v) => ({ ...v, [type]: v[type] - 1 }));
    } else {
      if (userVote) setVotes((v) => ({ ...v, [userVote]: v[userVote] - 1 }));
      setUserVote(type);
      setVotes((v) => ({ ...v, [type]: v[type] + 1 }));
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setShowAuth(true); return; }
    if (!comment.trim()) return;
    setComments((prev) => [{ author: user.displayName || "Anonymous", text: comment.trim(), date: new Date().toISOString().split("T")[0] }, ...prev]);
    setComment("");
  };

  const tabs = [
    { key: "details" as const, label: "Details" },
    { key: "reddit" as const, label: `Reddit Reviews (${redditReviews.length})` },
    { key: "reviews" as const, label: "Vote & Comment" },
    { key: "deals" as const, label: "Deals" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link to="/search" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to results
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {platform && (
                  <Link to={`/platform/${platform.slug}`} className="platform-badge">
                    {platform.name}
                  </Link>
                )}
                {courseDeal && <span className="deal-badge">{courseDeal.discount}</span>}
                <span className="bg-secondary px-2 py-0.5 rounded text-xs text-muted-foreground">{course.mode}</span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">{course.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {course.rating} ({course.reviewCount.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span>{course.targetLevel}</span>
                <span>{course.language}</span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 md:w-64 shrink-0">
              <div className="flex items-baseline gap-2 mb-1">
                {course.price === 0 ? (
                  <span className="font-display font-bold text-2xl text-success">FREE</span>
                ) : (
                  <>
                    <span className="font-display font-bold text-2xl text-foreground">₹{course.price.toLocaleString()}</span>
                    {discountPercent > 0 && (
                      <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
                    )}
                  </>
                )}
              </div>
              {discountPercent > 0 && (
                <p className="text-sm text-accent font-medium mb-3">You save {discountPercent}%</p>
              )}
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="hero" className="w-full gap-2">
                  Buy Now <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              {courseDeal?.code && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Use code: <span className="font-mono font-semibold text-accent">{courseDeal.code}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-lg mb-2">About this course</h2>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg mb-2">What you'll get</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className="bg-secondary px-2.5 py-1 rounded-full text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reddit" && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg mb-2">What Reddit says</h2>
            {redditReviews.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No Reddit reviews available yet for this course.</p>
            ) : (
              redditReviews.map((r) => (
                <div key={r.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">{r.author}</span>
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <Star className="h-3 w-3 fill-accent" /> {r.rating}/5
                    </span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Live Voting */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-semibold text-lg mb-1">Community Vote</h2>
              <p className="text-sm text-muted-foreground mb-4">Would you recommend this course?</p>
              <div className="flex items-center gap-4">
                <Button
                  variant={userVote === "up" ? "default" : "outline"}
                  onClick={() => handleVote("up")}
                  className="gap-2"
                >
                  <ThumbsUp className="h-4 w-4" /> Yes ({votes.up})
                </Button>
                <Button
                  variant={userVote === "down" ? "destructive" : "outline"}
                  onClick={() => handleVote("down")}
                  className="gap-2"
                >
                  <ThumbsDown className="h-4 w-4" /> No ({votes.down})
                </Button>
                <span className="text-sm text-muted-foreground">
                  {Math.round((votes.up / (votes.up + votes.down)) * 100)}% recommend
                </span>
              </div>
            </div>

            {/* User Reviews */}
            {userReviews.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg mb-3">User Reviews</h2>
                {userReviews.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-lg p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">{r.author}</span>
                      <span className="flex items-center gap-1 text-xs text-accent">
                        <Star className="h-3 w-3 fill-accent" /> {r.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comments */}
            <div>
              <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Comments ({comments.length})
              </h2>
              <form onSubmit={handleComment} className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={user ? "Share your experience with this course..." : "Sign in to comment"}
                  className="w-full bg-card border border-border rounded-lg p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  rows={3}
                />
                <Button type="submit" size="sm" className="mt-2">Post Comment</Button>
              </form>
              <div className="space-y-3">
                {comments.map((c, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{c.author}</span>
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "deals" && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg">Live Deals & Offers</h2>
            {courseDeal ? (
              <div className="bg-accent/5 border border-accent/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="deal-badge text-sm">{courseDeal.discount}</span>
                  <span className="text-sm font-medium text-accent">{courseDeal.tag}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{courseDeal.title}</h3>
                <p className="text-sm text-muted-foreground">Valid till: {courseDeal.validTill}</p>
                {courseDeal.code && (
                  <div className="mt-3 bg-card border border-border rounded-md px-4 py-2 inline-flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Coupon:</span>
                    <span className="font-mono font-bold text-accent">{courseDeal.code}</span>
                  </div>
                )}
                <div className="mt-4">
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="accent" className="gap-2">
                      Grab this deal <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">🏷️</p>
                <p className="text-muted-foreground">No active deals for this course right now.</p>
                <p className="text-sm text-muted-foreground mt-1">Check back during festivals for special offers!</p>
              </div>
            )}
          </div>
        )}
      </div>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default CourseDetail;
