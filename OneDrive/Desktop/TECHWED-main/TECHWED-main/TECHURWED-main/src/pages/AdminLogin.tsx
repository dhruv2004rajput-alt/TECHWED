import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "./components/site/Layout";
import { supabase } from "./integrations/supabase/client";
import { useToast } from "./hooks/use-toast";
import { Lock, User, Heart, ArrowRight } from "lucide-react";

const ADMIN_EMAIL = "techwed@admin.local";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/dashboard", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (username.trim().toLowerCase() !== "techwed") {
      toast({ title: "Invalid credentials", description: "Username or password incorrect", variant: "destructive" });
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    setLoading(false);
    if (error) {
      toast({ title: "Invalid credentials", description: "Username or password incorrect", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back, admin! 💕" });
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <Layout hideChrome>
      <section className="min-h-screen flex items-center justify-center bg-gradient-festive relative overflow-hidden p-4">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl float-slow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink/20 rounded-full blur-3xl float-anim" />

        <div className="relative bg-cream rounded-3xl shadow-elegant max-w-md w-full p-8 md:p-10 border-2 border-gold/40 animate-scale-in">
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-7 h-7 text-pink fill-pink heart-beat" />
            <div className="text-center">
              <div className="font-display font-extrabold text-xl gradient-text-festive">TECH UR WED</div>
              <div className="font-script text-xs text-pink -mt-1">admin portal</div>
            </div>
          </Link>

          <div className="text-center mb-7">
            <h1 className="font-display text-3xl mb-1">Welcome Back</h1>
            <p className="text-foreground/60 text-sm">Sign in to manage wedding sites</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-1">
                <User size={12} /> Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors"
                placeholder="techwed"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-1">
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full mt-1.5 px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-pink focus:outline-none transition-colors"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-festive text-cream py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-pink hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {loading ? "Signing in..." : (<>Sign In <ArrowRight size={16} /></>)}
            </button>
          </form>

          <Link to="/" className="block text-center text-xs text-foreground/50 hover:text-pink mt-6 transition-colors">
            ← Back to website
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
