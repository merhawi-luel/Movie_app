import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-cinema-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-cinema-text mb-2">
        Page Not Found
      </h2>
      <p className="text-cinema-muted mb-8 max-w-md">
        The page you're looking for doesn't exist .
      </p>
      <Link
        to="/"
        className="bg-cinema-accent text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}