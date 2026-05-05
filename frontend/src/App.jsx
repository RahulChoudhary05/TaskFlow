import React, { useState, useEffect } from "react";
import HomeLanding from "./pages/HomeLanding.jsx";
import { api } from "./api/index.js";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { COLORS, gradients } from "./common/theme.js";
import useResponsive from "./hooks/useResponsive.js";
import Modal from "./components/common/Modal.jsx";
import PublicHeader from "./components/layout/PublicHeader.jsx";
import PublicFooter from "./components/layout/PublicFooter.jsx";

// ──────────────────────────────────────────────────────────────────────────────
// ICONS
// ──────────────────────────────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  Project: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7l10-5 10 5-10 5-10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>,
  Task: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Team: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Report: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

// ──────────────────────────────────────────────────────────────────────────────
// AUTH PAGE
// ──────────────────────────────────────────────────────────────────────────────
function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isMobile } = useResponsive();

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("All fields required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (mode === "signup" && !form.name) { setError("Name is required"); return; }
    
    setError(""); setLoading(true);
    try {
      if (mode === "signup") await api.signup(form), setMode("login");
      else await login(form.email, form.password);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 150px)", background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`, alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 16 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: isMobile ? 24 : 40, width: isMobile ? "100%" : 420, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: isMobile ? 28 : 32, fontWeight: 700, background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
            TaskFlow
          </div>
          <div style={{ fontSize: 14, color: "#8b949e" }}>{mode === "login" ? "Welcome back!" : "Create your workspace"}</div>
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Full Name</label>
            <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Email Address</label>
          <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Password</label>
          <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} type="password" placeholder="Minimum 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Role</label>
            <select style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="member">Team Member</option>
              <option value="admin">Project Admin</option>
            </select>
          </div>
        )}

        {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>{error}</div>}

        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 8, padding: "12px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#8b949e" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: COLORS.primary, cursor: "pointer", fontWeight: 600 }} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// DASHBOARD PAGE
// ──────────────────────────────────────────────────────────────────────────────
function Dashboard({ navigate }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    api.getTasks().then(setTasks).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  const overdue = tasks.filter(t => t.overdue);
  const done = tasks.filter(t => t.status === "done").length;
  const inProgress = tasks.filter(t => t.status === "in_progress").length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, marginBottom: 8 }}>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: "#8b949e", fontSize: 14 }}>Here's your task overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Total Tasks", num: tasks.length, color: COLORS.info, icon: "📋" },
          { label: "In Progress", num: inProgress, color: COLORS.warning, icon: "🔄" },
          { label: "Completed", num: done, color: COLORS.success, icon: "✅" },
          { label: "Overdue", num: overdue.length, color: COLORS.danger, icon: "⚠️" },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.bgSecondary, border: `1px solid ${s.color}40`, borderRadius: 12, padding: isMobile ? "14px 12px" : isTablet ? "18px 16px" : "20px 24px" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 12, color: "#8b949e", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {overdue.length > 0 && (
        <div style={{ border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: isMobile ? 16 : 20, marginBottom: 16, background: "rgba(239,68,68,0.05)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#f87171", display: "flex", alignItems: "center", gap: 8 }}>⚠️ Overdue Tasks</div>
          {overdue.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(239,68,68,0.1)", fontSize: 13 }}>
              <span>{t.title}</span>
              <span style={{ color: "#f87171", fontSize: 12 }}>{t.deadline}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
        <div style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: isMobile ? 16 : 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#e8eaed" }}>📁 My Projects</div>
          {projects.slice(0, 5).map(p => (
            <div key={p.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13, cursor: "pointer", color: COLORS.primary, transition: "all 0.2s" }} onClick={() => navigate("projects")}>
              {p.name}
            </div>
          ))}
          {projects.length === 0 && <div style={{ fontSize: 13, color: "#8b949e" }}>No projects yet</div>}
          {projects.length > 5 && <div style={{ fontSize: 12, color: "#8b949e", marginTop: 8 }}>+{projects.length - 5} more</div>}
        </div>

        <div style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: isMobile ? 16 : 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#e8eaed" }}>📝 Recent Tasks</div>
          {tasks.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13, gap: 8 }}>
              <span style={{ color: t.overdue ? "#f87171" : "#e8eaed", flex: 1 }}>{t.title}</span>
              <span style={{ display: "inline-block", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, background: t.status === "done" ? `rgba(16,185,129,0.2)` : t.status === "in_progress" ? `rgba(245,158,11,0.2)` : `rgba(148,163,184,0.15)`, color: t.status === "done" ? "#10b981" : t.status === "in_progress" ? "#fbbf24" : "#94a3b8" }}>{t.status.replace("_", " ")}</span>
            </div>
          ))}
          {tasks.length === 0 && <div style={{ fontSize: 13, color: "#8b949e" }}>No tasks assigned</div>}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ──────────────────────────────────────────────────────────────────────────────
