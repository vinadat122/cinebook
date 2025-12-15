import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, Star, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 👉 LẤY USER ĐÃ LOGIN
  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "Phim", path: "/movies" },
    { name: "Rạp chiếu", path: "/cinemas" },
    { name: "Khuyến mãi", path: "/promotions" },
    { name: "Tin tức", path: "/news" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  // 👉 ĐĂNG XUẤT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <Star size={28} className="text-warning" />
          <span className="fw-bold">CINESTAR</span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          {/* Menu */}
          <ul className="navbar-nav me-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control form-control-sm me-2"
              placeholder="Tìm phim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-warning btn-sm">
              <Search size={16} />
            </button>
          </form>

          {/* ===== AUTH AREA ===== */}
          {!user ? (
            // ❌ CHƯA LOGIN
            <Link to="/auth" className="btn btn-outline-light">
              <User size={18} />
            </Link>
          ) : (
            // ✅ ĐÃ LOGIN
            <div className="d-flex align-items-center gap-2">
              <span className="text-light small">
                Xin chào, <strong>{user.fullName || user.email}</strong>
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
                title="Đăng xuất"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {/* Book */}
          <Link to="/movies" className="btn btn-warning ms-3">
            Đặt vé ngay
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
