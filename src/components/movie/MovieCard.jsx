function MovieCard({ movie }) {
  return (
    <div className="bg-[#000000] p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-white font-semibold text-sm">{movie.title}</h2>
      <p className="text-gray-400 text-xs mt-1 line-clamp-3">{movie.overview}</p>
    </div>
  );
}

export default MovieCard;