import { Link } from "react-router-dom";
import Layout from "./components/site/Layout";
import AnimatedHeading from "./components/site/AnimatedHeading";
import Marquee from "./components/site/Marquee";
import { Confetti } from "./components/site/Confetti";
import { Heart, Sparkles, MessageCircle, ArrowRight, Music, Camera, MapPin, Calendar, Users, Mail } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800";
const mandapImg = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800";
const mandala = "https://www.transparenttextures.com/patterns/mandala.png";

const Index = () => {
  return (
    <Layout>
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-cream">
        <Confetti active={true} count={20} />
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
          <div>
            <span className="inline-flex items-center gap-2 bg-gold/20 text-primary border border-gold/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles size={14} className="text-gold" /> Premium Wedding Invitations
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-rose-800">
              Your Love Story Deserves a Website
            </h1>
            <p className="font-cormorant italic text-2xl md:text-3xl text-rose-500 mb-3">
              ~ crafted with love, animated with magic ~
            </p>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mb-8">
              We design stunning animated wedding invitation websites that wow your guests — with RSVP, galleries, music, venue maps & more. 100% personalised for your big day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-1 transition-all">
                <Heart size={18} className="fill-current" /> Get Your Invite
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 bg-white border-2 border-amber-400 text-rose-800 px-8 py-4 rounded-full font-semibold hover:bg-amber-400 hover:text-white transition-all">
                View Past Works <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-amber-400">
              <img src={heroImg} alt="Wedding couple" className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                <p className="font-script text-xl text-rose-500">Aarav & Priya</p>
                <p className="text-xs text-gray-500">A magical wedding website ✨</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-display text-rose-800">Every Detail, Designed With Love</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-pink/15 grid place-items-center mb-5">
                <Sparkles className="w-7 h-7 text-pink" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">Stunning Animations</h3>
              <p className="text-gray-600 text-sm">Curtain reveals, scroll effects, parallax — every page tells your story beautifully.</p>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gold/15 grid place-items-center mb-5">
                <Music className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">Background Music</h3>
              <p className="text-gray-600 text-sm">Add your favourite romantic song that plays as guests browse your invite.</p>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-teal/15 grid place-items-center mb-5">
                <Camera className="w-7 h-7 text-teal" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">Photo Gallery</h3>
              <p className="text-gray-600 text-sm">Showcase your pre-wedding shoot with stunning lightbox galleries.</p>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-plum/15 grid place-items-center mb-5">
                <Users className="w-7 h-7 text-plum" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">RSVP Forms</h3>
              <p className="text-gray-600 text-sm">Collect guest confirmations digitally — no more chasing replies.</p>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-pink/15 grid place-items-center mb-5">
                <MapPin className="w-7 h-7 text-pink" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">Venue Maps</h3>
              <p className="text-gray-600 text-sm">Interactive Google Maps so guests find every event with ease.</p>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gold/15 grid place-items-center mb-5">
                <Calendar className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-rose-800">Event Schedule</h3>
              <p className="text-gray-600 text-sm">Mehendi, Sangeet, Haldi, Wedding — animated timeline.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-800 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="font-script text-3xl mb-4">ready to get started?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Make Your Wedding Unforgettable</h2>
          <p className="text-rose-200 mb-8">Free consultation · Custom design · Delivered in days</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-rose-900 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-all">
              <Mail size={18} /> Get In Touch
            </Link>
            <a href="https://wa.me/916356231667" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;