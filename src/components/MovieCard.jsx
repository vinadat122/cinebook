import { Link } from "react-router-dom";
import { Star, Clock, Play } from "lucide-react";

const MovieCard = ({ movie, showBooking = true }) => {
  return (
    <div className="card h-100 shadow-sm border-0 position-relative">
      {/* Poster */}
      <div className="position-relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="card-img-top"
          style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
        />

        {/* Hover overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end justify-content-center"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.3), transparent)",
            opacity: 0,
            transition: "opacity .3s",
          }}
        >
          <div className="mb-3 d-flex gap-2">
            {showBooking && (
              <Link
                to={`/movies/${movie.id}`}
                className="btn btn-primary btn-sm"
              >
                Đặt vé
              </Link>
            )}
            <button className="btn btn-outline-light btn-sm">
              <Play size={16} />
            </button>
          </div>
        </div>

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
  );
};

export default MovieCard;
