import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "./components/site/Layout";
import { supabase } from "./integrations/supabase/client";
import { useToast } from "./hooks/use-toast";
import { LogOut, Plus, Trash2, Edit, Lock, Heart, Image as ImageIcon, ExternalLink, X, KeyRound } from "lucide-react";

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
  const [showPwd, setShowPwd] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin", { replace: true });
        return;
      }
      load();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wedding_sites")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (!error && data) setSites(data as WeddingSite[]);
    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
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

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("wedding-covers").upload(path, file);
    if (upErr) {
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("wedding-covers").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image_url: data.publicUrl }));
    setUploading(false);
    toast({ title: "Image uploaded ✨" });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cover_image_url) {
      toast({ title: "Cover image required", variant: "destructive" });
      return;
    }
    const payload = {
      couple_names: form.couple_names,
      wedding_date: form.wedding_date || null,
      description: form.description || null,
      cover_image_url: form.cover_image_url,
      site_url: form.site_url || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : null,
      display_order: Number(form.display_order) || 0,
    };
    let error;
    if (editing) {
      ({ error } = await supabase.from("wedding_sites").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("wedding_sites").insert(payload));
    }
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Updated 💕" : "Wedding site added 💕" });
    setShowForm(false);
    load();
  };

  const remove = async (s: WeddingSite) => {
    if (!confirm(`Delete "${s.couple_names}"?`)) return;
    const { error } = await supabase.from("wedding_sites").delete().eq("id", s.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    load();
  };

  const changePwd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPwd = String(fd.get("new") || "");
    const confirmPwd = String(fd.get("confirm") || "");
    if (newPwd.length < 6) {
      toast({ title: "Password too short", description: "Min 6 characters", variant: "destructive" });
      return;
    }
    if (newPwd !== confirmPwd) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password changed ✨", description: "Use your new password next time you log in." });
    setShowPwd(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout hideChrome>
      <div className="min-h-screen bg-gradient-cream">
        {/* Top bar */}
        <header className="bg-cream border-b-2 border-gold/30 sticky top-0 z-30 backdrop-blur">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink fill-pink" />
              <div>
                <div className="font-display font-bold text-base gradient-text-festive">Admin Dashboard</div>
                <div className="font-script text-[10px] text-pink -mt-0.5">techwed</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowPwd(true)} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-full text-primary hover:bg-gold/15 font-semibold">
                <KeyRound size={14} /> Password
              </button>
              <button onClick={logout} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-plum transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="container py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Wedding Sites</h1>
              <p className="text-foreground/60 text-sm mt-1">{sites.length} {sites.length === 1 ? "site" : "sites"} in your portfolio</p>
            </div>
            <button onClick={openCreate} className="inline-flex items-center gap-2 bg-gradient-festive text-cream px-5 py-3 rounded-full font-semibold shadow-pink hover:-translate-y-0.5 transition-all">
              <Plus size={16} /> Add Wedding Site
            </button>
          </div>

          {loading ? (
            <p className="text-center py-12 text-foreground/60">Loading...</p>
          ) : sites.length === 0 ? (
            <div className="bg-card rounded-3xl p-12 text-center border border-border">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gold opacity-50" />
              <p className="font-display text-2xl mb-2">No sites yet</p>
              <p className="text-foreground/60 text-sm mb-6">Click "Add Wedding Site" to upload your first project.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sites.map((s) => (
                <div key={s.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-soft transition-shadow">
                  <div className="aspect-video bg-secondary overflow-hidden">
                    <img src={s.cover_image_url} alt={s.couple_names} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-script text-2xl gradient-text-rose leading-none">{s.couple_names}</p>
                    {s.wedding_date && <p className="text-xs text-foreground/60 mt-1">{s.wedding_date}</p>}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openEdit(s)} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-secondary rounded-full text-xs font-semibold hover:bg-gold/30">
                        <Edit size={12} /> Edit
                      </button>
                      <button onClick={() => remove(s)} className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-destructive/10 text-destructive rounded-full text-xs font-semibold hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 size={12} />
                      </button>
                      {s.site_url && (
                        <a href={s.site_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 bg-secondary rounded-full text-xs hover:bg-gold/30">
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
          <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <form onSubmit={save} className="bg-card rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 border-2 border-gold/30 shadow-elegant animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl">{editing ? "Edit" : "Add"} Wedding Site</h2>
                <button type="button" onClick={() => setShowForm(false)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-secondary"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Couple Names *</label>
                  <input required value={form.couple_names} onChange={(e) => setForm({ ...form, couple_names: e.target.value })}
                    placeholder="Aarav & Priya"
                    className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Wedding Date</label>
                    <input value={form.wedding_date} onChange={(e) => setForm({ ...form, wedding_date: e.target.value })}
                      placeholder="Dec 15, 2024"
                      className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Display Order</label>
                    <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                      className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Site URL</label>
                  <input type="url" value={form.site_url} onChange={(e) => setForm({ ...form, site_url: e.target.value })}
                    placeholder="https://aarav-priya.techurwed.com"
                    className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Traditional, Maroon, Royal"
                    className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A short description of this wedding site..."
                    className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Cover Image *</label>
                  {form.cover_image_url && (
                    <img src={form.cover_image_url} alt="cover preview" className="mt-2 w-full max-h-48 object-cover rounded-xl border border-border" />
                  )}
                  <label className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gold/50 rounded-xl cursor-pointer hover:bg-gold/10 transition-colors">
                    <ImageIcon size={16} className="text-gold" />
                    <span className="text-sm font-semibold text-primary">{uploading ? "Uploading..." : (form.cover_image_url ? "Change image" : "Upload cover image")}</span>
                    <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-7">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-full bg-secondary font-semibold hover:bg-muted">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-gradient-festive text-cream font-semibold shadow-pink hover:-translate-y-0.5 transition-all">
                  {editing ? "Save Changes" : "Add Site"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Change password modal */}
        {showPwd && (
          <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <form onSubmit={changePwd} className="bg-card rounded-3xl max-w-md w-full p-7 border-2 border-gold/30 shadow-elegant animate-scale-in">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-display text-2xl flex items-center gap-2"><Lock size={20} /> Change Password</h2>
                <button type="button" onClick={() => setShowPwd(false)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-secondary"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">New Password</label>
                  <input type="password" name="new" required minLength={6} className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Confirm New Password</label>
                  <input type="password" name="confirm" required minLength={6} className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none" />
                </div>
              </div>
              <button type="submit" className="mt-6 w-full py-3 rounded-full bg-gradient-festive text-cream font-semibold shadow-pink">Update Password</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
