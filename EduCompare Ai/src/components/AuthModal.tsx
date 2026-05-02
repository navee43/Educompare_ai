import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error("Google sign-in failed:", err);
      if (err?.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized for sign-in. Please add it to Firebase Console → Authentication → Settings → Authorized domains.");
      } else if (err?.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed. Please try again.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 border border-border">
        <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground mb-1">Welcome to LearnLens</h2>
          <p className="text-sm text-muted-foreground">Sign in to save courses, vote, and comment</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-4">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        <Button
          onClick={handleGoogle}
          variant="outline"
          className="w-full h-12 gap-3 text-base font-medium rounded-xl hover:bg-secondary transition-colors"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? "Signing in..." : "Sign in with Google"}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};
