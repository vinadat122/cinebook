import { Sparkles, Gift, Percent, CreditCard } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Happy Day",
    description: "Giảm 50% giá vé vào thứ 2 & thứ 4 hàng tuần",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Combo Tiết Kiệm",
    description: "Mua combo bắp nước tiết kiệm đến 30%",
    icon: Gift,
  },
  {
    id: 3,
    title: "Thành viên VIP",
    description: "Tích điểm đổi vé miễn phí & quà tặng hấp dẫn",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Sinh nhật",
    description: "Tặng vé xem phim miễn phí trong tháng sinh nhật",
    icon: Percent,
  },
];

const PromotionSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Khuyến mãi đặc biệt</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
            Nhiều ưu đãi hấp dẫn đang chờ đón bạn tại CineStar
          </p>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {promotions.map((promo) => {
            const Icon = promo.icon;
            return (
              <div key={promo.id} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="mb-3">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded"
                        style={{
                          width: 56,
                          height: 56,
                          backgroundColor: "#0d6efd",
                        }}
                      >
                        <Icon size={28} color="#fff" />
                      </div>
                    </div>

                    <h5 className="card-title fw-bold mb-2">
                      {promo.title}
                    </h5>
                    <p className="card-text text-muted">
                      {promo.description}
                    </p>

                    <button className="btn btn-link p-0 text-primary">
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
