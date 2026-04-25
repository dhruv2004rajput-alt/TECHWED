import { Heart } from "lucide-react";

const Gallery = () => {
  // Sample wedding projects (you can edit these later)
  const projects = [
    {
      id: 1,
      couple: "Aarav & Priya",
      date: "December 15, 2025",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      tags: ["Royal", "Floral", "Traditional"]
    },
    {
      id: 2,
      couple: "Rohan & Sneha",
      date: "February 10, 2026",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      tags: ["Modern", "Minimal", "Elegant"]
    },
    {
      id: 3,
      couple: "Karan & Meera",
      date: "January 5, 2026",
      image: "https://images.unsplash.com/photo-1537633552983-8f15e35a14b3?w=800",
      tags: ["Destination", "Beach", "Bohemian"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-rose-800 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
            📸 Our Wedding Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-rose-800 mb-5">
            Past Wedding Websites
          </h1>
          <p className="font-serif italic text-xl text-rose-600">~ love stories we've helped tell ~</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article key={project.id} className="group bg-white rounded-3xl overflow-hidden border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.couple} wedding website`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/20 to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur grid place-items-center">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="font-serif text-3xl text-amber-300 leading-none mb-1">{project.couple}</p>
                    <p className="text-white/80 text-xs flex items-center gap-1.5 mb-2">
                      📅 {project.date}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-white/20 backdrop-blur px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State / Call to Action */}
          <div className="max-w-2xl mx-auto text-center py-20 mt-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 grid place-items-center mx-auto mb-6 shadow-lg">
              <Heart className="w-12 h-12 text-white fill-white" />
            </div>
            <h2 className="font-serif text-4xl mb-4 text-rose-700">Your Story Could Be Here</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Our portfolio is being curated with the most beautiful wedding websites we've crafted. 
              Be one of the first couples featured here — let's create something magical together.
            </p>
            <a href="#" data-page="contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
              <Heart size={18} /> Start Your Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
