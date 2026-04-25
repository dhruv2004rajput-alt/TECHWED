import { Layout } from "./components/site/Layout";
import { AnimatedHeading } from "./components/site/AnimatedHeading";
import { Confetti } from "./components/site/Confetti";
import { Link } from "react-router-dom";
import { Check, Sparkles, Heart, Crown, Star, Gift, ArrowRight } from "lucide-react";
import ringsImg from "./assets/wedding-rings.jpg";

const packages = [
  {
    name: "Classic",
    icon: Heart,
    price: "₹2,999",
    color: "pink",
    desc: "Perfect intimate invite for close family",
    features: ["5 animated sections", "RSVP form", "Photo gallery (10 photos)", "Google Maps", "WhatsApp share", "Mobile responsive", "1 design revision"],
    popular: false,
  },
  {
    name: "Royal",
    icon: Crown,
    price: "₹5,999",
    color: "gold",
    desc: "Most loved — full features for grand weddings",
    features: ["10+ animated sections", "RSVP with meal preferences", "Unlimited photo gallery", "Background music", "Event timeline (Mehendi, Sangeet, Wedding)", "Live countdown timer", "Custom domain (1 year)", "3 design revisions", "Priority support"],
    popular: true,
  },
  {
    name: "Luxe",
    icon: Star,
    price: "₹9,999",
    color: "plum",
    desc: "Ultra-premium custom-coded experience",
    features: ["Everything in Royal", "Fully custom theme & art", "Pre-wedding video integration", "Multi-language support", "Guest login dashboard", "Live photo upload by guests", "Hosting + domain (2 years)", "Unlimited revisions", "Dedicated designer"],
    popular: false,
  },
];

const Services = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-cream overflow-hidden">
        <Confetti count={16} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-pink/15 text-pink border border-pink/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
            <Gift size={14} /> Wedding Website Packages
          </span>
          <AnimatedHeading as="h1" className="text-5xl md:text-7xl font-display mb-5">
            Pick Your Perfect Package
          </AnimatedHeading>
          <p className="font-cormorant italic text-xl gradient-text-rose mb-3">~ transparent pricing, no hidden fees ~</p>
          <p className="text-foreground/70 text-lg">Every package is fully customisable. Don't see what you need? <Link to="/contact" className="text-pink underline font-semibold">Talk to us</Link>.</p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className={`relative bg-card rounded-3xl p-8 border-2 reveal-zoom reveal hover-lift transition-all ${
                    p.popular ? "border-gold shadow-gold scale-105 lg:scale-110" : "border-border hover:border-gold/50"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {p.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-festive text-cream px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-pink">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl bg-${p.color}/15 grid place-items-center mb-5`}>
                    <Icon className={`w-8 h-8 text-${p.color}`} />
                  </div>
                  <h3 className="font-display text-3xl mb-1">{p.name}</h3>
                  <p className="text-foreground/60 text-sm mb-5">{p.desc}</p>
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-5xl gradient-text-festive">{p.price}</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">one-time payment · lifetime invite</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className={`w-5 h-5 rounded-full bg-${p.color}/15 grid place-items-center shrink-0 mt-0.5`}>
                          <Check size={12} className={`text-${p.color}`} />
                        </span>
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold transition-all ${
                      p.popular
                        ? "bg-gradient-festive text-cream shadow-pink hover:-translate-y-0.5"
                        : "bg-secondary text-primary hover:bg-gold hover:text-primary-foreground"
                    }`}
                  >
                    Choose {p.name} <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="py-20 bg-gradient-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center bg-card rounded-3xl p-8 lg:p-14 border-2 border-gold/30 shadow-soft reveal">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img src={ringsImg} alt="Wedding rings on bride's mehendi hands" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 bg-teal/15 text-teal border border-teal/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={12} /> Need Something Unique?
              </span>
              <h2 className="text-4xl md:text-5xl font-display mb-4">Custom Themes & Add-Ons</h2>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Want a Bollywood theme? A 3D animated couple? Live wedding streaming? A guest book with voice notes? We build the impossible.
              </p>
              <ul className="space-y-2 mb-7">
                {["3D animations & interactive scenes", "Live wedding streaming integration", "Multi-language (Hindi, Gujarati, Tamil...)", "Custom illustrations & art"].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Heart className="w-4 h-4 text-pink fill-pink" /> {t}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:bg-plum transition-all">
                Discuss Your Idea <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
