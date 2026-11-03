"use client";
import { useState, useEffect, useCallback } from "react";

type Project = { id: string; title: string; client: string; client_type: string; description: string; link: string; tags: string; tech: string; };
type Contact = { id: string; name: string; email: string; phone?: string; interest: string; message: string; created_at: string; };

const ADMIN_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #050508; color: #f0f0f8; font-family: Inter, sans-serif; }
  :root {
    --bg: #050508; --surface: #111118; --surface-2: #1a1a24;
    --border: rgba(255,255,255,0.07); --accent: #6c63ff;
    --gradient: linear-gradient(135deg,#6c63ff,#a855f7,#ec4899);
    --text-muted: rgba(240,240,248,0.55); --radius: 14px;
  }
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
`;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"projects"|"contacts">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});
  const [editingId, setEditingId] = useState<string|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  }, []);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contacts");
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) {
      fetchProjects();
      fetchContacts();
    }
  }, [authed, fetchProjects, fetchContacts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setLoginError("Incorrect password. Access denied.");
      }
    } catch {
      setLoginError("Server error. Please try again.");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...projectForm, id: editingId } : projectForm;
    const res = await fetch("/api/admin/projects", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg(editingId ? "Project updated!" : "Project added!");
      setShowForm(false); setEditingId(null); setProjectForm({});
      fetchProjects();
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch("/api/admin/projects", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { setMsg("Deleted!"); fetchProjects(); setTimeout(() => setMsg(""), 2000); }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Delete this contact?")) return;
    const res = await fetch("/api/admin/contacts", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { setMsg("Deleted!"); fetchContacts(); setTimeout(() => setMsg(""), 2000); }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id); setProjectForm(p); setShowForm(true);
  };

  if (!authed) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#050508", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-30%", left:"-20%", width:"60%", height:"60%", background:"radial-gradient(ellipse,rgba(108,99,255,0.15) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:"50%", height:"50%", background:"radial-gradient(ellipse,rgba(168,85,247,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"3rem", width:"100%", maxWidth:420, position:"relative", zIndex:1, boxShadow:"0 0 60px rgba(108,99,255,0.15)" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#6c63ff,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", fontSize:"1.75rem" }}>🔐</div>
            <h1 style={{ fontFamily:"Outfit,sans-serif", fontSize:"1.6rem", fontWeight:800, marginBottom:"0.5rem" }}>Admin Access</h1>
            <p style={{ color:"rgba(240,240,248,0.55)", fontSize:"0.9rem" }}>AJ Studio Control Panel</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom:"1.25rem" }}>
              <label style={{ display:"block", fontSize:"0.8rem", fontWeight:600, color:"rgba(240,240,248,0.55)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.5rem" }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{ width:"100%", background:"#050508", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"0.85rem 1rem", color:"#f0f0f8", fontSize:"0.95rem", outline:"none", fontFamily:"Inter,sans-serif" }}
                onFocus={e => e.target.style.borderColor="#6c63ff"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.07)"}
                required autoFocus
              />
            </div>
            {loginError && <p style={{ color:"#f87171", fontSize:"0.85rem", marginBottom:"1rem", textAlign:"center" }}>{loginError}</p>}
            <button type="submit" disabled={loginLoading} style={{ width:"100%", padding:"0.9rem", background:"linear-gradient(135deg,#6c63ff,#a855f7,#ec4899)", border:"none", borderRadius:50, color:"#fff", fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.95rem", cursor:"pointer", boxShadow:"0 4px 24px rgba(108,99,255,0.4)" }}>
              {loginLoading ? "Verifying..." : "Access Panel"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#050508" }}>
      {/* Admin Navbar */}
      <div style={{ background:"#111118", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"1rem 0", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6c63ff,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>⚡</div>
            <span style={{ fontFamily:"Outfit,sans-serif", fontWeight:800, fontSize:"1.15rem" }}>AJ Studio<span style={{ background:"linear-gradient(135deg,#6c63ff,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>.</span> Admin</span>
          </div>
          <button onClick={handleLogout} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", padding:"0.5rem 1.25rem", borderRadius:50, cursor:"pointer", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.85rem" }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"2rem 1.5rem" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem", marginBottom:"2.5rem" }}>
          {[
            { icon:"🚀", label:"Total Projects", value: projects.length },
            { icon:"✉️", label:"Inquiries", value: contacts.length },
            { icon:"✅", label:"Satisfaction", value: "100%" },
          ].map(s => (
            <div key={s.label} style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <div style={{ width:48, height:48, borderRadius:12, background:"rgba(108,99,255,0.1)", border:"1px solid rgba(108,99,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem" }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily:"Outfit,sans-serif", fontSize:"1.6rem", fontWeight:800, background:"linear-gradient(135deg,#6c63ff,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.value}</div>
                <div style={{ fontSize:"0.8rem", color:"rgba(240,240,248,0.55)" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"2rem" }}>
          {(["projects","contacts"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:"0.6rem 1.5rem", borderRadius:50, border:"1px solid", cursor:"pointer",
              fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.85rem", textTransform:"capitalize",
              background: tab === t ? "linear-gradient(135deg,#6c63ff,#a855f7)" : "transparent",
              color: tab === t ? "#fff" : "rgba(240,240,248,0.55)",
              borderColor: tab === t ? "transparent" : "rgba(255,255,255,0.07)",
            }}>{t}</button>
          ))}
        </div>

        {msg && <div style={{ background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)", color:"#4ade80", padding:"0.75rem 1.25rem", borderRadius:10, marginBottom:"1.5rem", fontSize:"0.9rem" }}>{msg}</div>}

        {/* PROJECTS TAB */}
        {tab === "projects" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <h2 style={{ fontFamily:"Outfit,sans-serif", fontSize:"1.25rem", fontWeight:700 }}>Projects</h2>
              <button onClick={() => { setShowForm(true); setEditingId(null); setProjectForm({}); }} style={{ background:"linear-gradient(135deg,#6c63ff,#a855f7)", border:"none", borderRadius:50, padding:"0.6rem 1.5rem", color:"#fff", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}>+ Add Project</button>
            </div>

            {showForm && (
              <form onSubmit={handleSaveProject} style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"2rem", marginBottom:"2rem" }}>
                <h3 style={{ fontFamily:"Outfit,sans-serif", marginBottom:"1.5rem" }}>{editingId ? "Edit" : "Add"} Project</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  {[
                    { field:"title", label:"Title", placeholder:"Kaushik Sampath" },
                    { field:"client", label:"Client", placeholder:"India Codes" },
                    { field:"client_type", label:"Client Type", placeholder:"Freelancer & Blogger" },
                    { field:"link", label:"Live URL", placeholder:"https://..." },
                  ].map(f => (
                    <div key={f.field}>
                      <label style={{ display:"block", fontSize:"0.75rem", fontWeight:600, color:"rgba(240,240,248,0.55)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.4rem" }}>{f.label}</label>
                      <input type="text" value={(projectForm as any)[f.field] || ""} onChange={e => setProjectForm({...projectForm,[f.field]:e.target.value})} placeholder={f.placeholder}
                        style={{ width:"100%", background:"#050508", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"0.7rem 0.9rem", color:"#f0f0f8", fontSize:"0.9rem", outline:"none", fontFamily:"Inter,sans-serif" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:"1rem" }}>
                  <label style={{ display:"block", fontSize:"0.75rem", fontWeight:600, color:"rgba(240,240,248,0.55)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.4rem" }}>Tags (comma separated)</label>
                  <input type="text" value={projectForm.tags || ""} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} placeholder="Tag1, Tag2, Tag3"
                    style={{ width:"100%", background:"#050508", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"0.7rem 0.9rem", color:"#f0f0f8", fontSize:"0.9rem", outline:"none", fontFamily:"Inter,sans-serif" }} />
                </div>
                <div style={{ marginTop:"1rem" }}>
                  <label style={{ display:"block", fontSize:"0.75rem", fontWeight:600, color:"rgba(240,240,248,0.55)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.4rem" }}>Tech Stack (comma separated)</label>
                  <input type="text" value={projectForm.tech || ""} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} placeholder="Next.js, Tailwind, Supabase"
                    style={{ width:"100%", background:"#050508", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"0.7rem 0.9rem", color:"#f0f0f8", fontSize:"0.9rem", outline:"none", fontFamily:"Inter,sans-serif" }} />
                </div>
                <div style={{ marginTop:"1rem" }}>
                  <label style={{ display:"block", fontSize:"0.75rem", fontWeight:600, color:"rgba(240,240,248,0.55)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.4rem" }}>Description</label>
                  <textarea rows={3} value={projectForm.description || ""} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Project description..."
                    style={{ width:"100%", background:"#050508", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"0.7rem 0.9rem", color:"#f0f0f8", fontSize:"0.9rem", outline:"none", fontFamily:"Inter,sans-serif", resize:"vertical" }} />
                </div>
                <div style={{ display:"flex", gap:"1rem", marginTop:"1.5rem" }}>
                  <button type="submit" style={{ background:"linear-gradient(135deg,#6c63ff,#a855f7)", border:"none", borderRadius:50, padding:"0.7rem 2rem", color:"#fff", fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.9rem", cursor:"pointer" }}>
                    {editingId ? "Update Project" : "Add Project"}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setProjectForm({}); }} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.07)", borderRadius:50, padding:"0.7rem 2rem", color:"rgba(240,240,248,0.55)", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.9rem", cursor:"pointer" }}>Cancel</button>
                </div>
              </form>
            )}

            {loading ? <p style={{ color:"rgba(240,240,248,0.55)", textAlign:"center", padding:"3rem" }}>Loading...</p> : (
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {projects.length === 0 && <p style={{ color:"rgba(240,240,248,0.35)", textAlign:"center", padding:"3rem", background:"#111118", borderRadius:14, border:"1px solid rgba(255,255,255,0.07)" }}>No projects yet. Add your first project!</p>}
                {projects.map(p => (
                  <div key={p.id} style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem" }}>
                    <div style={{ flex:1 }}>
                      <h3 style={{ fontFamily:"Outfit,sans-serif", fontSize:"1rem", fontWeight:700, marginBottom:"0.3rem" }}>{p.title}</h3>
                      <p style={{ fontSize:"0.85rem", color:"rgba(240,240,248,0.55)", marginBottom:"0.5rem" }}>{p.client} &bull; {p.client_type}</p>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.8rem", color:"#6c63ff" }}>{p.link} ↗</a>}
                    </div>
                    <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
                      <button onClick={() => startEdit(p)} style={{ background:"rgba(108,99,255,0.1)", border:"1px solid rgba(108,99,255,0.3)", color:"#6c63ff", padding:"0.4rem 1rem", borderRadius:50, cursor:"pointer", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.8rem" }}>Edit</button>
                      <button onClick={() => handleDeleteProject(p.id)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", padding:"0.4rem 1rem", borderRadius:50, cursor:"pointer", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.8rem" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACTS TAB */}
        {tab === "contacts" && (
          <div>
            <h2 style={{ fontFamily:"Outfit,sans-serif", fontSize:"1.25rem", fontWeight:700, marginBottom:"1.5rem" }}>Contact Submissions</h2>
            {loading ? <p style={{ color:"rgba(240,240,248,0.55)", textAlign:"center", padding:"3rem" }}>Loading...</p> : (
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {contacts.length === 0 && <p style={{ color:"rgba(240,240,248,0.35)", textAlign:"center", padding:"3rem", background:"#111118", borderRadius:14, border:"1px solid rgba(255,255,255,0.07)" }}>No contact submissions yet.</p>}
                {contacts.map(c => (
                  <div key={c.id} style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"1.5rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
                      <div>
                        <h3 style={{ fontFamily:"Outfit,sans-serif", fontSize:"1rem", fontWeight:700 }}>{c.name}</h3>
                        <div style={{ display:"flex", gap:"1rem", marginTop:"0.3rem", flexWrap:"wrap", alignItems:"center" }}>
                          <a href={`mailto:${c.email}`} style={{ fontSize:"0.85rem", color:"#6c63ff" }}>{c.email}</a>
                          {c.phone && <a href={`tel:${c.phone}`} style={{ fontSize:"0.85rem", color:"#10e8a8" }}>📞 {c.phone}</a>}
                          {c.interest && <span style={{ fontSize:"0.8rem", background:"rgba(108,99,255,0.1)", border:"1px solid rgba(108,99,255,0.2)", color:"#a855f7", padding:"0.2rem 0.7rem", borderRadius:50 }}>{c.interest}</span>}
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                        <span style={{ fontSize:"0.75rem", color:"rgba(240,240,248,0.35)" }}>{c.created_at ? new Date(c.created_at).toLocaleDateString() : ""}</span>
                        <button onClick={() => handleDeleteContact(c.id)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", padding:"0.4rem 0.9rem", borderRadius:50, cursor:"pointer", fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.8rem" }}>Delete</button>
                      </div>
                    </div>
                    <p style={{ fontSize:"0.9rem", color:"rgba(240,240,248,0.7)", lineHeight:1.7, background:"#050508", padding:"1rem", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)" }}>{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
