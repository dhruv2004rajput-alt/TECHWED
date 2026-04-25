const items = [
  "✨ Animated Invites",
  "💍 RSVP Forms",
  "📸 Photo Galleries",
  "🎵 Background Music",
  "📍 Venue Maps",
  "💌 Custom Designs",
  "🌹 Floral Themes",
  "🪔 Traditional + Modern",
];

export const Marquee = () => {
  const all = [...items, ...items];
  return (
    <div className="bg-gradient-festive py-4 overflow-hidden border-y-2 border-gold/40">
      <div className="flex gap-12 marquee-track whitespace-nowrap">
        {all.map((it, i) => (
          <span key={i} className="text-cream font-cormorant text-lg md:text-xl tracking-wide shrink-0">
            {it} <span className="text-gold mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
