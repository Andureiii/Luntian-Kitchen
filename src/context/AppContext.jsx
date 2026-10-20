import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);

  const toggleFavorite = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const addReservation = (r) => setReservations((l) => [r, ...l]);
  const cancelReservation = (id) => setReservations((l) => l.filter((r) => r.id !== id));

  return (
    <AppContext.Provider value={{ favorites, reservations, toggleFavorite, addReservation, cancelReservation }}>
      {children}
    </AppContext.Provider>
  );
}
