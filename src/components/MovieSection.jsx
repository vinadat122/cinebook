import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { movies } from "../data/movies";

const MovieSection = () => {
  const [activeTab, setActiveTab] = useState("now_showing");

  const filteredMovies = movies.filter(
    (m) => m.status === activeTab
  );

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-2">
              {activeTab === "now_showing"
                ? "Phim đang chiếu"
                : "Phim sắp chiếu"}
            </h2>
            <p className="text-muted mb-0">
              Khám phá những bộ phim hấp dẫn nhất tại CineStar
            </p>
          </div>

          {/* Tabs */}
          <div className="btn-group">
            <button
              className={`btn ${
                activeTab === "now_showing"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("now_showing")}
            >
              Đang chiếu
            </button>

            <button
              className={`btn ${
                activeTab === "coming_soon"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("coming_soon")}
            >
              Sắp chiếu
            </button>
          </div>
        </div>

        {/* Movies grid */}
        <div className="row g-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <MovieCard
                movie={movie}
                showBooking={activeTab === "now_showing"}
              />
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-5">
          <Link to="/movies" className="btn btn-outline-secondary btn-lg">
            Xem tất cả phim
            <ChevronRight className="ms-1" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
