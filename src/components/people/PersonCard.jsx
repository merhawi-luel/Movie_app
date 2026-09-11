import { Link } from "react-router-dom";

function PersonCard({ person }) {
  return (
    <Link
      to={`/person/${person.id}`}
      className="block rounded-lg overflow-hidden bg-cinema-surface shadow-md hover:scale-105 transition-transform text-center"
    >
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
            : "https://placehold.co/300x450?text=No+Image"
        }
        alt={person.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h2 className="text-cinema-text font-semibold text-sm truncate">{person.name}</h2>
        <p className="text-cinema-muted text-xs truncate">{person.known_for_department}</p>
      </div>
    </Link>
  );
}

export default PersonCard;