import { content } from "../data/content";

export default function Footer() {
  const f = content.footer;
  return (
    <footer className="bg-deep text-sm text-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-6">
        <span className="font-display font-bold text-butter">{content.brand}</span>
        <span>{f.address}</span>
        <span>{f.hours}</span>
        <span>{f.note}</span>
      </div>
    </footer>
  );
}
