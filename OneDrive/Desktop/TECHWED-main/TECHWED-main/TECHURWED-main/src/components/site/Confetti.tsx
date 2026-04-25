import { useEffect, useState } from "react";

const COLORS = ["hsl(348 75% 50%)", "hsl(42 88% 55%)", "hsl(335 80% 62%)", "hsl(178 60% 45%)", "hsl(290 50% 50%)"];

export const Confetti = ({ count = 24 }: { count?: number }) => {
  const [pieces] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      color: COLORS[i % COLORS.length],
      rotate: Math.random() * 360,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            top: 0,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};
