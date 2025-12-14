import { MapPin, ChevronRight } from "lucide-react";
import { cinemas } from "../data/movies";

const CinemaSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Hệ thống rạp chiếu</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
            Trải nghiệm điện ảnh đỉnh cao với công nghệ IMAX, 4DX và âm thanh Dolby
            Atmos tại các rạp CineStar trên toàn quốc
          </p>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                {/* Image */}
                <div className="position-relative overflow-hidden">
                  <img
                    src={cinema.image}
                    alt={cinema.name}
                    className="w-100"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,.7), transparent)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="card-body">
                  <h5 className="fw-bold mb-2">{cinema.name}</h5>

                  <div className="d-flex gap-2 text-muted small">
                    <MapPin size={16} className="text-primary mt-1" />
                    <span>{cinema.address}</span>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-primary btn-sm flex-fill">
                      Xem lịch chiếu
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <MapPin size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-5">
          <button className="btn btn-outline-secondary btn-lg">
            Xem tất cả rạp
            <ChevronRight size={20} className="ms-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinemaSection;
