import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import TableDetails from "./pages/TableDetails";
import MyReservations from "./pages/MyReservations";
import Favorites from "./pages/Favorites";
import Reserve from "./pages/Reserve";
import { content } from "./data/content";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/tables/:id" element={<TableDetails />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="*" element={<p className="py-20 text-center">{content.notFound}</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
