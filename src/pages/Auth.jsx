import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* ===== Nếu đã đăng nhập thì không vào trang này ===== */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, [navigate]);

  /* ===== Submit form ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 👉 DEMO login / register
    setTimeout(() => {
      const userData = {
        email,
        fullName: fullName || "User Demo",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-6 col-lg-4">
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <Ticket size={32} />
            <h2 className="fw-bold mb-0">CINESTAR</h2>
          </div>

          <h4 className="fw-bold">
            {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
          </h4>
          <p className="text-muted small">
            {isLogin
              ? "Đăng nhập để đặt vé và xem lịch sử"
              : "Tạo tài khoản để đặt vé nhanh hơn"}
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Full name */}
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Họ và tên</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label">Mật khẩu</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading
                  ? "Đang xử lý..."
                  : isLogin
                  ? "Đăng nhập"
                  : "Đăng ký"}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center mt-3">
              <small className="text-muted">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              </small>
              <button
                type="button"
                className="btn btn-link p-0 ms-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
