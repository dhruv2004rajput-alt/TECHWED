import { Layout } from "./components/site/Layout";
import { AnimatedHeading } from "./components/site/AnimatedHeading";
import { Confetti } from "./components/site/Confetti";
import { Heart, Sparkles, Award, Users, Smile, Code, Palette, Rocket } from "lucide-react";
import mandapImg from "./assets/wedding-mandap.jpg";

const About = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-cream overflow-hidden">
        <Confetti count={14} />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-pink/15 text-pink border border-pink/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
              <Heart size={14} className="fill-current" /> Our Story
            </span>
            <AnimatedHeading as="h1" className="text-5xl md:text-7xl font-display mb-5">
              Made For Lovers, By Lovers
            </AnimatedHeading>
            <p className="font-cormorant italic text-2xl gradient-text-rose mb-5">~ where every pixel sings of love ~</p>
            <p className="text-foreground/70 text-lg leading-relaxed mb-4">
              TECH UR WED was born from a simple idea: <strong className="text-primary">every love story deserves to be celebrated beautifully</strong>. We're a team of passionate designers and developers who believe weddings shouldn't end with a paper card — they should begin with a stunning digital experience.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              From traditional Indian weddings to destination celebrations, we craft animated invitation websites that wow guests, save trees, and create memories that live forever.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-elegant border-4 border-gold/40">
              <img src={mandapImg} alt="Beautiful wedding mandap" loading="lazy" width={1280} height={896} className="w-full h-full object-cover scroll-zoom-img" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-elegant border border-gold/30 float-anim">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-festive grid place-items-center">
                  <Heart className="w-6 h-6 text-cream fill-cream" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl gradient-text-festive">100%</p>
                  <p className="text-xs text-foreground/60">Couples in love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="divider-ornament font-script text-2xl gradient-text-rose mb-3">our values</p>
            <AnimatedHeading className="text-4xl md:text-5xl font-display">What We Stand For</AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger reveal">
            {[
              { icon: Heart, c: "pink", t: "Made With Love", d: "Every line of code & pixel is crafted with genuine care for your story." },
              { icon: Palette, c: "gold", t: "Stunning Design", d: "We never settle for ordinary — your invite will turn heads, guaranteed." },
              { icon: Rocket, c: "teal", t: "Lightning Fast", d: "From idea to live link in under a week, without compromising quality." },
              { icon: Smile, c: "plum", t: "Joy First", d: "Happy clients, happy guests. We optimize for smiles, not metrics." },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.t} className="bg-card rounded-3xl p-7 border border-border hover:border-gold/40 hover-lift">
                  <div className={`w-14 h-14 rounded-2xl bg-${v.c}/15 grid place-items-center mb-5`}>
                    <Icon className={`w-7 h-7 text-${v.c}`} />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{v.t}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gradient-festive relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-cream reveal-stagger reveal">
            {[
              { n: "50+", l: "Happy Couples", icon: Heart },
              { n: "100%", l: "Custom Designs", icon: Palette },
              { n: "5★", l: "Average Rating", icon: Award },
              { n: "24/7", l: "Support", icon: Users },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.l} className="reveal-zoom reveal">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-gold" />
                  <p className="font-display text-5xl md:text-6xl gradient-text-gold mb-1">{s.n}</p>
                  <p className="text-cream/70 text-sm uppercase tracking-widest font-semibold">{s.l}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-24 bg-gradient-cream">
        <div className="container max-w-3xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
          <AnimatedHeading className="text-4xl md:text-5xl font-display mb-6">Our Promise To You</AnimatedHeading>
          <p className="font-cormorant italic text-2xl text-foreground/80 leading-relaxed mb-4 reveal">
            "We treat your wedding website like our own — with love, attention, and the magic it deserves. Because when you say 'I do', the whole world should celebrate beautifully."
          </p>
          <p className="font-script text-3xl gradient-text-rose mt-6 reveal">— TECH UR WED Team 💕</p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
