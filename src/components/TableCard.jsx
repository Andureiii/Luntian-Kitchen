import { Link } from "react-router-dom";
import { content } from "../data/content";
import { useApp } from "../context/AppContext";

export default function TableCard({ table, query = "" }) {
  const c = content.card;
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(table.id);
  const reserveLink = `/reserve?table=${table.id}${query ? `&${query}` : ""}`;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-leaf/15 bg-white">
      <div className="relative flex h-32 items-center justify-center bg-mint text-6xl">
        <span aria-hidden="true">{table.emoji}</span>
        <span className="absolute left-3 top-3 rounded-full bg-butter px-2.5 py-0.5 text-xs font-semibold text-deep">{table.area}</span>
        <button
          onClick={() => toggleFavorite(table.id)}
          aria-pressed={isFav}
          aria-label={isFav ? c.unsave : c.save}
          className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-lg leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
        >
          <span className={isFav ? "text-red-500" : "text-leaf/40"}>{isFav ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-lg font-bold">{table.name}</h3>
        <p className="text-sm font-semibold text-leaf">{table.seats} {c.seats} · {table.depositLabel} {c.deposit}</p>
        <p className="flex-1 text-sm text-ink/70">{table.description}</p>
        <div className="mt-3 flex gap-2">
          <Link to={reserveLink} className="btn-primary flex-1">{c.reserve}</Link>
          <Link to={`/tables/${table.id}`} className="btn-line">{c.details}</Link>
        </div>
      </div>
    </article>
  );
}
