function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-cinema-surface animate-pulse">
      <div className="w-full h-64 bg-cinema-card" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-cinema-card rounded w-3/4" />
        <div className="h-3 bg-cinema-card rounded w-1/2" />
      </div>
    </div>
  );
}

export default SkeletonCard;