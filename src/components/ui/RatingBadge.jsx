import { Star } from "lucide-react";

function RatingBadge({ rating }) {
  if (!rating) return null;

  return (
    <span className="flex items-center gap-1 text-cinema-gold text-xs">
      <Star size={12} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

export default RatingBadge;