import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./components/site/Layout";
import { LogOut, Plus, Trash2, Edit, Heart, Image as ImageIcon, ExternalLink, X, Upload } from "lucide-react";

const CLOUD_NAME = 'dx3xvheum';
const UPLOAD_PRESET = 'wedding_uploads';

interface WeddingSite {
  id: string;
  couple_names: string;
  wedding_date: string | null;
  description: string | null;
  cover_image_url: string;
  site_url: string | null;
  tags: string[] | null;
  display_order: number;
}

const empty = {
  couple_names: "",
  wedding_date: "",
  description: "",
  cover_image_url: "",
  site_url: "",
  tags: "",
  display_order: 0,
};

const AdminDashboard = () => {
  const [sites, setSites] = useState<WeddingSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<WeddingSite | null>(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login", { replace: true });
    }
    load();
  }, [navigate]);

  const load = () => {
    setLoading(true);
    const saved = localStorage.getItem("wedding_projects");
    if (saved) {
      setSites(JSON.parse(saved));
    } else {
      // Demo data
      const demoSites = [
        {
          id: "1",
          couple_names: "Aarav & Priya",
          wedding_date: "December 15, 2025",
          description: "A beautiful royal theme wedding with traditional floral decorations.",
          cover_image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
          site_url: "https://aarav-priya.example.com",
          tags: ["Royal", "Floral"],
          display_order: 1
        },
        {
          id: "2",
          couple_names: "Rohan & Sneha",
          wedding_date: "February 10, 2026",
          description: "Modern minimalist wedding website with elegant design.",
          cover_image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
          site_url: "https://rohan-sneha.example.com",
          tags: ["Modern", "Minimal"],
          display_order: 2
        }
      ];
      setSites(demoSites);
      localStorage.setItem("wedding_projects", JSON.stringify(demoSites));
    }
    setLoading(false);
  };

  const saveToLocalStorage = (newSites: WeddingSite[]) => {
    setSites(newSites);
    localStorage.setItem("wedding_projects", JSON.stringify(newSites));
  };

  const openCloudinaryWidget = () => {
    const widget = (window as any).cloudinary?.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'camera', 'url'],
        cropping: true,
        croppingAspectRatio: 16 / 9,
        multiple: false,
        clientAllowedFormats: ['images'],
        maxFileSize: 5000000,
        showPoweredBy: false,
        styles: {
          palette: {
            window: "#FFFFFF",
            action: "#D42B5D",
            link: "#D42B5D",
            complete: "#4CAF50",
            error: "#F44336"
          }
        }
      },
      (error: any, result: any) => {
        if (error) {
          alert("Upload failed: " + error);
          return;
        }
        if (result && result.event === 'success') {
          const imageUrl = result.info.secure_url;
          setForm({ ...form, cover_image_url: imageUrl });
          alert("✅ Image uploaded to Cloudinary!");
        }
      }
    );
    widget.open();
  };

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (s: WeddingSite) => {
    setEditing(s);
    setForm({
      couple_names: s.couple_names,
      wedding_date: s.wedding_date || "",
      description: s.description || "",
      cover_image_url: s.cover_image_url,
      site_url: s.site_url || "",
      tags: (s.tags || []).join(", "),
      display_order: s.display_order,
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cover_image_url) {
      alert("Please upload a cover image!");
      return;
    }

    const newSite: WeddingSite = {
      id: editing ? editing.id : Date.now().toString(),
      couple_names: form.couple_names,
      wedding_date: form.wedding_date || null,
      description: form.description || null,
      cover_image_url: form.cover_image_url,
      site_url: form.site_url || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : null,
      display_order: Number(form.display_order) || 0,
    };

    let newSites: WeddingSite[];
    if (editing) {
      newSites = sites.map(s => s.id === editing.id ? newSite : s);
    } else {
      newSites = [...sites, newSite];
    }
    
    saveToLocalStorage(newSites);
    alert(editing ? "✅ Project updated!" : "✅ Wedding site added!");
    setShowForm(false);
    load();
  };

  const remove = (s: WeddingSite) => {
    if (!confirm(`Delete "${s.couple_names}"?`)) return;
    const newSites = sites.filter(site => site.id !== s.id);
    saveToLocalStorage(newSites);
    alert("🗑️ Project deleted!");
    load();
  };

  const logout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login", { replace: true });
  };

  return (
    <Layout hideChrome>
      <div className="min-h-screen bg-gradient-cream">
        {/* Top bar */}
        <header className="bg-white border-b-2 border-amber-300 sticky top-0 z-30">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <div>
                <div className="font-display font-bold text-base text-rose-800">Admin Dashboard</div>
                <div className="font-script text-[10px] text-rose-400 -mt-0.5">techwed</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={logout} className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-full text-sm font-semibold hover:bg-rose-700 transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-rose-800">Wedding Sites</h1>
              <p className="text-gray-500 text-sm mt-1">{sites.length} {sites.length === 1 ? "site" : "sites"} in your portfolio</p>
            </div>
            <button onClick={openCreate} className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-700 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
              <Plus size={16} /> Add Wedding Site
            </button>
          </div>

          {loading ? (
            <p className="text-center py-12 text-gray-500">Loading...</p>
          ) : sites.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-amber-500 opacity-50" />
              <p className="font-display text-2xl text-rose-800 mb-2">No sites yet</p>
              <p className="text-gray-500 text-sm mb-6">Click "Add Wedding Site" to upload your first project.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sites.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img src={s.cover_image_url} alt={s.couple_names} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-script text-2xl text-rose-600 leading-none">{s.couple_names}</p>
                    {s.wedding_date && <p className="text-xs text-gray-500 mt-1">📅 {s.wedding_date}</p>}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openEdit(s)} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-full text-xs font-semibold hover:bg-amber-100">
                        <Edit size={12} /> Edit
                      </button>
                      <button onClick={() => remove(s)} className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-600 rounded-full text-xs font-semibold hover:bg-red-600 hover:text-white">
                        <Trash2 size={12} />
                      </button>
                      {s.site_url && (
                        <a href={s.site_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 rounded-full text-xs hover:bg-amber-100">
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Create/Edit modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={save} className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 border-2 border-amber-300 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-rose-800">{editing ? "Edit" : "Add"} Wedding Site</h2>
                <button type="button" onClick={() => setShowForm(false)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Couple Names *</label>
                  <input required value={form.couple_names} onChange={(e) => setForm({ ...form, couple_names: e.target.value })}
                    placeholder="Aarav & Priya"
                    className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Wedding Date</label>
                    <input value={form.wedding_date} onChange={(e) => setForm({ ...form, wedding_date: e.target.value })}
                      placeholder="Dec 15, 2025"
                      className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Display Order</label>
                    <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                      className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Site URL</label>
                  <input type="url" value={form.site_url} onChange={(e) => setForm({ ...form, site_url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Traditional, Royal, Floral"
                    className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A short description of this wedding site..."
                    className="w-full mt-1.5 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Cover Image *</label>
                  {form.cover_image_url && (
                    <img src={form.cover_image_url} alt="cover preview" className="mt-2 w-full max-h-48 object-cover rounded-xl border border-gray-200" />
                  )}
                  <button
                    type="button"
                    onClick={openCloudinaryWidget}
                    className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors"
                  >
                    <Upload size={16} className="text-amber-500" />
                    <span className="text-sm font-semibold text-rose-700">{uploading ? "Uploading..." : (form.cover_image_url ? "Change image" : "Upload to Cloudinary")}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-7">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-full bg-gray-100 font-semibold hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
                  {editing ? "Save Changes" : "Add Site"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
