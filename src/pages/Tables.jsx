import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { content } from "../data/content";
import { tables, areas } from "../data/tableData";
import TableCard from "../components/TableCard";

const maxDeposit = Math.max(...tables.map((t) => t.deposit));
const sizes = content.tables;

export default function Tables() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [minSeats, setMinSeats] = useState(Number(params.get("guests")) || 0);
  const [deposit, setDeposit] = useState(maxDeposit);

  const carry = ["date", "time", "guests"].filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`).join("&");

  const results = useMemo(
    () => tables.filter((t) => (area === "All" || t.area === area) && t.seats >= minSeats && t.deposit <= deposit && t.matches(search)),
    [search, area, minSeats, deposit]
  );
  const clear = () => { setSearch(""); setArea("All"); setMinSeats(0); setDeposit(maxDeposit); };

  return (
    <div>
      <h1 className="text-3xl font-extrabold">{sizes.title}</h1>
      <div className="mt-5 grid gap-4 md:grid-cols-3 md:items-end">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={sizes.searchPlaceholder} className="field" aria-label={sizes.searchPlaceholder} />
        <label className="text-sm font-semibold">
          {sizes.seatsLabel}
          <select value={minSeats} onChange={(e) => setMinSeats(Number(e.target.value))} className="field mt-1 font-normal">
            <option value={0}>{sizes.anySeats}</option>
            {[2, 4, 6, 8].map((n) => <option key={n} value={n}>{n} {sizes.seatsUnit}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold">
          {sizes.depositLabel}: ₱{deposit}
          <input type="range" min="50" max={maxDeposit} step="10" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} className="accent-leaf" />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {areas.map((a) => (
          <button key={a} onClick={() => setArea(a)} aria-pressed={area === a} className={area === a ? "btn-primary" : "btn-line"}>{a}</button>
        ))}
        <button onClick={clear} className="btn text-leaf underline">{sizes.clear}</button>
      </div>
      <p className="mt-5 text-sm text-ink/60">{results.length} {sizes.resultsSuffix}</p>
      {results.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-mint p-6">{sizes.empty}</p>
      ) : (
        <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => <TableCard key={t.id} table={t} query={carry} />)}
        </div>
      )}
    </div>
  );
}
