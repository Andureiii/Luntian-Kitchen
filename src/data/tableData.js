import Table from "../models/Table";

const raw = [
  { id: 1, name: "Sampaguita Nook", area: "Window", seats: 2, deposit: 100, emoji: "🪟", description: "A cozy two-seater beside the front window.", features: ["Quiet", "Natural light", "Great for dates"] },
  { id: 2, name: "Dahon Booth", area: "Indoor", seats: 4, deposit: 150, emoji: "🛋️", description: "A padded booth near the open kitchen.", features: ["Booth seating", "Near kitchen", "Air-conditioned"] },
  { id: 3, name: "Hardin Table", area: "Garden", seats: 4, deposit: 150, emoji: "🌿", description: "A table under the trees in our herb garden.", features: ["Outdoor", "Shaded", "Pet friendly"] },
  { id: 4, name: "Bahay Kubo Long Table", area: "Garden", seats: 8, deposit: 300, emoji: "🛖", description: "A long garden table in a nipa hut for family gatherings.", features: ["Outdoor", "Big groups", "Covered"] },
  { id: 5, name: "Luntian Room", area: "Private", seats: 10, deposit: 500, emoji: "🚪", description: "A private room with its own door and screen.", features: ["Private", "Air-conditioned", "Karaoke screen"] },
  { id: 6, name: "Bintana Counter", area: "Window", seats: 2, deposit: 80, emoji: "🪑", description: "Window counter seats facing the street.", features: ["Solo friendly", "Quick meals", "Natural light"] },
  { id: 7, name: "Palayan Corner", area: "Indoor", seats: 6, deposit: 250, emoji: "🌾", description: "A corner table with space for a small group.", features: ["Wheelchair access", "Quiet", "Air-conditioned"] },
  { id: 8, name: "Kawayan Terrace", area: "Garden", seats: 6, deposit: 220, emoji: "🎋", description: "A bamboo terrace table with garden views.", features: ["Outdoor", "Sunset view", "Covered"] },
  { id: 9, name: "Mayumi Table", area: "Indoor", seats: 4, deposit: 130, emoji: "🍽️", description: "A classic four-seater in the main dining hall.", features: ["Central", "Air-conditioned", "High chair available"] },
  { id: 10, name: "Alon Private Booth", area: "Private", seats: 6, deposit: 350, emoji: "🛋️", description: "A curtained booth for small celebrations.", features: ["Private", "Curtained", "Birthday setup"] },
];

export const tables = raw.map((r) => new Table(r));
export const areas = ["All", "Indoor", "Garden", "Window", "Private"];
