import { Link, useParams } from "react-router-dom";
import { content } from "../data/content";
import { tables } from "../data/tableData";
import { useApp } from "../context/AppContext";

export default function TableDetails() {
  const t = content.detail;
  const { id } = useParams();
  const { favorites, toggleFavorite } = useApp();
  const table = tables.find((x) => x.id === Number(id));

  if (!table) return <p>{t.missing}</p>;
  const isFav = favorites.includes(table.id);

  return (
    <div>
      <Link to="/tables" className="text-sm font-semibold text-leaf underline">{t.back}</Link>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-3xl bg-mint text-9xl md:h-96">
          <span aria-hidden="true">{table.emoji}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-leaf">{table.area}</p>
          <h1 className="mt-1 text-4xl font-extrabold">{table.name}</h1>
          <p className="mt-4 max-w-md text-ink/75">{table.description}</p>
          <dl className="mt-5 flex gap-8">
            <div><dt className="text-sm text-ink/60">{t.seats}</dt><dd className="text-2xl font-bold text-leaf">{table.seats}</dd></div>
            <div><dt className="text-sm text-ink/60">{t.deposit}</dt><dd className="text-2xl font-bold text-leaf">{table.depositLabel}</dd></div>
          </dl>
          <h2 className="mt-6 text-lg font-bold">{t.features}</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {table.features.map((f) => <li key={f} className="rounded-full bg-butter px-3 py-1 text-sm text-deep">{f}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/reserve?table=${table.id}`} className="btn-primary">{t.reserve}</Link>
            <button onClick={() => toggleFavorite(table.id)} aria-pressed={isFav} className="btn-line">{isFav ? t.saved : t.save}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
