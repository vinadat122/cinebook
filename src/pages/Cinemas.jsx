import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cinemas } from "../data/movies";

const Cinemas = () => {
  const [selectedCity, setSelectedCity] = useState("all");

  const cities = [...new Set(cinemas.map((c) => c.city))];

  const filteredCinemas =
    selectedCity === "all"
      ? cinemas
      : cinemas.filter((c) => c.city === selectedCity);

  return (
    <div className="min-vh-100">
      <Navbar />

      <main className="pt-5 mt-5 pb-5">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4 mb-3">Hệ thống rạp</h1>
            <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
              Tìm rạp chiếu phim CineStar gần bạn nhất
            </p>
          </div>

          {/* Filter */}
          <div className="d-flex justify-content-center mb-5">
            <div className="input-group" style={{ maxWidth: 300 }}>
              <span className="input-group-text bg-white">
                <MapPin size={18} />
              </span>
              <select
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">Tất cả thành phố</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cinemas List */}
          <div className="row g-4">
            {filteredCinemas.map((cinema) => (
              <div key={cinema.id} className="col-12 col-md-6">
                <div className="card shadow-sm border-0 h-100">
                  <div className="row g-0 h-100">
                    {/* Image */}
                    <div className="col-md-4">
                      <img
                        src={cinema.image}
                        alt={cinema.name}
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="col-md-8">
                      <div className="card-body h-100 d-flex flex-column">
                        <h4 className="fw-bold mb-3">{cinema.name}</h4>

                        <div className="mb-3 small text-muted">
                          <div className="d-flex gap-2 mb-2">
                            <MapPin size={16} className="text-primary" />
                            <span>{cinema.address}</span>
                          </div>
                          <div className="d-flex gap-2 mb-2">
                            <Phone size={16} className="text-primary" />
                            <span>1900 6017</span>
                          </div>
                          <div className="d-flex gap-2">
                            <Clock size={16} className="text-primary" />
                            <span>08:00 - 24:00</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          {["IMAX", "4DX", "Dolby Atmos", "VIP"].map(
                            (feature) => (
                              <span
                                key={feature}
                                className="badge bg-secondary me-2 mb-2"
                              >
                                {feature}
                              </span>
                            )
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-auto d-flex gap-2">
                          <button className="btn btn-primary flex-fill">
                            Xem lịch chiếu
                          </button>
                          <button className="btn btn-outline-secondary">
                            <MapPin size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cinemas;
