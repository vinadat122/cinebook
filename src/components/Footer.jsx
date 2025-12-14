import { Link } from "react-router-dom";
import {
  Ticket,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded"
                style={{ width: 40, height: 40 }}
              >
                <Ticket size={22} className="text-white" />
              </div>
              <span className="fs-4 fw-bold text-primary">CINESTAR</span>
            </Link>

            <p className="text-secondary small">
              Hệ thống rạp chiếu phim hiện đại hàng đầu Việt Nam với công nghệ
              IMAX, 4DX và trải nghiệm điện ảnh tuyệt vời nhất.
            </p>

            <div className="d-flex gap-3">
              <a href="#" className="text-secondary">
                <Facebook />
              </a>
              <a href="#" className="text-secondary">
                <Instagram />
              </a>
              <a href="#" className="text-secondary">
                <Youtube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="mb-3">Liên kết nhanh</h5>
            <ul className="list-unstyled small">
              {[
                "Phim đang chiếu",
                "Phim sắp chiếu",
                "Rạp chiếu",
                "Khuyến mãi",
                "Tin tức",
              ].map((item) => (
                <li key={item} className="mb-2">
                  <Link to="#" className="text-secondary text-decoration-none">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="mb-3">Hỗ trợ</h5>
            <ul className="list-unstyled small">
              {[
                "Hướng dẫn đặt vé",
                "Chính sách bảo mật",
                "Điều khoản sử dụng",
                "Câu hỏi thường gặp",
                "Liên hệ",
              ].map((item) => (
                <li key={item} className="mb-2">
                  <Link to="#" className="text-secondary text-decoration-none">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="mb-3">Liên hệ</h5>
            <ul className="list-unstyled small">
              <li className="d-flex gap-2 mb-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span className="text-secondary">
                  271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM
                </span>
              </li>
              <li className="d-flex gap-2 mb-2">
                <Phone size={18} className="text-primary" />
                <span className="text-secondary">1900 6017</span>
              </li>
              <li className="d-flex gap-2">
                <Mail size={18} className="text-primary" />
                <span className="text-secondary">support@cinestar.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small">
          <p className="mb-0 text-secondary">
            © 2024 CineStar. Tất cả quyền được bảo lưu.
          </p>
          <div className="d-flex gap-4">
            <Link to="#" className="text-secondary text-decoration-none">
              Điều khoản
            </Link>
            <Link to="#" className="text-secondary text-decoration-none">
              Bảo mật
            </Link>
            <Link to="#" className="text-secondary text-decoration-none">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
