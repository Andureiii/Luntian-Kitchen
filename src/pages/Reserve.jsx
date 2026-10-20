import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { content } from "../data/content";
import { tables } from "../data/tableData";
import { useApp } from "../context/AppContext";
import Reservation from "../models/Reservation";

function Field({ k, errors, children }) {
  return (
    <label className="block text-sm font-semibold">
      {content.reserve.labels[k]}
      <div className="mt-1 font-normal">{children}</div>
      {errors[k] && <p className="mt-1 text-xs text-red-600" role="alert">{errors[k]}</p>}
    </label>
  );
}

export default function Reserve() {
  const r = content.reserve;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { reservations, addReservation } = useApp();
  const [form, setForm] = useState({
    tableId: params.get("table") || "",
    name: "", phone: "", notes: "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    guests: params.get("guests") || 2,
  });
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().slice(0, 10);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const table = tables.find((t) => t.id === Number(form.tableId));

  const submit = (e) => {
    e.preventDefault();
    const found = Reservation.validate(form, table, reservations);
    setErrors(found);
    if (Object.keys(found).length) return;
    addReservation(new Reservation({ ...form, table, id: Date.now() }));
    navigate("/reservations");
  };

  return (
    <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
      <div>
        <h1 className="text-3xl font-extrabold">{r.title}</h1>
        <p className="mt-2 text-ink/70">{r.sub}</p>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <Field k="table" errors={errors}>
            <select value={form.tableId} onChange={set("tableId")} className="field">
              <option value="">{r.selectTable}</option>
              {tables.map((t) => <option key={t.id} value={t.id}>{t.name} · {t.seats} {r.seatsUnit}</option>)}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field k="date" errors={errors}><input type="date" min={today} value={form.date} onChange={set("date")} className="field" /></Field>
            <Field k="time" errors={errors}>
              <select value={form.time} onChange={set("time")} className="field">
                <option value="">{r.selectTime}</option>
                {r.timeSlots.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field k="guests" errors={errors}>
              <select value={form.guests} onChange={set("guests")} className="field">
                {r.guestOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </div>
          <Field k="name" errors={errors}><input value={form.name} onChange={set("name")} className="field" /></Field>
          <Field k="phone" errors={errors}><input value={form.phone} onChange={set("phone")} inputMode="tel" className="field" /></Field>
          <Field k="notes" errors={errors}><textarea rows="3" value={form.notes} onChange={set("notes")} placeholder={r.notesPlaceholder} className="field" /></Field>
          <button className="btn-primary">{r.submit}</button>
        </form>
      </div>

      <aside className="h-fit rounded-2xl bg-mint p-6">
        <h2 className="text-xl font-bold">{r.summary.title}</h2>
        {!table ? (
          <p className="mt-3 text-ink/70">{r.summary.empty}</p>
        ) : (
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden="true">{table.emoji}</span>
              <div><dt className="sr-only">{r.labels.table}</dt><dd className="text-lg font-bold">{table.name}</dd><dd className="text-ink/60">{table.area} · {table.seats} {r.seatsUnit}</dd></div>
            </div>
            <div className="flex justify-between"><dt>{r.summary.when}</dt><dd className="font-semibold">{form.date && form.time ? `${form.date} · ${form.time}` : "—"}</dd></div>
            <div className="flex justify-between"><dt>{r.summary.guests}</dt><dd className="font-semibold">{form.guests}</dd></div>
            <div className="flex justify-between border-t border-leaf/20 pt-3 text-base"><dt className="font-bold">{r.summary.total}</dt><dd className="font-bold text-leaf">{table.depositLabel}</dd></div>
            <p className="text-xs text-ink/60">{r.summary.note}</p>
          </dl>
        )}
      </aside>
    </div>
  );
}
