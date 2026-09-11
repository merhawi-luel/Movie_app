import MediaCard from "./MediaCard";
import SkeletonCard from "./SkeletonCard";

function MediaGrid({ items, genreMap, loading, mediaType = "movie" }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          genreMap={genreMap}
          mediaType={item.mediaType || mediaType}
        />
      ))}
    </div>
  );
}

export default MediaGrid;