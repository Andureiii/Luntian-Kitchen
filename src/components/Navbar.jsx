import { NavLink, Link } from "react-router-dom";
import { content } from "../data/content";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { reservations, favorites } = useApp();
  const badge = { "/reservations": reservations.length, "/favorites": favorites.length };
  return (
    <header className="sticky top-0 z-10 border-b border-leaf/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="font-display text-xl font-extrabold text-leaf">{content.brand}</Link>
        <nav className="flex gap-1 overflow-x-auto text-sm font-semibold">
          {content.nav.map((n) => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 transition ${isActive ? "bg-leaf text-white" : "text-deep hover:bg-mint"}`
              }
            >
              {n.label}
              {badge[n.path] > 0 && <span className="rounded-full bg-butter px-1.5 text-xs text-deep">{badge[n.path]}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
