import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  Play,
  ChevronRight,
  MapPin,
  Check,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeatSelection from "../components/SeatSelection";
import { movies, cinemas, showtimes, seatLayout, combos } from "../data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));

  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy phim</p>
      </div>
    );
  }

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("vi-VN", { weekday: "short" }),
      dayNum: date.getDate(),
      month: date.getMonth() + 1,
    };
  });

  const calculateTotal = () => {
    if (!selectedShowtime || selectedSeats.length === 0) return 0;
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const vipSeats = selectedSeats.filter((seat) =>
      seatLayout.vipRows.includes(seat[0])
    );
    const normalSeats = selectedSeats.length - vipSeats.length;
    const vipPrice = showtime.price * 1.3;
    return normalSeats * showtime.price + vipSeats.length * vipPrice;
  };

  const handleBooking = () => {
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const cinema = cinemas.find((c) => c.id === selectedCinema);

    navigate("/checkout", {
      state: {
        movie: {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          duration: movie.duration,
          ageRating: movie.ageRating,
        },
        cinema: {
          id: cinema.id,
          name: cinema.name,
        },
        date: selectedDate,
        showtime: {
          id: showtime.id,
          time: showtime.time,
          type: showtime.type,
        },
        seats: selectedSeats,
        totalAmount: calculateTotal(),
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-5 mt-5">
        {/* Backdrop */}
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.9)), url(${movie.backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
          className="d-flex align-items-end"
        >
          <div className="container pb-4">
            <div className="row align-items-start">
              {/* Poster */}
              <div className="col-md-4 col-lg-3 text-center mb-4 mb-md-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "420px" }}
                />
              </div>

              {/* Info */}
              <div className="col-md-8 col-lg-9 text-white ps-md-4 border-start">
                <span className="badge bg-danger mb-2">{movie.ageRating}</span>

                <h1 className="fw-bold mt-2">{movie.title}</h1>
                <p className="text-muted fst-italic">{movie.originalTitle}</p>

                <div className="d-flex flex-wrap gap-4 mb-3">
                  <span>⭐ {movie.rating}</span>
                  <span>⏱ {movie.duration} phút</span>
                  <span>
                    📅 {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <p className="mb-4" style={{ maxWidth: "700px" }}>
                  {movie.synopsis}
                </p>

                <p>
                  <strong>Đạo diễn:</strong> {movie.director}
                </p>
                <p>
                  <strong>Diễn viên:</strong> {movie.cast.join(", ")}
                </p>
                <p>
                  <strong>Ngôn ngữ:</strong> {movie.language}
                </p>

                <div className="d-flex gap-3 mt-4">
                  <button className="btn btn-outline-light btn-lg">
                    ▶ Xem trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Đặt vé Section */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          Vui lòng hoàn thành các bước bên dưới để đặt vé:
        </h2>

        {/* Steps */}
        <div className="d-flex justify-content-center gap-4 mb-5">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`rounded-circle d-flex align-items-center justify-content-center ${
                bookingStep >= step ? "bg-primary text-white" : "bg-light"
              }`}
              style={{ width: 42, height: 42 }}
            >
              {step}
            </div>
          ))}
        </div>

        {/* STEP 1 – CHỌN RẠP */}
        <h4 className="mb-3 text-center">Chọn rạp gần bạn</h4>
        {/* Filter*/}
        <div className="d-flex justify-content-center mb-4">
          <select
            className="form-select w-auto"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">Tất cả khu vực</option>
            {[...new Set(cinemas.map((c) => c.city))].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* cinemas*/}
        {bookingStep === 1 && (
          <div className="row g-4">
            {cinemas
              .filter((c) => selectedCity === "all" || c.city === selectedCity)
              .map((cinema) => (
                <div className="col-md-3" key={cinema.id}>
                  <div
                    className="card h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCinema(cinema.id);
                      setBookingStep(2);
                    }}
                  >
                    <img src={cinema.image} className="card-img-top" />
                    <div className="card-body">
                      <h6 className="fw-bold">{cinema.name}</h6>
                      <p className="small text-muted">{cinema.address}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* STEP 2 – CHỌN NGÀY & SUẤT */}
        {bookingStep === 2 && (
          <div className="text-center">
            <h4 className="mb-3">Chọn ngày</h4>

            <div className="d-flex justify-content-center gap-2 mb-4">
              {dates.map((d) => (
                <button
                  key={d.date}
                  className={`btn ${
                    selectedDate === d.date
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedDate(d.date)}
                >
                  {d.dayNum}/{d.month}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h4 className="mb-3">Chọn suất chiếu</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {showtimes.map((s) => (
                    <button
                      key={s.id}
                      className={`btn ${
                        selectedShowtime === s.id
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => {
                        setSelectedShowtime(s.id);
                        setBookingStep(3);
                      }}
                    >
                      {s.time} ({s.type})
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              className="btn btn-link mt-4"
              onClick={() => setBookingStep(1)}
            >
              ← Quay lại
            </button>
          </div>
        )}

        {/* STEP 3 – CHỌN GHẾ */}
        {bookingStep === 3 && (
          <div className="row">
            <div className="col-md-8">
              <SeatSelection
                selectedSeats={selectedSeats}
                onSeatSelect={setSelectedSeats}
              />
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <p>
                  <strong>Đã chọn:</strong> {selectedSeats.length} ghế
                </p>

                <button
                  className="btn btn-primary w-100"
                  disabled={selectedSeats.length === 0}
                  onClick={() => setBookingStep(4)}
                >
                  Tiếp tục
                </button>

                <button
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => setBookingStep(2)}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 – FOOD */}
        {bookingStep === 4 && (
          <div className="row g-4">
            {/* COMBO */}
            <div className="col-md-7">
              <h5 className="fw-bold mb-3">Chọn đồ ăn / nước uống</h5>
              <div className="row g-3">
                {combos.map((combo) => (
                  <div className="col-md-4" key={combo.id}>
                    <div
                      className={`card h-100 ${
                        selectedCombos.includes(combo.id)
                          ? "border-primary"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedCombos((prev) =>
                          prev.includes(combo.id)
                            ? prev.filter((id) => id !== combo.id)
                            : [...prev, combo.id]
                        )
                      }
                    >
                      <img src={combo.image} className="card-img-top" />
                      <div className="card-body text-center">
                        <h6>{combo.name}</h6>
                        <p className="text-primary fw-bold">
                          {combo.price.toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="col-md-5">
              <div className="card p-3">
                <h5 className="fw-bold mb-3">Chi tiết đơn hàng</h5>

                <p>
                  <strong>Ghế:</strong> {selectedSeats.join(", ")}
                </p>

                <p>
                  <strong>Combo:</strong>
                </p>
                <ul>
                  {selectedCombos.map((id) => {
                    const c = combos.find((x) => x.id === id);
                    return <li key={id}>{c.name}</li>;
                  })}
                </ul>

                <hr />

                <p className="fs-4 fw-bold text-primary">
                  {(
                    calculateTotal() +
                    selectedCombos.reduce(
                      (sum, id) => sum + combos.find((c) => c.id === id).price,
                      0
                    )
                  ).toLocaleString("vi-VN")}
                  đ
                </p>

                <button
                  className="btn btn-success w-100"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        movie: {
                          id: movie.id,
                          title: movie.title,
                          poster: movie.poster,
                          duration: movie.duration,
                          ageRating: movie.ageRating,
                        },
                        cinema: cinemas.find((c) => c.id === selectedCinema),
                        date: selectedDate,
                        showtime: showtimes.find(
                          (s) => s.id === selectedShowtime
                        ),
                        seats: selectedSeats,
                        totalAmount:
                          calculateTotal() +
                          selectedCombos.reduce(
                            (sum, id) =>
                              sum + combos.find((c) => c.id === id).price,
                            0
                          ),
                        combos: selectedCombos,
                      },
                    })
                  }
                >
                  Thanh toán
                </button>

                <button
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => setBookingStep(3)}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetail;
