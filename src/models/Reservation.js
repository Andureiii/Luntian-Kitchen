import { content } from "../data/content";

export default class Reservation {
  constructor({ id, table, name, phone, date, time, guests, notes }) {
    this.id = id;
    this.table = table; // Table
    this.name = name;
    this.phone = phone;
    this.date = date;
    this.time = time;
    this.guests = Number(guests);
    this.notes = notes;
  }
  get deposit() {
    return this.table.deposit;
  }
  get summary() {
    return `${this.date} · ${this.time}`;
  }
  static validate(v, table, existing) {
    const m = content.reserve.errors;
    const errors = {};
    if (!table) errors.table = m.table;
    if (!v.name.trim()) errors.name = m.name;
    if (!/^[0-9+\s-]{7,15}$/.test(v.phone.trim())) errors.phone = m.phone;
    if (!v.date) errors.date = m.date;
    if (!v.time) errors.time = m.time;
    if (table && !table.fits(Number(v.guests))) errors.guests = m.capacity.replace("{n}", table.seats);
    if (table && v.date && v.time && existing.some((r) => r.table.id === table.id && r.date === v.date && r.time === v.time))
      errors.time = m.taken;
    return errors;
  }
}
