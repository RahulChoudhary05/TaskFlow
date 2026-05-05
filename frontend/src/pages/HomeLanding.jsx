import React, { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  primary: "#6d7cff",
  secondary: "#8d67ff",
  teal: "#2dd4bf",
  bg: "#060a14",
  bgB: "#0c1225",
  panel: "rgba(255,255,255,0.045)",
  panelHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.09)",
  borderGlow: "rgba(109,124,255,0.3)",
  text: "#eef0ff",
  muted: "#8a9dc4",
  faint: "rgba(255,255,255,0.35)",
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w };
}

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── ANIMATED SECTION ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "⬡", title: "Kanban Board", text: "Visualize workflow with a clean drag-and-drop board. Every card has context—owner, deadline, priority." },
  { icon: "◎", title: "Team Collaboration", text: "Comment, assign, and coordinate. Role-aware spaces keep discussions contextual and noise-free." },
  { icon: "◈", title: "Role-Based Access", text: "Admins shape the workspace. Members focus only on what's assigned—no clutter, no confusion." },
  { icon: "◉", title: "Smart Notifications", text: "Surface only what matters. Deadline alerts, approvals, and status changes delivered in context." },
  { icon: "◫", title: "Secure & Private", text: "JWT auth, protected routes, and filtered project visibility. Your data stays exactly where it belongs." },
  { icon: "◐", title: "Activity Tracking", text: "Progress dashboards, burndown summaries, and readable status histories for every sprint." },
];

const STEPS = [
  ["01", "Create a Project", "Start a workspace for a team, client, or internal initiative with one click."],
  ["02", "Add Your Team", "Invite members, define roles, and keep ownership clear from day one."],
  ["03", "Organize Tasks", "Create tasks, set due dates, assign ownership, and define priorities."],
  ["04", "Track & Ship", "Monitor status, resolve blockers, and ship together with full visibility."],
];

const ROLES = [
  {
    role: "Admin",
    color: "#6d7cff",
    glow: "rgba(109,124,255,0.15)",
    items: ["Create and delete projects", "Manage all team members", "Create tasks for anyone", "View all project activity", "Configure project settings"],
  },
  {
    role: "Member",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,0.12)",
    items: ["View assigned projects only", "Create and manage own tasks", "Update task status freely", "Add comments to tasks", "Receive smart notifications"],
  },
];

// ─── KEYFRAME INJECTION ───────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body { background: ${C.bg}; }

  @keyframes glow-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.06); }
    66% { transform: translate(-20px, 15px) scale(0.96); }
  }

  @keyframes pulse-border {
    0%, 100% { border-color: rgba(109,124,255,0.15); }
    50% { border-color: rgba(109,124,255,0.4); }
  }

  @keyframes hero-in {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes badge-pop {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes card-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .hero-text { animation: hero-in 0.9s ease forwards; }
  .hero-preview { animation: hero-in 0.9s ease 0.18s both; }

  .feature-card {
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(109,124,255,0.35) !important;
    background: rgba(255,255,255,0.07) !important;
  }

  .step-card {
    transition: transform 0.25s ease;
  }
  .step-card:hover { transform: translateY(-4px); }

  .role-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .role-card:hover { transform: translateY(-3px); }

  .primary-btn {
    transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  }
  .primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 50px rgba(109,124,255,0.4) !important;
  }
  .primary-btn:active { transform: scale(0.97); }

  .ghost-btn {
    transition: background 0.18s ease, border-color 0.18s ease;
  }
  .ghost-btn:hover {
    background: rgba(255,255,255,0.08) !important;
    border-color: rgba(255,255,255,0.22) !important;
  }

  .nav-link {
    transition: color 0.15s;
  }
  .nav-link:hover { color: ${C.text} !important; }

  .preview-shell { animation: pulse-border 5s ease-in-out infinite; }

  .board-card {
    transition: transform 0.2s ease;
    animation: card-float 6s ease-in-out infinite;
  }
  .board-card:nth-child(2) { animation-delay: 1.5s; }
  .board-card:nth-child(3) { animation-delay: 3s; }

  .ticker-wrap { overflow: hidden; }
  .ticker-inner {
    display: flex;
    width: max-content;
    animation: ticker 28s linear infinite;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(109,124,255,0.3); border-radius: 3px; }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="nav-link"
      style={{ color: C.muted, textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: "DM Sans, sans-serif" }}
    >
      {children}
    </a>
  );
}

