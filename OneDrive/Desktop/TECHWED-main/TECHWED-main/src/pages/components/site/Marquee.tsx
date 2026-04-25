import React from 'react';

interface MarqueeProps {
  children?: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

export default function Marquee({ children, direction = 'left', speed = 20 }: MarqueeProps) {
  const items = [
    "✨ Animated Invites",
    "💍 RSVP Forms",
    "📸 Photo Galleries",
    "🎵 Background Music",
    "📍 Venue Maps",
    "💌 Custom Designs"
  ];
  
  const displayItems = children ? [children] : items;
  
  return (
    <div className="overflow-hidden whitespace-nowrap relative w-full py-4 bg-gradient-to-r from-rose-700 to-rose-800 text-white">
      <div 
        className="inline-flex gap-8 animate-marquee"
        style={{
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationDuration: `${speed}s`,
        }}
      >
        {displayItems.map((item, i) => (
          <span key={i} className="inline-block font-serif text-lg">
            {item} <span className="text-amber-400 mx-4">✦</span>
          </span>
        ))}
        {displayItems.map((item, i) => (
          <span key={`dup-${i}`} className="inline-block font-serif text-lg">
            {item} <span className="text-amber-400 mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}