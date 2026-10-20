import { Link } from "react-router-dom";
import { content } from "../data/content";
import { tables } from "../data/tableData";
import { useApp } from "../context/AppContext";
import TableCard from "../components/TableCard";

export default function Favorites() {
  const f = content.favorites;
  const { favorites } = useApp();
  const items = tables.filter((t) => favorites.includes(t.id));

  return (
    <div>
      <h1 className="text-3xl font-extrabold">{f.title}</h1>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p>{f.empty}</p>
          <Link to="/tables" className="btn-primary mt-4">{f.emptyCta}</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => <TableCard key={t.id} table={t} />)}
        </div>
      )}
    </div>
  );
}
