import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaCard from "./MediaCard";

function MediaRow({ title, items, genreMap, mediaType = "movie" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    handleScroll();
  }, [items]);

  function scroll(direction) {
    const el = scrollRef.current;
    const amount = direction === "left" ? -600 : 600;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="mb-8 relative">
      <h2 className="text-xl font-semibold mb-4 text-cinema-text">{title}</h2>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
      >
        {items.map((item) => (
          <div key={item.id} className="w-48 shrink-0">
            <MediaCard media={item} genreMap={genreMap} mediaType={mediaType} />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </section>
  );
}

export default MediaRow;