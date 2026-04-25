import { useEffect, useState } from "react";
import { Layout } from "./components/site/Layout";
import { AnimatedHeading } from "./components/site/AnimatedHeading";
import { supabase } from "./integrations/supabase/client";
import { Heart, ExternalLink, Sparkles, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface WeddingSite {
  id: string;
  couple_names: string;
  wedding_date: string | null;
  description: string | null;
  cover_image_url: string;
  site_url: string | null;
  tags: string[] | null;
}

const Gallery = () => {
  const [sites, setSites] = useState<WeddingSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("wedding_sites")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (!error && data) setSites(data as WeddingSite[]);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-cream overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-pink/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-gold/20 text-primary border border-gold/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
            <Camera size={14} /> Our Wedding Portfolio
          </span>
          <AnimatedHeading as="h1" className="text-5xl md:text-7xl font-display mb-5">
            Past Wedding Websites
          </AnimatedHeading>
          <p className="font-cormorant italic text-xl gradient-text-rose">~ love stories we've helped tell ~</p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 bg-cream">
        <div className="container">
          {loading ? (
            <div className="text-center py-20">
              <Sparkles className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
              <p className="font-cormorant text-xl text-foreground/60">Loading our love stories...</p>
            </div>
          ) : sites.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-festive grid place-items-center mx-auto mb-6 shadow-pink">
                <Heart className="w-12 h-12 text-cream fill-cream" />
              </div>
              <h2 className="font-display text-4xl mb-4 gradient-text-rose">Your Story Could Be Here</h2>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                Our portfolio is being curated with the most beautiful wedding websites we've crafted. Be one of the first couples featured here — let's create something magical together.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-festive text-cream px-8 py-4 rounded-full font-semibold shadow-pink hover:-translate-y-0.5 transition-all">
                <Heart size={18} /> Start Your Project
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger reveal">
              {sites.map((s) => (
                <article key={s.id} className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-gold/50 hover-lift">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={s.cover_image_url}
                      alt={`${s.couple_names} wedding website cover`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/90 backdrop-blur grid place-items-center">
                      <Heart className="w-4 h-4 text-pink fill-pink" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-5 text-cream">
                      <p className="font-script text-3xl text-gold leading-none mb-1">{s.couple_names}</p>
                      {s.wedding_date && (
                        <p className="text-cream/80 text-xs flex items-center gap-1.5 mb-2">
                          <Calendar size={12} /> {s.wedding_date}
                        </p>
                      )}
                      {s.tags && s.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {s.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] bg-cream/20 backdrop-blur px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    {s.description && <p className="text-sm text-foreground/70 line-clamp-2 mb-3">{s.description}</p>}
                    {s.site_url && (
                      <a
                        href={s.site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:text-primary transition-colors"
                      >
                        Visit Website <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
