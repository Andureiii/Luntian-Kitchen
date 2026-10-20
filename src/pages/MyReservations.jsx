import { Link } from "react-router-dom";
import { content } from "../data/content";
import { useApp } from "../context/AppContext";

export default function MyReservations() {
  const b = content.bookings;
  const { reservations, cancelReservation } = useApp();
  const total = reservations.reduce((s, r) => s + r.deposit, 0);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">{b.title}</h1>
      {reservations.length === 0 ? (
        <div className="py-12 text-center">
          <p>{b.empty}</p>
          <Link to="/reserve" className="btn-primary mt-4">{b.emptyCta}</Link>
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {reservations.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-leaf/15 p-4">
                <span className="text-4xl" aria-hidden="true">{r.table.emoji}</span>
                <div className="min-w-[10rem] flex-1">
                  <p className="font-bold">{r.table.name}</p>
                  <p className="text-sm text-ink/70">{r.summary} · {r.guests} {b.guestsUnit}</p>
                  <p className="text-sm text-ink/60">{r.name} · {r.phone}</p>
                </div>
                <p className="font-semibold text-leaf">{b.deposit}: {r.table.depositLabel}</p>
                <button onClick={() => cancelReservation(r.id)} className="text-sm text-leaf underline">{b.cancel}</button>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-right text-xl font-bold">{b.total}: ₱{total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
