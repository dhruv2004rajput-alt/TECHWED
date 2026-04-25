import { useEffect, useState } from "react";
import mandala from "./assets/mandala.png";

const SEEN_KEY = "tuw_curtain_seen";

export const CurtainIntro = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SEEN_KEY);
  });

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 3200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Center reveal: title behind curtains */}
      <div className="absolute inset-0 flex items-center justify-center bg-cream">
        <div className="text-center px-6">
          <img src={mandala} alt="" className="w-48 h-48 md:w-64 md:h-64 mx-auto opacity-80 ring-spin" />
          <div className="-mt-32 md:-mt-44 relative">
            <p className="font-script text-3xl md:text-5xl gradient-text-rose intro-glow">welcome to</p>
            <h1 className="font-display text-5xl md:text-7xl mt-2 gradient-text-festive font-extrabold tracking-wide">
              TECH UR WED
            </h1>
            <p className="font-cormorant italic text-lg md:text-xl text-primary/70 mt-3">crafting your love story online</p>
          </div>
        </div>
      </div>

      {/* Left curtain */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-curtain curtain-left shadow-2xl">
        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-gold via-gold-2 to-gold opacity-90" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,215,128,0.18) 0 30px, transparent 30px 60px)' }} />
        {/* Tassels */}
        <div className="absolute top-0 right-0 flex flex-col gap-3 p-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="block w-1 h-6 bg-gold/80 rounded-full" />
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-curtain curtain-right shadow-2xl">
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold via-gold-2 to-gold opacity-90" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,215,128,0.18) 0 30px, transparent 30px 60px)' }} />
        <div className="absolute top-0 left-0 flex flex-col gap-3 p-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="block w-1 h-6 bg-gold/80 rounded-full" />
          ))}
        </div>
      </div>

      {/* Top valance */}
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-r from-primary via-plum to-primary z-10 shadow-lg">
        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-r from-gold via-gold-2 to-gold" />
      </div>
    </div>
  );
};
