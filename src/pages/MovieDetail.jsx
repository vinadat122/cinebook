import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Calendar, MapPin } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeatSelection from "../components/SeatSelection";

/* ✅ DÙNG PROXY */
const API_BASE = "/api";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  /* ================= RESET KHI ĐỔI PHIM ================= */
  useEffect(() => {
    setBookingStep(1);
    setSelectedCinema(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setShowtimes([]);
    setCinemas([]);
  }, [id]);

  /* ================= LOAD MOVIE ================= */
  useEffect(() => {
    fetch(`${API_BASE}/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie)
      .catch(() => setMovie(null));
  }, [id]);

  /* ================= LOAD CINEMAS ================= */
  useEffect(() => {
    if (!movie) return;

    fetch(`${API_BASE}/cinemas?movie_id=${movie.id}`)
      .then((res) => res.json())
      .then(setCinemas)
      .catch(() => setCinemas([]));
  }, [movie]);

  /* ================= LOAD SHOWTIMES ================= */
  useEffect(() => {
    if (!movie || !selectedCinema || !selectedDate) return;

    fetch(
      `${API_BASE}/showtimes?movie_id=${movie.id}&cinema_id=${selectedCinema}&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then(setShowtimes)
      .catch(() => setShowtimes([]));
  }, [movie, selectedCinema, selectedDate]);

  /* ================= 7 NGÀY LOCAL ================= */
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return {
      value: `${yyyy}-${mm}-${dd}`,
      label: `${dd}/${mm}`,
    };
  });

  /* ================= TOTAL ================= */
  const calculateTotal = () => {
    const st = showtimes.find((s) => s.id === selectedShowtime);
    if (!st) return 0;
    return selectedSeats.length * st.price;
  };

  /* ================= LOADING ================= */
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải phim...
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="pt-20 container mx-auto px-4">
        <div className="flex gap-6">
          <img src={movie.poster} alt={movie.title} className="w-64 rounded" />

          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <div className="flex gap-4 text-sm my-3 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star size={14} /> {movie.rating || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {movie.duration} phút
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />{" "}
                {new Date(movie.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <p className="max-w-xl">{movie.synopsis}</p>
          </div>
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section className="py-16 container mx-auto px-4">
        {/* STEP 1 */}
        {bookingStep === 1 && (
          <>
            <h2 className="text-2xl mb-4">Chọn rạp</h2>

            {cinemas.length === 0 && (
              <p className="text-muted-foreground">
                Phim này hiện chưa có rạp chiếu
              </p>
            )}

            <div className="grid grid-cols-4 gap-4">
              {cinemas.map((c) => (
                <button
                  key={c.id}
                  className="border p-4 rounded"
                  onClick={() => {
                    setSelectedCinema(c.id);
                    setBookingStep(2);
                  }}
                >
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm flex gap-1">
                    <MapPin size={14} /> {c.address}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2 */}
        {bookingStep === 2 && (
          <>
            <h2 className="text-2xl mb-4">Chọn ngày</h2>

            <div className="flex gap-2 mb-6">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => {
                    setSelectedDate(d.value);
                    setSelectedShowtime(null);
                  }}
                  className={`px-3 py-2 rounded ${
                    selectedDate === d.value
                      ? "bg-primary text-white"
                      : "bg-secondary"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Chọn suất</h2>

            {showtimes.length === 0 && (
              <p className="text-muted-foreground">
                Không có suất chiếu cho ngày này
              </p>
            )}

            <div className="grid grid-cols-6 gap-2">
              {showtimes.map((st) => (
                <button
                  key={st.id}
                  className="border p-3 rounded"
                  onClick={() => {
                    setSelectedShowtime(st.id);
                    setBookingStep(3);
                  }}
                >
                  {st.show_time} <br />
                  {st.price.toLocaleString()}đ
                </button>
              ))}
            </div>

            <button
              className="mt-6 underline"
              onClick={() => setBookingStep(1)}
            >
              ← Quay lại
            </button>
          </>
        )}

        {/* STEP 3 */}
        {bookingStep === 3 && (
          <div className="grid grid-cols-3 gap-8">
            <SeatSelection
              showtimeId={selectedShowtime}
              selectedSeats={selectedSeats}
              onSeatSelect={setSelectedSeats}
            />

            <div className="border p-4 rounded">
              <h3 className="text-xl mb-4">Tổng tiền</h3>
              <p className="text-3xl font-bold">
                {calculateTotal().toLocaleString()}đ
              </p>

              <button
                className="w-full mt-4 bg-primary text-white py-2 rounded"
                disabled={selectedSeats.length === 0}
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      movie,
                      cinema: cinemas.find((c) => c.id === selectedCinema),
                      showtime: showtimes.find(
                        (s) => s.id === selectedShowtime
                      ),
                      date: selectedDate,
                      seats: selectedSeats,
                      totalAmount: calculateTotal(), // ⚠️ BẮT BUỘC
                    },
                  })
                }
              >
                Thanh toán
              </button>

              {/* 👇 NÚT QUAY LẠI */}
              <button
                className="w-full mt-2 border py-2 rounded"
                onClick={async () => {
                  // bỏ giữ tất cả ghế
                  for (const seatId of selectedSeats) {
                    await fetch("/api/seat-hold/index.php", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        showtime_id: selectedShowtime,
                        seat_id: seatId,
                        session_id: sessionStorage.getItem("seat_session"),
                      }),
                    });
                  }

                  setSelectedSeats([]);
                  setBookingStep(2);
                }}
              >
                ← Quay lại
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetail;
