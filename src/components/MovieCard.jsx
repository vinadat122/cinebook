import { Link } from "react-router-dom";
import { Star, Clock, Play } from "lucide-react";

const MovieCard = ({ movie, showBooking = true }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0 position-relative">
        {/* Poster */}

        <div className="position-relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="card-img-top"
            style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
          />


          {/* Age rating */}
          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
            {movie.ageRating}
          </span>

          {/* Score */}
          <div
            className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-dark bg-opacity-75 text-white rounded-pill d-flex align-items-center gap-1"
            style={{ fontSize: 12 }}
          >
            <Star size={14} fill="gold" color="gold" />
            {movie.rating}
          </div>

          {/* Coming soon */}
          {movie.status === "coming_soon" && (
            <span className="badge bg-warning text-dark position-absolute bottom-0 start-50 translate-middle-x mb-2">
              Sắp chiếu
            </span>
          )}
        </div>

        {/* Info */}
        <div className="card-body">
          <h6 className="fw-bold mb-1">{movie.title}</h6>

          <div className="text-muted small mb-2">
            {movie.genre.slice(0, 2).join(", ")}
          </div>

          <div className="d-flex align-items-center gap-2 text-muted small">
            <Clock size={14} />
            {movie.duration} phút
          </div>
        </div>

        {/* Hover effect */}
        <style>
          {`
          .card:hover .position-absolute {
            opacity: 1;
          }
        `}
        </style>
      </div>
    </Link>
  );
};

export default MovieCard;
