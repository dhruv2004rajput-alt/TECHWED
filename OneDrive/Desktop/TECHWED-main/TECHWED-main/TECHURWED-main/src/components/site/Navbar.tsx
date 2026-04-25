import { useEffect, useState } from "react";
import { Link, NavLink as RNavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Past Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 8);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/95 shadow-soft" : "bg-cream/70"} backdrop-blur-xl border-b border-gold/30`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="w-7 h-7 text-pink fill-pink heart-beat" />
              <span className="absolute inset-0 bg-pink/30 rounded-full blur-md group-hover:blur-lg transition-all" />
            </div>
            <div className="leading-none">
              <div className="font-display font-extrabold text-lg md:text-xl gradient-text-festive tracking-wide">TECH UR WED</div>
              <div className="font-script text-[10px] md:text-xs text-pink -mt-0.5">your love, our craft</div>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <RNavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? "text-primary bg-gold/20"
                        : "text-foreground/80 hover:text-primary hover:bg-gold/10"
                    }`
                  }
                >
                  {l.label}
                </RNavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-festive text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-pink hover:-translate-y-0.5 transition-all"
            >
              Book Demo
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden w-10 h-10 grid place-items-center rounded-lg hover:bg-gold/15 text-primary"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed top-16 inset-x-0 bottom-0 z-40 bg-cream overflow-y-auto p-4 lg:hidden animate-slide-down border-t border-gold/30">
          {links.map((l) => (
            <RNavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `block px-5 py-4 rounded-2xl font-semibold text-lg transition-all ${
                  isActive ? "bg-gradient-festive text-primary-foreground shadow-pink" : "text-foreground hover:bg-gold/15"
                }`
              }
            >
              {l.label}
            </RNavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 block text-center bg-gradient-festive text-primary-foreground py-4 rounded-full font-semibold shadow-pink"
          >
            🎉 Book a Free Demo
          </Link>
        </div>
      )}
    </>
  );
};
