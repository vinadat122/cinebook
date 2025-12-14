import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import { movies } from "../data/movies";

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.filter((m) => m.featured);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  return (
    <section
      className="position-relative overflow-hidden"
      style={{ height: "85vh", minHeight: 600 }}
    >
      {/* Background images */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-100 h-100 object-fit-cover"
          />
          {/* Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6), transparent)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container h-100 position-relative z-1">
        <div className="row h-100 align-items-center">
          <div className="col-lg-7 text-white pt-5">
            {/* Badges */}
            <div className="mb-3 d-flex gap-2 flex-wrap">
              <span className="badge bg-primary">
                {currentMovie?.ageRating}
              </span>
              {currentMovie?.genre.slice(0, 2).map((g) => (
                <span key={g} className="badge bg-secondary">
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="display-4 fw-bold mb-3">
              {currentMovie?.title}
            </h1>

            {/* Info */}
            <div className="d-flex align-items-center gap-3 text-light mb-4">
              <div className="d-flex align-items-center gap-1">
                <Star size={18} className="text-warning" />
                <strong>{currentMovie?.rating}</strong>
              </div>
              <span>•</span>
              <div className="d-flex align-items-center gap-1">
                <Clock size={16} />
                <span>{currentMovie?.duration} phút</span>
              </div>
              <span>•</span>
              <span>{currentMovie?.language}</span>
            </div>

            {/* Synopsis */}
            <p className="text-light mb-4" style={{ maxWidth: 600 }}>
              {currentMovie?.synopsis}
            </p>

            {/* Actions */}
            <div className="d-flex gap-3 flex-wrap">
              <Link
                to={`/movies/${currentMovie?.id}`}
                className="btn btn-primary btn-lg"
              >
                Đặt vé ngay
              </Link>

              <button className="btn btn-outline-light btn-lg">
                <Play size={18} className="me-2" />
                Xem trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-3"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>

      <button
        className="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-3"
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-pill border-0 ${
              index === currentIndex ? "bg-primary" : "bg-light"
            }`}
            style={{
              width: index === currentIndex ? 30 : 10,
              height: 10,
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
