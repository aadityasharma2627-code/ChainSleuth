import React from "react";
import { Settings } from "lucide-react";

export default function SettingsView({ toast, role }) {
  const isAdmin = role === "admin";
  const rows = isAdmin
    ? [["Full name", "Admin Sharma"], ["Unit", "System Administration"], ["Official email", "admin@cybercell.gov.in"], ["Role", "Admin"]]
    : [["Full name", "Investigator Singh"], ["Unit", "Chandigarh Cyber Cell, Unit 5"], ["Official email", "investigator@cybercell.gov.in"], ["Role", "Investigator"]];
  return (
    <div className="cx-fade-up" style={{ padding: 24, maxWidth: 480 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 22 }}>
        <div style={{ fontSize: 10, color: "var(--lime)", fontWeight: 800, letterSpacing: ".1em", marginBottom: 16 }}>{isAdmin ? "ADMIN PROFILE" : "INVESTIGATOR PROFILE"}</div>
        {rows.map(([label, val]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, color: "var(--muted)", marginBottom: 7 }}>{label.toUpperCase()}</label>
            <div style={{ background: "#0a0e10", border: "1px solid var(--line)", borderRadius: 10, padding: "11px 13px", fontSize: 13 }}>{val}</div>
          </div>
        ))}
        <button className="cx-btn cx-btn-primary" style={{ marginTop: 8 }} onClick={() => toast("Settings saved (demo — not persisted).")}>Save Changes</button>
      </div>
    </div>
  );
}
