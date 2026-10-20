import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { content } from "../data/content";
import { tables } from "../data/tableData";
import TableCard from "../components/TableCard";

export default function Home() {
  const h = content.home;
  const r = content.reserve;
  const navigate = useNavigate();
  const [q, setQ] = useState({ date: "", time: "", guests: 2 });
  const featured = tables.filter((t) => [3, 4, 1].includes(t.id));
  const set = (k) => (e) => setQ({ ...q, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => v && p.set(k, v));
    navigate(`/tables?${p.toString()}`);
  };

  return (
    <div className="space-y-14">
      <section className="grid items-center gap-8 rounded-3xl bg-mint p-6 md:grid-cols-2 md:p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{h.title}</h1>
          <p className="mt-4 max-w-md text-lg text-ink/75">{h.sub}</p>
          <Link to="/tables" className="btn-line mt-6">{h.tablesCta}</Link>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">{h.quickTitle}</h2>
          <input type="date" value={q.date} onChange={set("date")} className="field" aria-label={r.labels.date} />
          <div className="grid grid-cols-2 gap-3">
            <select value={q.time} onChange={set("time")} className="field" aria-label={r.labels.time}>
              <option value="">{r.selectTime}</option>
              {r.timeSlots.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={q.guests} onChange={set("guests")} className="field" aria-label={r.labels.guests}>
              {r.guestOptions.map((g) => <option key={g} value={g}>{g} {r.guestsUnit}</option>)}
            </select>
          </div>
          <button className="btn-soft w-full">{h.quickCta}</button>
        </form>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">{h.featuredTitle}</h2>
          <Link to="/tables" className="text-sm font-semibold text-leaf underline">{h.featuredCta}</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => <TableCard key={t.id} table={t} />)}
        </div>
      </section>
    </div>
  );
}
