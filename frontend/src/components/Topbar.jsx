import React from "react";
import { Search, Bell } from "lucide-react";

export default function Topbar({ title, subtitle, role }) {
  const isAdmin = role === "admin";
  const name = isAdmin ? "Admin Sharma" : "Investigator Singh";
  const unit = isAdmin ? "System Administration" : "Cyber Cell, Unit 5";
  const initials = isAdmin ? "AS" : "IS";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 26px", borderBottom: "1px solid var(--line)" }}>
      <div>
        <h1 style={{ fontSize: 22, margin: 0, letterSpacing: "-.02em" }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0d1214", border: "1px solid var(--line)", borderRadius: 10, padding: "9px 13px", width: 220 }}>
          <Search size={13} color="var(--dim)" />
          <span style={{ fontSize: 12, color: "var(--dim)" }}>Search wallets, tx, cases...</span>
        </div>
        <div style={{ position: "relative" }}>
          <Bell size={17} color="var(--muted)" />
          <span style={{ position: "absolute", top: -5, right: -6, background: "var(--danger)", color: "#fff", fontSize: 8.5, fontWeight: 800, borderRadius: 99, padding: "1px 4px" }}>14</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: "linear-gradient(135deg,#b6ff00,#5ad1c9)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, color: "#081000" }}>{initials}</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.4 }}>
            <div style={{ fontWeight: 700 }}>{name}</div>
            <div style={{ color: "var(--dim)", fontSize: 10 }}>{unit}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
