import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";

const CLOUD_NAME = 'dx3xvheum';
const UPLOAD_PRESET = 'wedding_uploads';

interface Project {
  id: string;
  couple: string;
  date: string;
  imageUrl: string;
  tags: string[];
  description: string;
}

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    couple: "",
    date: "",
    imageUrl: "",
    tags: "",
    description: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
    loadProjects();
  }, [navigate]);

  const loadProjects = () => {
    const saved = localStorage.getItem("wedding_projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  };

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("wedding_projects", JSON.stringify(newProjects));
  };

  const openCloudinaryWidget = () => {
    const widget = (window as any).cloudinary?.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'camera', 'url'],
        cropping: true,
        croppingAspectRatio: 4 / 3,
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
          setFormData(prev => ({ ...prev, imageUrl }));
          alert("✅ Image uploaded to Cloudinary!");
        }
      }
    );
    widget.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      alert("Please upload an image to Cloudinary first!");
      return;
    }
    
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);
    
    if (editingId) {
      const updated = projects.map(p => 
        p.id === editingId 
          ? { 
              id: p.id,
              couple: formData.couple, 
              date: formData.date, 
              imageUrl: formData.imageUrl, 
              tags: tagsArray, 
              description: formData.description 
            }
          : p
      );
      saveProjects(updated);
      alert("✅ Project updated!");
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        couple: formData.couple,
        date: formData.date,
        imageUrl: formData.imageUrl,
        tags: tagsArray,
        description: formData.description
      };
      saveProjects([...projects, newProject]);
      alert("✅ Project added!");
    }
    
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      couple: project.couple,
      date: project.date,
      imageUrl: project.imageUrl,
      tags: project.tags.join(", "),
      description: project.description
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      const filtered = projects.filter(p => p.id !== id);
      saveProjects(filtered);
      alert("🗑️ Project deleted!");
    }
  };

  const resetForm = () => {
    setFormData({ couple: "", date: "", imageUrl: "", tags: "", description: "" });
    setEditingId(null);
    setShowForm(false);
    setUploading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <div className="bg-rose-800 text-white px-6 py-4 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif">Admin Dashboard</h1>
          <p className="text-rose-200 text-sm">Manage Wedding Portfolio</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={18} /> Add Project
          </button>
          <button
            onClick={handleLogout}
            className="bg-rose-700 hover:bg-rose-900 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-serif text-rose-800">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={resetForm} className="hover:bg-gray-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Couple Name *</label>
                <input
                  type="text"
                  required
                  value={formData.couple}
                  onChange={e => setFormData({...formData, couple: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                  placeholder="Aarav & Priya"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Wedding Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="December 15, 2025"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Project Image *</label>
                <button
                  type="button"
                  onClick={openCloudinaryWidget}
                  className="bg-gradient-to-r from-rose-500 to-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition"
                >
                  <Upload size={18} /> Upload to Cloudinary
                </button>
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    <p className="text-xs text-gray-500 mt-1 break-all">{formData.imageUrl.substring(0, 60)}...</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Royal, Floral, Traditional"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Describe this wedding project..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                >
                  {editingId ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="p-6">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-2xl font-serif text-rose-800 mb-2">No Projects Yet</h2>
            <p className="text-gray-500">Click "Add Project" to upload your first wedding website</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-rose-100">
                <img src={project.imageUrl} alt={project.couple} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-serif text-rose-800">{project.couple}</h3>
                  {project.date && <p className="text-sm text-gray-500">📅 {project.date}</p>}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">#{tag}</span>
                      ))}
                    </div>
                  )}
                  {project.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>}
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(project)} className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-1">
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-1">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;