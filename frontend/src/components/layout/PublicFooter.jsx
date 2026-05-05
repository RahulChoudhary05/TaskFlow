import React from "react";
import { COLORS } from "../common/theme.js";

export default function PublicFooter() {
  return (
    <footer style={styles.footer}>
      <div>© 2026 TaskFlow. All rights reserved.</div>
    </footer>
  );
}

const styles = {
  footer: {
    position: "relative",
    zIndex: 1,
    padding: "20px 28px 32px",
    textAlign: "center",
    color: COLORS.muted,
  },
};