function Header({ onLogin, onGetStarted, isMobile, isTablet }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const compact = isMobile || isTablet;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: compact ? "14px 18px" : "16px 40px",
        background: scrolled ? "rgba(6,10,20,0.85)" : "rgba(6,10,20,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
        fontFamily: "Sora, sans-serif",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 18,
            color: "#fff",
            boxShadow: "0 8px 24px rgba(109,124,255,0.35)",
            flexShrink: 0,
          }}
        >
          T
        </div>
        <div>
          <div style={{ fontSize: compact ? 16 : 18, fontWeight: 800, letterSpacing: "-0.04em", color: C.text }}>
            TaskFlow
          </div>
          {!isMobile && (
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
              Calm project coordination
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 20 }}>
        {!compact && (
          <>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#roles">Roles</NavLink>
          </>
        )}
        <button
          onClick={onLogin}
          className="ghost-btn"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${C.border}`,
            color: C.text,
            padding: compact ? "8px 12px" : "9px 16px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "Sora, sans-serif",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Log in
        </button>
        <button
          onClick={onGetStarted}
          className="primary-btn"
          style={{
            background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
            border: "none",
            color: "#fff",
            padding: compact ? "8px 14px" : "9px 18px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Sora, sans-serif",
            letterSpacing: "-0.01em",
            boxShadow: "0 10px 28px rgba(109,124,255,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {isMobile ? "Start free" : "Get started free"}
        </button>
      </nav>
    </header>
  );
}

function Ticker() {
  const ITEMS = ["Live boards", "Team comments", "Role control", "Status visibility", "JWT auth", "Smart alerts", "Sprint tracking", "Drag & drop", "Filtered views", "Member spaces"];
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-wrap" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "12px 0", margin: "32px 0 0" }}>
      <div className="ticker-inner">
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "0 28px",
              fontSize: 12,
              fontWeight: 600,
              color: C.muted,
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#6d7cff,#2dd4bf)", display: "inline-block", flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function BoardCard({ title, meta, accent, delay = 0 }) {
  return (
    <div
      className="board-card"
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "14px 14px 14px 18px",
        marginBottom: 10,
        overflow: "hidden",
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: accent, borderRadius: "3px 0 0 3px" }} />
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: "Sora, sans-serif", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.muted, fontFamily: "DM Sans, sans-serif" }}>{meta}</div>
    </div>
  );
}

function PreviewShell({ isMobile }) {
  return (
    <div
      className="preview-shell"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
        border: `1px solid ${C.border}`,
        borderRadius: isMobile ? 22 : 28,
        padding: isMobile ? 16 : 22,
        boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(109,124,255,0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>Sprint Board</span>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 999, background: "rgba(45,212,191,0.12)", color: "#5eead4", fontFamily: "Sora, sans-serif" }}>● Live</span>
      </div>

      {/* Board columns */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 10 }}>
        {[
          { col: "Plan", cards: [{ title: "Design review", meta: "In progress · 2d left", accent: "#8d67ff" }] },
          { col: "Build", cards: [{ title: "Backend sync", meta: "Today · @alex", accent: "#2dd4bf" }, { title: "API endpoints", meta: "Tomorrow · @sara", accent: "#2dd4bf" }] },
          { col: "Ship", cards: [{ title: "Release notes", meta: "Done ✓", accent: "#6d7cff" }] },
        ].map(({ col, cards }) => (
          <div key={col} style={{ minHeight: isMobile ? "auto" : 220, padding: 10, borderRadius: 18, background: "rgba(0,0,0,0.3)", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontFamily: "DM Sans, sans-serif" }}>{col}</div>
            {cards.map((c, i) => <BoardCard key={i} {...c} delay={i * 1.5} />)}
          </div>
        ))}
      </div>

      {/* Footer metrics */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
        {[
          ["Active tasks", "12"],
          ["Team comments", "04 new"],
          ["On track", "83%"],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: "10px 12px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 18,
        background: accent ? "linear-gradient(135deg, rgba(109,124,255,0.18), rgba(141,103,255,0.1))" : C.panel,
        border: `1px solid ${accent ? "rgba(109,124,255,0.22)" : C.border}`,
      }}
    >
      <div style={{ fontSize: 11, color: C.muted, fontFamily: "DM Sans, sans-serif", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: C.text, fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em" }}>{value}</div>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <div style={{ width: 20, height: 2, background: "linear-gradient(90deg, #6d7cff, #2dd4bf)", borderRadius: 2 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a9dc4", fontFamily: "DM Sans, sans-serif" }}>{text}</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <div style={{ marginBottom: 40, textAlign: center ? "center" : "left", maxWidth: center ? 700 : "none", margin: center ? "0 auto 44px" : "0 0 44px" }}>
      <SectionLabel text={eyebrow} />
      <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.05em", color: C.text, fontFamily: "Sora, sans-serif", lineHeight: 1.1, marginBottom: 14 }}>
        {title}
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.75, color: C.muted, fontFamily: "DM Sans, sans-serif", fontWeight: 300, maxWidth: 640, margin: center ? "0 auto" : 0 }}>{subtitle}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article
      className="feature-card"
      style={{
        padding: "22px 24px",
        borderRadius: 22,
        background: C.panel,
        border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 16, lineHeight: 1 }}>{icon}</div>
      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: C.text, fontFamily: "Sora, sans-serif", marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: C.muted, fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>{text}</p>
    </article>
  );
}

function StepCard({ num, title, text }) {
  return (
    <article
      className="step-card"
      style={{
        padding: "22px 24px",
        borderRadius: 22,
        background: C.panel,
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
          fontWeight: 800,
          fontSize: 14,
          color: "#fff",
          fontFamily: "Sora, sans-serif",
          boxShadow: "0 8px 24px rgba(109,124,255,0.3)",
          marginBottom: 18,
          letterSpacing: "-0.02em",
        }}
      >
        {num}
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: C.text, fontFamily: "Sora, sans-serif", marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: C.muted, fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>{text}</p>
    </article>
  );
}

function RoleCard({ role, color, glow, items }) {
  return (
    <div
      className="role-card"
      style={{
        padding: "26px 28px",
        borderRadius: 24,
        background: `linear-gradient(180deg, ${glow}, rgba(255,255,255,0.025))`,
        border: `1px solid ${C.border}`,
        boxShadow: `0 0 0 1px ${glow}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 14px ${color}` }} />
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", color: C.text, fontFamily: "Sora, sans-serif" }}>{role}</h3>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "9px 0",
              borderBottom: `1px solid ${C.border}`,
              fontSize: 14,
              color: C.muted,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 400,
            }}
          >
            <span style={{ color, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function HomeLanding({ onLogin = () => {}, onGetStarted = () => {} }) {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const compact = isMobile || isTablet;

  const PAD = isMobile ? "0 18px" : isTablet ? "0 28px" : "0 48px";
  const MAX = 1240;

  return (
    <>
      <style>{STYLES}</style>

      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,124,255,0.22) 0%, transparent 70%)", animation: "glow-drift 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: -300, left: -150, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)", animation: "glow-drift 14s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", top: "40%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(141,103,255,0.09) 0%, transparent 70%)", animation: "glow-drift 18s ease-in-out infinite 4s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", background: `radial-gradient(ellipse at top, #0f1835 0%, #060a14 50%)`, color: C.text, fontFamily: "Sora, sans-serif", overflowX: "hidden" }}>

        {/* HEADER */}
        <Header onLogin={onLogin} onGetStarted={onGetStarted} isMobile={isMobile} isTablet={isTablet} />

        {/* ── HERO ─────────────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "48px 18px 40px" : isTablet ? "56px 28px 44px" : "72px 48px 52px" }}>
          <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1.1fr 0.9fr", gap: isMobile ? 36 : 36, alignItems: "center" }}>

            {/* Left: Copy */}
            <div className="hero-text">
              {/* Kicker badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Project clarity", "Team momentum", "Calm interface"].map((k) => (
                  <span
                    key={k}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: C.panel,
                      border: `1px solid ${C.border}`,
                      color: C.muted,
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: "DM Sans, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#6d7cff,#2dd4bf)" }} />
                    {k}
                  </span>
                ))}
              </div>

              <h1
                style={{
                  fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : isTablet ? "clamp(44px, 8vw, 64px)" : "clamp(52px, 6vw, 80px)",
                  fontWeight: 800,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.95,
                  color: C.text,
                  marginBottom: 22,
                  maxWidth: 680,
                }}
              >
                Ship projects
                <br />
                <span style={{ background: "linear-gradient(90deg, #6d7cff 0%, #8d67ff 50%, #2dd4bf 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  with calm flow
                </span>
              </h1>

              <p
                style={{
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.75,
                  color: C.muted,
                  maxWidth: 560,
                  marginBottom: 30,
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 300,
                }}
              >
                A task management system with a warmer visual identity, subtle motion, and deliberate hierarchy. Build momentum without the generic SaaS look.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                <button
                  onClick={onGetStarted}
                  className="primary-btn"
                  style={{
                    padding: "14px 24px",
                    background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
                    border: "none",
                    borderRadius: 14,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer",
                    fontFamily: "Sora, sans-serif",
                    letterSpacing: "-0.02em",
                    boxShadow: "0 14px 36px rgba(109,124,255,0.35)",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Start for free →
                </button>
                <a
                  href="#features"
                  className="ghost-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 24px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    color: C.text,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    fontFamily: "Sora, sans-serif",
                    textDecoration: "none",
                    letterSpacing: "-0.02em",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  See the system
                </a>
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
                <Stat label="Active tasks" value="12 live" accent />
                <Stat label="Plan" value="04" />
                <Stat label="Build" value="06" />
                <Stat label="Ship" value="02" />
              </div>
            </div>

            {/* Right: Preview */}
            <div className="hero-preview">
              <PreviewShell isMobile={isMobile} />
            </div>
          </div>

          {/* Ticker */}
          <Ticker />
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
        <section id="features" style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "60px 18px" : isTablet ? "72px 28px" : "88px 48px" }}>
          <Reveal>
            <SectionTitle
              eyebrow="What it changes"
              title="Designed for momentum"
              subtitle="The interface avoids the standard SaaS grid by mixing card depths, a calmer palette hierarchy, and intentional spatial rhythm."
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 14 }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
        <section id="how-it-works" style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "0 18px 60px" : isTablet ? "0 28px 72px" : "0 48px 88px" }}>
          <Reveal>
            <SectionTitle
              eyebrow="Workflow"
              title="Four steps, clear flow"
              subtitle="Laid out like a field guide, not a process brochure. Each step is a real action that creates momentum."
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14 }}>
            {STEPS.map(([num, title, text], i) => (
              <Reveal key={title} delay={i * 80}>
                <StepCard num={num} title={title} text={text} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ROLES ────────────────────────────────────────────────────────────── */}
        <section id="roles" style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "0 18px 60px" : isTablet ? "0 28px 72px" : "0 48px 88px" }}>
          <Reveal>
            <SectionTitle
              eyebrow="Access control"
              title="Roles & Permissions"
              subtitle="Two clear roles, visually separated so the hierarchy is obvious at a glance. Admins shape the space; members do the work."
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(2, 1fr)", gap: 18 }}>
            {ROLES.map((r, i) => (
              <Reveal key={r.role} delay={i * 100}>
                <RoleCard {...r} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "0 18px 72px" : isTablet ? "0 28px 84px" : "0 48px 100px" }}>
          <Reveal>
            <div
              style={{
                padding: isMobile ? "36px 24px" : "52px 48px",
                borderRadius: 28,
                background: "linear-gradient(135deg, rgba(109,124,255,0.16), rgba(45,212,191,0.09))",
                border: `1px solid rgba(109,124,255,0.2)`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow blobs inside CTA */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,124,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -60, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a7b8dc", marginBottom: 14, fontFamily: "DM Sans, sans-serif" }}>Built to feel human</div>
                <h2 style={{ fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(34px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.05em", color: C.text, marginBottom: 16, lineHeight: 1.05 }}>
                  Ready to get started?
                </h2>
                <p style={{ maxWidth: 560, margin: "0 auto 32px", color: C.muted, lineHeight: 1.75, fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 16 }}>
                  Join teams using TaskFlow for a cleaner task flow, deliberate interface, and a more human workspace experience.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                  <button
                    onClick={onGetStarted}
                    className="primary-btn"
                    style={{
                      padding: "14px 28px",
                      background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
                      border: "none",
                      borderRadius: 14,
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: "pointer",
                      fontFamily: "Sora, sans-serif",
                      letterSpacing: "-0.02em",
                      boxShadow: "0 14px 36px rgba(109,124,255,0.35)",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Get started for free →
                  </button>
                  <button
                    onClick={onLogin}
                    className="ghost-btn"
                    style={{
                      padding: "14px 28px",
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      color: C.text,
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                      fontFamily: "Sora, sans-serif",
                      letterSpacing: "-0.02em",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 28px 36px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6d7cff, #8d67ff)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>T</div>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, fontFamily: "Sora, sans-serif" }}>TaskFlow</span>
          </div>
          <div style={{ fontSize: 13, color: C.muted, fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>© 2026 TaskFlow. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
