import { Link } from "react-router-dom";
import { Layout } from "./components/site/Layout";
import { AnimatedHeading } from "./components/site/AnimatedHeading";
import { Marquee } from "./components/site/Marquee";
import { Confetti } from "./components/site/Confetti";
import { Heart, Sparkles, MessageCircle, ArrowRight, Music, Camera, MapPin, Calendar, Users, Mail } from "lucide-react";
import heroImg from "./assets/wedding-hero.jpg";
import mandapImg from "./assets/wedding-mandap.jpg";
import ringsImg from "./assets/wedding-rings.jpg";
import mandala from "./assets/mandala.png";

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-cream">
        <Confetti count={20} />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink/20 rounded-full blur-3xl float-slow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/30 rounded-full blur-3xl float-anim" />
        <img src={mandala} alt="" aria-hidden className="absolute top-10 right-10 w-64 h-64 opacity-20 ring-spin hidden md:block" />
        <img src={mandala} alt="" aria-hidden className="absolute bottom-10 left-10 w-48 h-48 opacity-15 ring-spin hidden md:block" style={{ animationDirection: "reverse" }} />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
          <div>
            <span className="inline-flex items-center gap-2 bg-gold/20 text-primary border border-gold/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
              <Sparkles size={14} className="text-gold" /> Premium Wedding Invitations
            </span>
            <AnimatedHeading as="h1" className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
              Your Love Story Deserves a Website
            </AnimatedHeading>
            <p className="font-cormorant italic text-2xl md:text-3xl gradient-text-rose mb-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              ~ crafted with love, animated with magic ~
            </p>
            <p className="text-foreground/70 text-base md:text-lg max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              We design stunning animated wedding invitation websites that wow your guests — with RSVP, galleries, music, venue maps & more. 100% personalised for your big day.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-festive text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-pink hover:-translate-y-1 hover:shadow-elegant transition-all">
                <Heart size={18} className="fill-current" /> Get Your Invite
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 bg-cream border-2 border-gold text-primary px-8 py-4 rounded-full font-semibold hover:bg-gold hover:text-primary-foreground transition-all">
                View Past Works <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "1s" }}>
              <div className="flex -space-x-3">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-cream bg-gradient-festive grid place-items-center text-cream text-xs font-bold">
                    {["A","P","R","S"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-gold text-sm">★★★★★</div>
                <p className="text-xs text-foreground/60">Loved by happy couples worldwide</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant border-4 border-gold/40">
              <img src={heroImg} alt="Beautiful wedding couple in traditional attire" width={1600} height={1024} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute top-6 right-6 bg-cream/95 backdrop-blur px-4 py-2 rounded-full shadow-soft flex items-center gap-2 float-anim">
                <span className="w-2 h-2 rounded-full bg-teal pulse-ring" />
                <span className="text-xs font-semibold text-primary">Live Demo Available</span>
              </div>
              {/* Bottom info card */}
              <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur rounded-2xl p-4 shadow-soft">
                <p className="font-script text-xl gradient-text-rose">Aarav & Priya</p>
                <p className="text-xs text-foreground/60">A magical wedding website ✨</p>
              </div>
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-gold rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-4 border-b-4 border-pink rounded-br-3xl" />
          </div>
        </div>
      </section>

      <Marquee />

      {/* WHY US */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="divider-ornament font-script text-2xl gradient-text-rose mb-3">why couples love us</p>
            <AnimatedHeading className="text-4xl md:text-6xl font-display">Every Detail, Designed With Love</AnimatedHeading>
          </div>

          <div className="grid md:grid-cols-3 gap-6 reveal-stagger reveal">
            {[
              { icon: Sparkles, color: "pink", title: "Stunning Animations", desc: "Curtain reveals, scroll effects, parallax — every page tells your story beautifully." },
              { icon: Music, color: "gold", title: "Background Music", desc: "Add your favourite romantic song that plays as guests browse your invite." },
              { icon: Camera, color: "teal", title: "Photo Gallery", desc: "Showcase your pre-wedding shoot with stunning lightbox galleries." },
              { icon: Users, color: "plum", title: "RSVP Forms", desc: "Collect guest confirmations digitally — no more chasing replies on WhatsApp." },
              { icon: MapPin, color: "pink", title: "Venue Maps", desc: "Interactive Google Maps so guests find every event with ease." },
              { icon: Calendar, color: "gold", title: "Event Schedule", desc: "Mehendi, Sangeet, Haldi, Wedding — animated timeline of every function." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group bg-card border-2 border-transparent hover:border-gold/50 rounded-3xl p-7 hover-lift relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-2xl bg-${f.color}/15 grid place-items-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${f.color}`} />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{f.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{f.desc}</p>
                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity sparkle-anim" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCROLL ZOOM IMAGE BAND */}
      <section className="relative py-32 overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={mandapImg} alt="Decorated wedding mandap with floral arch" loading="lazy" width={1280} height={896} className="scroll-zoom-img w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80" />
        </div>
        <div className="container relative z-10 text-center text-cream max-w-3xl mx-auto">
          <p className="font-script text-3xl md:text-5xl text-gold mb-4 reveal">a celebration of love</p>
          <AnimatedHeading className="text-4xl md:text-6xl font-display !text-cream mb-6">
            Where Tradition Meets Technology
          </AnimatedHeading>
          <p className="text-cream/80 text-lg leading-relaxed reveal">
            From traditional Indian weddings to modern celebrations, we blend timeless beauty with cutting-edge web magic. Every site is a digital heirloom of your love story.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-gradient-cream">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="divider-ornament font-script text-2xl gradient-text-rose mb-3">how it works</p>
            <AnimatedHeading className="text-4xl md:text-5xl font-display">From Idea to Invite in 5 Days</AnimatedHeading>
          </div>

          <div className="grid md:grid-cols-4 gap-6 reveal-stagger reveal">
            {[
              { n: "01", t: "Share Your Story", d: "Tell us about your love, dates, events & vibe." },
              { n: "02", t: "We Design", d: "Custom theme, colours, fonts crafted for you." },
              { n: "03", t: "You Approve", d: "Review the demo, request any changes." },
              { n: "04", t: "Go Live", d: "Share your beautiful invite link with everyone!" },
            ].map((s) => (
              <div key={s.n} className="relative bg-card rounded-3xl p-7 border border-gold/20 hover-lift">
                <div className="absolute -top-5 left-7 w-12 h-12 rounded-full bg-gradient-festive grid place-items-center text-cream font-display font-bold text-lg shadow-pink">
                  {s.n}
                </div>
                <h4 className="font-display text-xl mt-4 mb-2">{s.t}</h4>
                <p className="text-sm text-foreground/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="divider-ornament font-script text-2xl gradient-text-rose mb-3">happy couples</p>
            <AnimatedHeading className="text-4xl md:text-5xl font-display">Words From Newlyweds</AnimatedHeading>
          </div>

          <div className="grid md:grid-cols-3 gap-6 reveal-stagger reveal">
            {[
              { name: "Aarav & Priya", text: "Our guests were stunned! The animations, the music, the gallery — everything was magical. Best decision ever.", img: "AP" },
              { name: "Rohan & Sneha", text: "TECH UR WED made our wedding invite the talk of the town. The team understood our vision perfectly.", img: "RS" },
              { name: "Karan & Meera", text: "Affordable, fast, and so so beautiful. The curtain opening animation gave me chills 💕", img: "KM" },
            ].map((t, i) => (
              <div key={i} className="bg-gradient-cream border border-gold/30 rounded-3xl p-7 hover-lift relative">
                <div className="text-gold text-xl mb-3">★★★★★</div>
                <p className="font-cormorant italic text-lg text-foreground/80 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-festive grid place-items-center text-cream font-bold">{t.img}</div>
                  <div>
                    <p className="font-display font-semibold">{t.name}</p>
                    <p className="text-xs text-foreground/50">Happy Couple</p>
                  </div>
                </div>
                <Heart className="absolute top-4 right-4 w-5 h-5 text-pink fill-pink/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-festive relative overflow-hidden">
        <Confetti count={30} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-plum/80 to-primary" />
        <div className="container relative z-10 text-center text-cream max-w-3xl mx-auto">
          <p className="font-script text-4xl text-gold mb-3 reveal">ready to get started?</p>
          <AnimatedHeading className="text-4xl md:text-6xl font-display !text-cream mb-6">
            Let's Make Your Wedding Unforgettable
          </AnimatedHeading>
          <p className="text-cream/80 text-lg mb-8 reveal">
            Free consultation · Custom design · Delivered in days
          </p>
          <div className="flex flex-wrap gap-4 justify-center reveal">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gold text-primary px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-gold transition-all">
              <Mail size={18} /> Get In Touch
            </Link>
            <a href="https://wa.me/916356231667" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-semibold hover:bg-cream/20 transition-all">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
