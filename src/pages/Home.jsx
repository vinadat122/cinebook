import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import CinemaSection from "../components/CinemaSection";
import PromotionSection from "../components/PromotionSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="pt-5">
        <HeroBanner />
        <MovieSection />
        <CinemaSection />
        <PromotionSection />
      </main>

      <Footer />
    </>
  );
};

export default Home;