function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showMembers, setShowMembers] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { isMobile } = useResponsive();

  const load = () => api.getProjects().then(setProjects);
  useEffect(() => { load(); }, []);

  const createProject = async () => {
    if (!form.name.trim()) { setError("Project name is required"); return; }
    setError("");
    try {
      await api.createProject(form);
      setShowCreate(false);
      setForm({ name: "", description: "" });
      load();
    } catch (e) { setError(e.message); }
  };

  const openMembers = async (p) => {
    setShowMembers(p);
    setError("");
    try {
      const [users, mems] = await Promise.all([api.getUsers(), api.getMembers(p.id)]);
      setAllUsers(users);
      setMembers(mems);
      setSelectedUsers([]);
    } catch (e) {
      setError(e.message);
    }
  };

  const addMembers = async () => {
    if (!selectedUsers.length) return;
    try {
      await api.addMembers(showMembers.id, selectedUsers);
      const mems = await api.getMembers(showMembers.id);
      setMembers(mems);
      setSelectedUsers([]);
    } catch (e) {
      setError(e.message);
    }
  };

  const removeMember = async (uid) => {
    try {
      await api.removeMember(showMembers.id, uid);
      setMembers(members.filter(m => m.id !== uid));
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleUser = (uid) => {
    setSelectedUsers(prev => prev.includes(uid) ? prev.filter(x => x !== uid) : [...prev, uid]);
  };

  const nonMembers = allUsers.filter(u => !members.find(m => m.id === u.id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
        <span style={{ color: "#8b949e", fontSize: 14 }}>{projects.length} project{projects.length !== 1 ? "s" : ""}</span>
        {user.role === "admin" && (
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={() => setShowCreate(true)}>
            <Icon.Plus /> New Project
          </button>
        )}
      </div>

      {projects.length === 0 && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>No projects yet. {user.role === "admin" ? "Create your first project!" : "Waiting to be added..."}</div>}

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
        {projects.map(p => (
          <div key={p.id} style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: isMobile ? 16 : 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#e8eaed" }}>{p.name}</div>
            <div style={{ fontSize: 13, color: "#8b949e", marginBottom: 14 }}>{p.description || "No description"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {user.role === "admin" && (
                <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => openMembers(p)}>
                  👥 Manage Team
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <Modal title="✨ Create New Project" isMobile={isMobile} onClose={() => { setShowCreate(false); setError(""); }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Project Name</label>
            <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Website Redesign" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Description</label>
            <textarea style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box", height: 80, resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What is this project about?" />
          </div>
          {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>{error}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => { setShowCreate(false); setError(""); }}>Cancel</button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={createProject}>Create</button>
          </div>
        </Modal>
      )}

      {showMembers && (
        <Modal title={`👥 Team: ${showMembers.name}`} isMobile={isMobile} onClose={() => { setShowMembers(null); setError(""); }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#e8eaed" }}>Current Members ({members.length})</div>
            {members.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div>
                  <span style={{ fontSize: 13 }}>{m.name}</span>
                  <span style={{ display: "inline-block", background: m.role === "admin" ? `rgba(139,92,246,0.2)` : `rgba(16,185,129,0.2)`, color: m.role === "admin" ? "#c4b5fd" : "#6ee7b7", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginLeft: 8 }}>{m.role}</span>
                </div>
                {m.id !== user.id && (
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(239,68,68,0.15)", color: "#f87171", transition: "all 0.15s" }} onClick={() => removeMember(m.id)}><Icon.Trash /></button>
                )}
              </div>
            ))}
            {members.length === 0 && <div style={{ fontSize: 13, color: "#8b949e", padding: "10px 0" }}>No members yet</div>}
          </div>

          {nonMembers.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#e8eaed" }}>Add Members</div>
              <div style={{ maxHeight: 160, overflowY: "auto", border: `1px solid ${COLORS.border}`, borderRadius: 8, marginBottom: 12 }}>
                {nonMembers.map(u => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer", background: selectedUsers.includes(u.id) ? `rgba(99,102,241,0.1)` : "transparent", transition: "all 0.2s" }} onClick={() => toggleUser(u.id)}>
                    <input type="checkbox" checked={selectedUsers.includes(u.id)} onChange={() => {}} style={{ accentColor: COLORS.primary, cursor: "pointer" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{u.email}</div>
                    </div>
                    <span style={{ display: "inline-block", background: u.role === "admin" ? `rgba(139,92,246,0.2)` : `rgba(16,185,129,0.2)`, color: u.role === "admin" ? "#c4b5fd" : "#6ee7b7", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{u.role}</span>
                  </div>
                ))}
              </div>
              {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>{error}</div>}
              <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 6, padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={addMembers} disabled={!selectedUsers.length}>
                Add {selectedUsers.length || ""} Member{selectedUsers.length !== 1 ? "s" : ""}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// TASKS PAGE
// ──────────────────────────────────────────────────────────────────────────────
function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterProject, setFilterProject] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", deadline: "", priority: "medium", project_id: "", assigned_to: "", assigned_type: "team" });
  const [projectMembers, setProjectMembers] = useState([]);
  const [error, setError] = useState("");
  const { isMobile } = useResponsive();

  const load = () => api.getTasks(filterProject || null).then(setTasks).catch(() => setTasks([]));
  useEffect(() => { load(); }, [filterProject]);
  useEffect(() => { api.getProjects().then(setProjects).catch(() => setProjects([])); }, []);

  const loadMembers = async (pid) => {
    if (!pid) { setProjectMembers([]); return; }
    try {
      const mems = await api.getMembers(pid);
      setProjectMembers(mems);
    } catch (e) {
      setError(e.message);
    }
  };

  const createTask = async () => {
    if (!form.title.trim() || !form.project_id) { setError("Title and project are required"); return; }
    setError("");
    try {
      await api.createTask({
        ...form,
        project_id: parseInt(form.project_id),
        assigned_to: form.assigned_type === "user" ? parseInt(form.assigned_to) : null,
      });
      setShowCreate(false);
      setForm({ title: "", description: "", deadline: "", priority: "medium", project_id: "", assigned_to: "", assigned_type: "team" });
      load();
    } catch (e) { setError(e.message); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.updateTask(id, status);
      setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const filtered = tasks.filter(t => !filterStatus || t.status === filterStatus);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: isMobile ? "1 0 100%" : "1" }}>
          <select style={{ width: isMobile ? "auto" : 160, background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={filterProject} onChange={e => setFilterProject(e.target.value)}>
            <option value="">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select style={{ width: isMobile ? "auto" : 140, background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        {user.role === "admin" && (
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={() => setShowCreate(true)}>
            <Icon.Plus /> New Task
          </button>
        )}
      </div>

      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>No tasks found</div>}

      {filtered.map(t => (
        <div key={t.id} style={{ background: t.overdue ? "rgba(239,68,68,0.05)" : "#0d1117", border: `1px solid ${t.overdue ? "rgba(239,68,68,0.3)" : COLORS.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: isMobile ? "wrap" : "nowrap" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {t.title}
                {t.overdue && <span style={{ display: "inline-block", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>⚠ Overdue</span>}
              </div>
              {t.description && <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>{t.description}</div>}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ display: "inline-block", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, background: t.status === "done" ? `rgba(16,185,129,0.2)` : t.status === "in_progress" ? `rgba(245,158,11,0.2)` : `rgba(148,163,184,0.15)`, color: t.status === "done" ? "#10b981" : t.status === "in_progress" ? "#fbbf24" : "#94a3b8" }}>{t.status.replace("_", " ")}</span>
                <span style={{ display: "inline-block", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, background: t.priority === "high" ? `rgba(239,68,68,0.15)` : t.priority === "medium" ? `rgba(245,158,11,0.15)` : `rgba(16,185,129,0.15)`, color: t.priority === "high" ? "#f87171" : t.priority === "medium" ? "#fbbf24" : "#6ee7b7" }}>{t.priority}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(59,130,246,0.15)`, color: "#60a5fa", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>{t.project_name}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(139,92,246,0.15)`, color: "#c4b5fd", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>{t.assigned_type === "team" ? "👥 Team" : `👤 ${t.assignee_name || "User"}`}</span>
                {t.deadline && <span style={{ fontSize: 11, color: t.overdue ? "#f87171" : "#8b949e" }}>📅 {t.deadline}</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
              <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)} style={{ width: "auto", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 8px", color: "#e8eaed", fontSize: 12, outline: "none", boxSizing: "border-box" }}>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {user.role === "admin" && (
                <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(239,68,68,0.15)", color: "#f87171", transition: "all 0.15s" }} onClick={() => deleteTask(t.id)}><Icon.Trash /></button>
              )}
            </div>
          </div>
        </div>
      ))}

      {showCreate && (
        <Modal title="✨ Create New Task" isMobile={isMobile} onClose={() => { setShowCreate(false); setError(""); }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Title</label>
            <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Task title" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Description</label>
            <textarea style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box", height: 60, resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the task..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Project</label>
              <select style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.project_id} onChange={e => { const pid = e.target.value; setForm({ ...form, project_id: pid }); if (pid) loadMembers(pid); }}>
                <option value="">Select project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Deadline</label>
              <input style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Priority</label>
              <select style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Assign To</label>
            <select style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.assigned_type} onChange={e => setForm({ ...form, assigned_type: e.target.value, assigned_to: "" })}>
              <option value="team">Whole Team</option>
              <option value="user">Specific User</option>
            </select>
          </div>
          {form.assigned_type === "user" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>Member</label>
              <select style={{ width: "100%", background: "#0d1117", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: isMobile ? 10 : 12, color: "#e8eaed", fontSize: isMobile ? 13 : 14, outline: "none", boxSizing: "border-box" }} value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })}>
                <option value="">Select member</option>
                {projectMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          )}
          {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>{error}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => { setShowCreate(false); setError(""); }}>Cancel</button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: COLORS.primary, color: "#fff", transition: "all 0.15s" }} onClick={createTask}>Create</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// CALENDAR PAGE
// ──────────────────────────────────────────────────────────────────────────────
function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isMobile } = useResponsive();

  useEffect(() => { api.getTasks().then(setTasks).catch(() => setTasks([])); }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().split("T")[0];

  const tasksByDate = {};
  tasks.filter(t => t.deadline).forEach(t => {
    if (!tasksByDate[t.deadline]) tasksByDate[t.deadline] = [];
    tasksByDate[t.deadline].push(t);
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 8, flexWrap: "wrap" }}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => setCurrentDate(new Date(year, month - 1))}>← Prev</button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>{monthNames[month]} {year}</span>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => setCurrentDate(new Date(year, month + 1))}>Next →</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: COLORS.border, borderRadius: 12, overflow: "hidden" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} style={{ background: COLORS.bgSecondary, padding: "12px 8px", textAlign: "center", fontSize: 11, color: "#8b949e", fontWeight: 600, textTransform: "uppercase" }}>{d}</div>
        ))}
        {days.map((day, i) => {
          const dateStr = day ? `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}` : null;
          const dayTasks = dateStr ? (tasksByDate[dateStr] || []) : [];
          const isToday = dateStr === today;
          return (
            <div key={i} style={{ background: COLORS.bgSecondary, minHeight: 90, padding: 8, opacity: day ? 1 : 0.3 }}>
              {day && (
                <>
                  <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? COLORS.primary : "#e8eaed", background: isToday ? `rgba(99,102,241,0.2)` : "transparent", borderRadius: 99, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                    {day}
                  </div>
                  {dayTasks.map(t => (
                    <div key={t.id} style={{ fontSize: 10, background: t.overdue ? "rgba(239,68,68,0.2)" : `rgba(59,130,246,0.15)`, color: t.overdue ? "#f87171" : "#60a5fa", borderRadius: 4, padding: "2px 5px", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// TEAM PAGE
// ──────────────────────────────────────────────────────────────────────────────
function TeamPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => { 
    api.getProjects()
      .then(p => { setProjects(p); if (p.length) setSelectedProject(p[0]); })
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => { 
    if (selectedProject) {
      setLoading(true);
      api.getMembers(selectedProject.id)
        .then(setMembers)
        .catch(() => setMembers([]))
        .finally(() => setLoading(false));
    }
  }, [selectedProject]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {projects.map(p => (
          <button key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600, background: selectedProject?.id === p.id ? COLORS.primary : "rgba(255,255,255,0.07)", color: selectedProject?.id === p.id ? "#fff" : "#e8eaed", transition: "all 0.15s" }} onClick={() => setSelectedProject(p)}>
            {p.name}
          </button>
        ))}
      </div>

      {projects.length === 0 && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>No projects available</div>}

      {selectedProject && (
        <div style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: isMobile ? 16 : 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#e8eaed" }}>👥 {selectedProject.name} — Team</div>
          {loading && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>Loading members...</div>}
          {!loading && members.length === 0 && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>No members in this project yet.</div>}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {members.map(m => (
              <div key={m.id} style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: m.role === "admin" ? `rgba(139,92,246,0.3)` : `rgba(59,130,246,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: m.role === "admin" ? "#c4b5fd" : "#60a5fa" }}>
                  {m.name[0].toUpperCase()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#8b949e", wordBreak: "break-all" }}>{m.email}</div>
                <span style={{ display: "inline-block", background: m.role === "admin" ? `rgba(139,92,246,0.2)` : `rgba(16,185,129,0.2)`, color: m.role === "admin" ? "#c4b5fd" : "#6ee7b7", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// REPORTS PAGE
// ──────────────────────────────────────────────────────────────────────────────
function Reports() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const { isMobile } = useResponsive();

  useEffect(() => { api.getReports().then(setData).catch(e => setError(e.message)); }, []);

  if (error) return <div style={{ textAlign: "center", padding: "48px 16px", color: "#f87171", fontSize: 14 }}>Error: {error}</div>;
  if (!data) return <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>Loading reports...</div>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Total Tasks", num: data.summary.total_tasks, color: COLORS.info },
          { label: "Completed", num: data.summary.total_done, color: COLORS.success },
          { label: "Overdue", num: data.summary.total_overdue, color: COLORS.danger },
          { label: "Completion %", num: `${data.summary.overall_completion_pct}%`, color: COLORS.secondary },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.bgSecondary, border: `1px solid ${s.color}40`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 12, color: "#8b949e", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.bgSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: isMobile ? 16 : 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#e8eaed" }}>📊 Project Breakdown</div>
        {data.projects.length === 0 && <div style={{ textAlign: "center", padding: "48px 16px", color: "#8b949e", fontSize: 14 }}>No project data yet.</div>}
        {data.projects.map(p => (
          <div key={p.project_id} style={{ padding: "16px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p.project_name}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `rgba(59,130,246,0.1)`, color: "#60a5fa", borderRadius: 99, padding: "4px 8px", fontSize: 11, fontWeight: 600, marginLeft: 8 }}>👥 {p.members} members</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: p.completion_pct >= 80 ? COLORS.success : p.completion_pct >= 40 ? COLORS.warning : COLORS.danger }}>
                {p.completion_pct}%
              </span>
            </div>
            <div style={{ background: COLORS.border, borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${p.completion_pct}%`, background: p.completion_pct >= 80 ? COLORS.success : p.completion_pct >= 40 ? COLORS.warning : COLORS.primary, borderRadius: 99, transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "#8b949e", flexWrap: "wrap" }}>
              <span>✅ {p.done} done</span>
              <span>🔄 {p.in_progress} in progress</span>
              <span>📋 {p.todo} todo</span>
              {p.overdue > 0 && <span style={{ color: COLORS.danger }}>⚠️ {p.overdue} overdue</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// APP SHELL
// ──────────────────────────────────────────────────────────────────────────────
function AppShell({ onGoHome }) {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Icon.Dashboard },
    { id: "projects", label: "Projects", icon: Icon.Project },
    { id: "tasks", label: "Tasks", icon: Icon.Task },
    { id: "calendar", label: "Calendar", icon: Icon.Calendar },
    { id: "team", label: "Team", icon: Icon.Team },
    ...(user?.role === "admin" ? [{ id: "reports", label: "Reports", icon: Icon.Report }] : []),
  ];

  const pages = {
    dashboard: <Dashboard navigate={setPage} />,
    projects: <Projects />,
    tasks: <Tasks />,
    calendar: <CalendarPage />,
    team: <TeamPage />,
    reports: <Reports />,
  };

  const pageTitle = navItems.find(n => n.id === page)?.label || "Dashboard";

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: gradients.appBg, color: "#e8eaed", flexDirection: isMobile ? "column" : "row" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {isMobile && sidebarOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} onClick={() => setSidebarOpen(false)} />}
      
      <div style={{ width: isMobile ? 270 : 260, background: COLORS.bgSecondary, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", padding: "24px 0", position: isMobile ? "fixed" : "relative", left: isMobile ? (sidebarOpen ? "0" : "-280px") : "0", top: 0, height: "100vh", zIndex: isMobile ? 50 : "auto", transition: "left 0.25s ease", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 28px", fontSize: isMobile ? 20 : 22, fontWeight: 700, color: COLORS.primary, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
          Task<span style={{ color: COLORS.secondary }}>Flow</span>
        </div>
        {navItems.map(n => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", cursor: "pointer", color: page === n.id ? COLORS.primary : "#8b949e", background: page === n.id ? `rgba(99,102,241,0.1)` : "transparent", borderLeft: page === n.id ? `3px solid ${COLORS.primary}` : "3px solid transparent", fontSize: 14, fontWeight: page === n.id ? 600 : 400, transition: "all 0.2s", userSelect: "none", whiteSpace: "nowrap" }} onClick={() => { setPage(n.id); if (isMobile) setSidebarOpen(false); }}>
            <n.icon />
            {n.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "0 20px" }}>
          <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>{user?.name}</div>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 6, padding: isMobile ? "10px 14px" : "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.07)", color: "#e8eaed", transition: "all 0.15s" }} onClick={() => { logout(); if (isMobile) setSidebarOpen(false); }}>
            <Icon.Logout /> Sign Out
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div style={{ padding: isMobile ? "12px 16px" : isTablet ? "14px 20px" : "16px 28px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.bgSecondary, flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 8 : 0 }}>
          {isMobile && (
            <button style={{ background: "none", border: "none", color: "#e8eaed", cursor: "pointer", padding: 4 }} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Icon.Menu />
            </button>
          )}
          <span style={{ fontSize: 18, fontWeight: 700, color: "#e8eaed" }}>{pageTitle}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#8b949e", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button
              onClick={onGoHome}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.05)", color: "#e8eaed", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
            >
              Home Page
            </button>
            <span>{user?.name}</span>
            <span style={{ display: "inline-block", background: user?.role === "admin" ? `rgba(139,92,246,0.2)` : `rgba(16,185,129,0.2)`, color: user?.role === "admin" ? "#c4b5fd" : "#6ee7b7", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{user?.role}</span>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: isMobile ? "16px" : isTablet ? "20px" : "28px" }}>{pages[page]}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

function AppInner() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showLandingFromDashboard, setShowLandingFromDashboard] = useState(false);
  if (loading) return (
    <div style={{ height: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#8b949e", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 16 }}>⏳</div>
        <div>Loading...</div>
      </div>
    </div>
  );
  if (user && !showLandingFromDashboard) return <AppShell onGoHome={() => setShowLandingFromDashboard(true)} />;
  if (user && showLandingFromDashboard) {
    return (
      <HomeLanding
        onLogin={() => setShowLandingFromDashboard(false)}
        onGetStarted={() => setShowLandingFromDashboard(false)}
      />
    );
  }
  return showAuth ? (
    <div>
      <PublicHeader onLogin={() => setShowAuth(true)} onGetStarted={() => setShowAuth(false)} />
      <AuthPage />
      <div style={{ background: gradients.appBg }}>
        <PublicFooter />
      </div>
    </div>
  ) : (
    <HomeLanding onLogin={() => setShowAuth(true)} onGetStarted={() => setShowAuth(true)} />
  );
}
