import React from "react";
import { COLORS } from "../common/theme.js";
import useResponsive from "../../hooks/useResponsive.js";

export default function PublicHeader({ onLogin, onGetStarted }) {
  const { isMobile, isTablet } = useResponsive();
  const compact = isMobile || isTablet;

  return (
    <header style={{ ...styles.header, padding: compact ? "14px 14px" : styles.header.padding }}>
      <div style={styles.brandWrap}>
        <div style={styles.brandMark}>T</div>
        <div>
          <div style={{ ...styles.brand, fontSize: compact ? 18 : 20 }}>TaskFlow</div>
          {!isMobile && <div style={styles.brandSub}>Calm project coordination for modern teams</div>}
        </div>
      </div>

      <nav style={{ ...styles.nav, gap: compact ? 8 : 14 }} aria-label="Primary navigation">
        {!compact && <a href="#features" style={styles.navLink}>Features</a>}
        {!compact && <a href="#how-it-works" style={styles.navLink}>How It Works</a>}
        {!compact && <a href="#pricing" style={styles.navLink}>Pricing</a>}
        <button type="button" onClick={onLogin} style={{ ...styles.navGhostButton, padding: compact ? "8px 10px" : styles.navGhostButton.padding }}>Log in</button>
        <button type="button" onClick={onGetStarted} style={{ ...styles.navButton, padding: compact ? "8px 12px" : styles.navButton.padding }}>Get started</button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "18px 28px",
    backdropFilter: "blur(18px)",
    background: "rgba(7,11,20,0.55)",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  brandWrap: { display: "flex", alignItems: "center", gap: 14 },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
    boxShadow: "0 14px 30px rgba(109,124,255,0.25)",
  },
  brand: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: COLORS.text },
  brandSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  nav: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: 14 },
  navLink: { color: COLORS.muted, textDecoration: "none", fontSize: 14, fontWeight: 500 },
  navGhostButton: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.text,
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },
  navButton: {
    background: "linear-gradient(135deg, #6d7cff, #8d67ff)",
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 12px 30px rgba(109,124,255,0.24)",
  },
};
