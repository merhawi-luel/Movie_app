import { Link } from "react-router-dom";

function PersonCard({ person }) {
  return (
    <Link
      to={`/person/${person.id}`}
      className="relative block rounded-lg overflow-hidden bg-black shadow-md hover:scale-105 transition-transform text-center
      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600
      after:shadow-[0_0_10px_2px_rgba(220,38,38,0.8)]
      after:transition-all after:duration-300
      hover:after:w-full"
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

      <div className="p-3 hover:bg-red-400 hover:bg-opacity-20 transition-colors">
        <h2 className="text-cinema-text font-semibold text-sm truncate ">
          {person.name}
        </h2>

        <p className="text-cinema-muted text-xs truncate">
          {person.known_for_department}
        </p>
      </div>
    </Link>
  );
}

export default PersonCard;