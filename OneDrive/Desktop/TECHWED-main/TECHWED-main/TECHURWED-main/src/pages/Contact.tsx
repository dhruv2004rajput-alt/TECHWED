import { useState } from "react";
import { Layout } from "./components/site/Layout";
import { AnimatedHeading } from "./components/site/AnimatedHeading";
import { Confetti } from "./components/site/Confetti";
import { useToast } from "./hooks/use-toast";
import { Mail, MessageCircle, MapPin, Heart, Send, Sparkles } from "lucide-react";
import { supabase } from "../integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const email = fd.get("email");
    const phone = fd.get("Number");
    const weddingDate = fd.get("date");
    const packageInterest = fd.get("pkg");
    const message = fd.get("message");

    // Save to Supabase
    const { error } = await supabase.from('enquiries').insert([
      {
        name: name,
        email: email,
        phone: phone,
        wedding_date: weddingDate || null,
        package: packageInterest,
        message: message,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    } else {
      // Open WhatsApp prefilled after successful save
      const text = `Hi TECH UR WED!%0A%0AName: ${name}%0AEmail: ${email}%0AWedding Date: ${weddingDate || "TBD"}%0APackage: ${packageInterest || "Not sure"}%0A%0AMessage: ${message}`;
      window.open(`https://wa.me/916356231667?text=${text}`, "_blank");
      (e.target as HTMLFormElement).reset();
      toast({ title: "Message Sent!", description: "We'll reply within minutes! 💕" });
    }
    
    setSubmitting(false);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-20 bg-gradient-cream overflow-hidden">
        <Confetti count={18} />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-teal/15 text-teal border border-teal/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
            <Heart size={14} className="fill-current" /> Let's Talk
          </span>
          <AnimatedHeading as="h1" className="text-5xl md:text-7xl font-display mb-4">
            Say Hello to Forever
          </AnimatedHeading>
          <p className="font-cormorant italic text-xl gradient-text-rose">~ we'd love to hear your love story ~</p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16 bg-cream">
        <div className="container grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4 reveal">
            <div className="bg-gradient-festive rounded-3xl p-7 text-cream relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-gold sparkle-anim" />
              <h3 className="font-display text-2xl mb-2">Quick Contact</h3>
              <p className="text-cream/80 text-sm">Choose your preferred way — we usually reply in under an hour!</p>
            </div>

            <a href="mailto:techwed2026@gmail.com" className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-pink hover:shadow-pink hover:-translate-y-0.5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink/15 grid place-items-center group-hover:bg-pink group-hover:text-cream transition-colors">
                <Mail className="w-5 h-5 text-pink group-hover:text-cream" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Email</p>
                <p className="font-semibold text-primary truncate">techwed2026@gmail.com</p>
              </div>
            </a>

            <a href="https://wa.me/916356231667" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-teal hover:shadow-soft hover:-translate-y-0.5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal/15 grid place-items-center">
                <MessageCircle className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/50 font-bold">WhatsApp</p>
                <p className="font-semibold text-primary">+91 63562 31667</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-gold/15 grid place-items-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Service Area</p>
                <p className="font-semibold text-primary">India · Worldwide</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card rounded-3xl p-7 md:p-10 border border-gold/30 shadow-soft reveal-right reveal">
            <h3 className="font-display text-3xl mb-2">Tell Us About Your Wedding</h3>
            <p className="text-foreground/60 text-sm mb-6">All fields except message are optional — share what you're comfortable with.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Your Name *</label>
                <input name="name" required className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors" placeholder="Aarav & Priya" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Email *</label>
                <input type="email" name="email" required className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors" placeholder="you@love.com" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Phone Number</label>
                <input name="Number" className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors" placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Wedding Date</label>
                <input name="date" className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors" placeholder="Dec 15, 2026" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Package Interest</label>
                <select name="pkg" className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors">
                  <option>Not sure yet</option>
                  <option>Classic – ₹2,999</option>
                  <option>Royal – ₹5,999</option>
                  <option>Luxe – ₹9,999</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Tell us about your dream invite *</label>
              <textarea name="message" required rows={5} className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors resize-none" placeholder="Theme ideas, must-have features, anything special..." />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-gradient-festive text-cream py-4 rounded-full font-semibold flex items-center justify-center gap-2 shadow-pink hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              <Send size={18} /> {submitting ? "Sending..." : "Send Message"}
            </button>
            <p className="text-xs text-foreground/50 text-center mt-3">
              Or email us directly at <a href="mailto:techwed2026@gmail.com" className="text-pink underline">techwed2026@gmail.com</a>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
