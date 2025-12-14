import { seatLayout } from "../data/movies";

const SeatSelection = ({ selectedSeats, onSeatSelect }) => {
  const toggleSeat = (seat) => {
    if (seatLayout.occupiedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      onSeatSelect(selectedSeats.filter((s) => s !== seat));
    } else {
      onSeatSelect([...selectedSeats, seat]);
    }
  };

  return (
    <div>
      <h4 className="text-center fw-bold mb-4">Chọn ghế</h4>

      {/* Screen */}
      <div className="bg-secondary text-center text-white py-2 rounded mb-4">
        MÀN HÌNH
      </div>

      {/* Seats */}
      <div className="d-flex flex-column align-items-center gap-2">
        {seatLayout.rows.map((row) => (
          <div key={row} className="d-flex align-items-center gap-2">
            <strong style={{ width: 20 }}>{row}</strong>

            {Array.from({ length: seatLayout.seatsPerRow }).map((_, i) => {
              const seat = `${row}${i + 1}`;
              const isOccupied = seatLayout.occupiedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              const isVIP = seatLayout.vipRows.includes(row);

              let className = "btn btn-sm";

              if (isOccupied) className += " btn-secondary disabled";
              else if (isSelected) className += " btn-primary";
              else if (isVIP) className += " btn-warning";
              else className += " btn-outline-secondary";

              return (
                <button
                  key={seat}
                  className={className}
                  style={{ width: 32, height: 32, padding: 0 }}
                  onClick={() => toggleSeat(seat)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
        <Legend color="btn-outline-secondary" label="Ghế thường" />
        <Legend color="btn-warning" label="Ghế VIP" />
        <Legend color="btn-primary" label="Đang chọn" />
        <Legend color="btn-secondary" label="Đã đặt" />
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="d-flex align-items-center gap-2">
    <button className={`btn btn-sm ${color}`} disabled></button>
    <small>{label}</small>
  </div>
);

export default SeatSelection;
