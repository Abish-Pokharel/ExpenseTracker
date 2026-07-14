import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-center px-4">
      <p className="font-mono text-sm text-muted mb-2">Error 404</p>
      <h1 className="font-display text-3xl font-semibold mb-3">Page not found</h1>
      <p className="text-muted mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/dashboard" className="px-5 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal/90 transition-colors">
        Back to dashboard
      </Link>
    </div>
  );
}