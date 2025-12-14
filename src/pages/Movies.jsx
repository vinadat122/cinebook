import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { movies } from "../data/movies";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const allGenres = [...new Set(movies.flatMap((m) => m.genre))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.originalTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || movie.status === statusFilter;

    const matchesGenre =
      genreFilter === "all" || movie.genre.includes(genreFilter);

    return matchesSearch && matchesStatus && matchesGenre;
  });

  return (
    <div className="min-vh-100">
      <Navbar />

      <main className="pt-5 mt-5 pb-5">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4 mb-3">Phim</h1>
            <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
              Khám phá những bộ phim bom tấn mới nhất tại CineStar
            </p>
          </div>

          {/* Filters */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-center">
                {/* Search */}
                <div className="col-12 col-md-6 col-lg-4 position-relative">
                  <Search
                    size={18}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Tìm kiếm phim..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="col-12 col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="now_showing">Đang chiếu</option>
                    <option value="coming_soon">Sắp chiếu</option>
                  </select>
                </div>

                {/* Genre */}
                <div className="col-12 col-md-3">
                  <select
                    className="form-select"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                  >
                    <option value="all">Tất cả thể loại</option>
                    {allGenres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="text-muted mb-4">
            Tìm thấy{" "}
            <strong className="text-dark">{filteredMovies.length}</strong> phim
          </p>

          {/* Movie Grid */}
          {filteredMovies.length > 0 ? (
            <div className="row g-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                >
                  <MovieCard
                    movie={movie}
                    showBooking={movie.status === "now_showing"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">
                Không tìm thấy phim phù hợp
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
