import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  Wallet,
  Building2,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = "http://localhost/cinebook-api/api";

const paymentMethods = [
  { id: "momo", name: "Ví MoMo", icon: Wallet },
  { id: "zalopay", name: "ZaloPay", icon: Wallet },
  { id: "vnpay", name: "VNPay", icon: Building2 },
  { id: "card", name: "Thẻ tín dụng / ghi nợ", icon: CreditCard },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const bookingData = location.state;
  const sessionId = localStorage.getItem("seat_session");

  /* ===== GUARD ===== */
  useEffect(() => {
    if (!user) navigate("/auth");
    if (!bookingData) navigate("/movies");
  }, [user, bookingData, navigate]);

  if (!user || !bookingData) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  /* ===== THANH TOÁN ===== */
  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const res = await fetch(
        "http://localhost/cinebook-api/api/bookings/index.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            showtime_id: bookingData.showtime.id,
            seats: bookingData.seats,
            total_amount: bookingData.total,
            session_id: localStorage.getItem("seat_session"),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBookingId(data.booking_id);
      setIsSuccess(true);
    } catch (err) {
      alert("❌ Thanh toán thất bại");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ===== SUCCESS ===== */
  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <CheckCircle size={80} className="text-success mb-4" />
          <h1 className="mb-3">ĐẶT VÉ THÀNH CÔNG</h1>
          <p className="text-muted mb-4">
            Mã đơn: <strong>#{bookingId}</strong>
          </p>

          <div className="card mx-auto mb-4" style={{ maxWidth: 500 }}>
            <div className="card-body text-start">
              <p>
                <strong>Phim:</strong> {bookingData.movie.title}
              </p>
              <p>
                <strong>Rạp:</strong> {bookingData.cinema.name}
              </p>
              <p>
                <strong>Ngày:</strong> {bookingData.date}
              </p>
              <p>
                <strong>Suất:</strong> {bookingData.showtime.time}
              </p>
              <p>
                <strong>Ghế:</strong> {bookingData.seats.join(", ")}
              </p>

              <hr />
              <strong className="fs-4 text-primary">
                {(bookingData.totalAmount ?? 0).toLocaleString("vi-VN")}đ
              </strong>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Trang chủ
          </button>
        </div>
        <Footer />
      </>
    );
  }

  /* ===== CHECKOUT ===== */
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <button className="btn btn-link mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Quay lại
        </button>

        <div className="row g-4">
          <div className="col-lg-8">
            <h2>Thanh toán</h2>

            {paymentMethods.map((m) => {
              const Icon = m.icon;
              return (
                <label key={m.id} className="d-flex border p-3 mb-2">
                  <input
                    type="radio"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="me-2"
                  />
                  <Icon className="me-2" /> {m.name}
                </label>
              );
            })}
          </div>

          <div className="col-lg-4">
            <div className="card p-3">
              <h5>Tổng tiền</h5>
              <h3 className="text-primary">
                {bookingData.totalAmount.toLocaleString("vi-VN")}đ
              </h3>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : "Thanh toán"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
