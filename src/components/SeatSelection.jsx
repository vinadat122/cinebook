import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_BASE = "http://localhost/cinebook-api/api";

const SeatSelection = ({ showtimeId, selectedSeats, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);

  const sessionId =
    localStorage.getItem("seat_session") ||
    (() => {
      const s = crypto.randomUUID();
      localStorage.setItem("seat_session", s);
      return s;
    })();

  /* ===== LOAD SEATS ===== */
  const loadSeats = () => {
    if (!showtimeId) return;

    fetch(`${API_BASE}/seats?showtime_id=${showtimeId}&session_id=${sessionId}`)
      .then((res) => res.json())
      .then(setSeats);
  };

  useEffect(() => {
    loadSeats();
  }, [showtimeId]);

  /* ===== HOLD ===== */
  const holdSeat = async (seatId) => {
    const res = await fetch(`${API_BASE}/seat-hold/index.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "hold",
        showtime_id: showtimeId,
        seat_id: seatId,
        session_id: sessionId,
      }),
    });

    if (res.status === 409) {
      toast.error("Ghế đã được giữ bởi người khác");
      loadSeats();
      return false;
    }

    if (!res.ok) {
      toast.error("Lỗi hệ thống");
      return false;
    }

    toast.success("Đã giữ ghế (5 phút)");
    return true;
  };

  /* ===== RELEASE ===== */
  const releaseSeat = async (seatId) => {
    await fetch(`${API_BASE}/seat-hold/index.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "release",
        showtime_id: showtimeId,
        seat_id: seatId,
        session_id: sessionId,
      }),
    });

    toast("Đã bỏ chọn ghế", { icon: "↩️" });
  };

  /* ===== CLICK ===== */
  const toggleSeat = async (seat) => {
    if (seat.status === "booked" || seat.status === "holding") {
      toast.error("Ghế đã được giữ bởi người khác");
      return;
    }

    // BỎ CHỌN
    if (selectedSeats.includes(seat.id)) {
      await releaseSeat(seat.id);
      onSeatSelect(selectedSeats.filter((id) => id !== seat.id));
      loadSeats();
      return;
    }

    // CHỌN
    const ok = await holdSeat(seat.id);
    if (!ok) return;

    onSeatSelect([...selectedSeats, seat.id]);
    loadSeats();
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id);

        let bg = "bg-gray-300";
        if (seat.status === "booked") bg = "bg-red-500";
        if (seat.status === "holding") bg = "bg-yellow-400";
        if (seat.status === "holding_me") bg = "bg-green-400";
        if (isSelected) bg = "bg-green-600";

        const isDisabled =
          seat.status === "booked" ||
          (seat.status === "holding" && !isSelected);

        return (
          <button
            key={seat.id}
            disabled={isDisabled}
            onClick={() => toggleSeat(seat)}
            className={`p-2 rounded text-xs text-white transition ${bg}`}
          >
            {seat.seat_code}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelection;
