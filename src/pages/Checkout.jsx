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

  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const bookingData = location.state;

  /* ===== Auth guard ===== */
  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: { from: location }, // để sau login quay lại checkout
      });
    }
  }, [user, navigate, location]);
  /* ===== Missing booking data ===== */
  useEffect(() => {
    if (!bookingData) navigate("/movies");
  }, [bookingData, navigate]);

  if (!user || !bookingData) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  /* ===== Payment handler ===== */
  const handlePayment = async () => {
    setIsProcessing(true);

    // Giả lập gọi API thanh toán
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  /* ===== SUCCESS PAGE ===== */
  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <CheckCircle size={80} className="text-success mb-4" />
          <h1 className="mb-3">ĐẶT VÉ THÀNH CÔNG</h1>
          <p className="text-muted mb-4">
            Thông tin vé đã được gửi tới email của bạn
          </p>

          <div className="card mx-auto mb-4" style={{ maxWidth: 500 }}>
            <div className="card-body text-start">
              <h5 className="card-title mb-3">Chi tiết vé</h5>

              <p>
                <strong>Phim:</strong> {bookingData.movie.title}
              </p>
              <p>
                <strong>Rạp:</strong> {bookingData.cinema.name}
              </p>
              <p>
                <strong>Ngày:</strong>{" "}
                {new Date(bookingData.date).toLocaleDateString("vi-VN")}
              </p>
              <p>
                <strong>Suất:</strong> {bookingData.showtime.time} -{" "}
                {bookingData.showtime.type}
              </p>
              <p>
                <strong>Ghế:</strong> {bookingData.seats.join(", ")}
              </p>

              <hr />
              <h4 className="text-end text-primary">
                {bookingData.totalAmount.toLocaleString("vi-VN")}đ
              </h4>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/booking-history")}
            >
              Lịch sử đặt vé
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Trang chủ
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ===== MAIN CHECKOUT ===== */
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <button className="btn btn-link mb-4 p-0" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Quay lại
        </button>

        <div className="row g-4">
          {/* PAYMENT */}
          <div className="col-lg-8">
            <h2 className="mb-4">Thanh toán</h2>

            <div className="card">
              <div className="card-body">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`d-flex align-items-center border rounded p-3 mb-3 ${
                        paymentMethod === method.id ? "border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="radio"
                        className="form-check-input me-3"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                      />
                      <Icon className="me-3" />
                      {method.name}
                    </label>
                  );
                })}

                <div className="alert alert-secondary mt-3">
                  demo thanh toán
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: 90 }}>
              <div className="card-body">
                <h5 className="mb-3">Thông tin đặt vé</h5>

                <img
                  src={bookingData.movie.poster}
                  alt=""
                  className="img-fluid rounded mb-3"
                />

                <p>
                  <strong>{bookingData.movie.title}</strong>
                </p>
                <p className="text-muted">{bookingData.cinema.name}</p>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Tổng tiền</span>
                  <strong className="fs-4 text-primary">
                    {bookingData.totalAmount.toLocaleString("vi-VN")}đ
                  </strong>
                </div>

                <button
                  className="btn btn-primary w-100 mt-4"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2
                        size={18}
                        className="me-2 spinner-border spinner-border-sm"
                      />
                      Đang xử lý...
                    </>
                  ) : (
                    "Thanh toán"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
