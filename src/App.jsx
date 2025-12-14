import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Cinemas from "./pages/Cinemas";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import BookingHistory from "./pages/BookingHistory";

function App() {
  return (
    <Router>
      
      <Navbar />

      
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
