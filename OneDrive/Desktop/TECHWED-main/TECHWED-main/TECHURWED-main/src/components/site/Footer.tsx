import { Link } from "react-router-dom";
import { Heart, Mail, MessageCircle, MapPin, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-curtain text-cream pt-16 pb-6 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold via-pink to-gold" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink/20 rounded-full blur-3xl float-slow" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl float-anim" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-7 h-7 text-pink fill-pink" />
              <div>
                <div className="font-display font-extrabold text-2xl text-cream">TECH UR WED</div>
                <div className="font-script text-pink text-sm -mt-1">your love, our craft</div>
              </div>
            </div>
            <p className="text-cream/70 text-sm max-w-md leading-relaxed">
              We craft stunning, animated wedding invitation websites that make your special day unforgettable. Every site is unique, romantic, and built with love.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-full border border-gold/40 hover:bg-gold hover:text-primary transition-all">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 grid place-items-center rounded-full border border-gold/40 hover:bg-gold hover:text-primary transition-all">
                <Facebook size={16} />
              </a>
              <a href="https://wa.me/916356231667" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 grid place-items-center rounded-full border border-gold/40 hover:bg-gold hover:text-primary transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-cream text-lg mb-4 font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-cream/60 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-cream/60 hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-cream/60 hover:text-gold transition-colors">Past Works</Link></li>
              <li><Link to="/about" className="text-cream/60 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-cream/60 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-cream text-lg mb-4 font-semibold">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-cream/70">
                <Mail size={15} className="text-gold mt-0.5 shrink-0" />
                <a href="mailto:techwed2026@gmail.com" className="hover:text-gold transition-colors break-all">techwed2026@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 text-cream/70">
                <MessageCircle size={15} className="text-gold mt-0.5 shrink-0" />
                <a href="https://wa.me/916356231667" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">+91 63562 31667</a>
              </li>
              <li className="flex items-start gap-2 text-cream/70">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span>India · Worldwide service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-cream/50 text-xs">© {new Date().getFullYear()} TECH UR WED. Made with <Heart className="inline w-3 h-3 fill-pink text-pink" /> for couples in love.</p>
          <Link to="/admin" className="text-cream/40 text-xs hover:text-gold transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
};
