export default class Table {
  constructor({ id, name, area, seats, deposit, emoji, description, features }) {
    this.id = id;
    this.name = name;
    this.area = area;
    this.seats = seats;
    this.deposit = deposit;
    this.emoji = emoji;
    this.description = description;
    this.features = features;
  }
  get depositLabel() {
    return `₱${this.deposit.toFixed(2)}`;
  }
  fits(guests) {
    return guests <= this.seats;
  }
  matches(query) {
    const q = query.trim().toLowerCase();
    return [this.name, this.description, this.area, ...this.features].join(" ").toLowerCase().includes(q);
  }
}
