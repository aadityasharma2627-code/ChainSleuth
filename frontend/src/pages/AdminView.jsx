import React from "react";
import { USERS_SEED } from "../data/mockData.js";

export default function AdminView({ toast }) {
  return (
    <div className="cx-fade-up" style={{ padding: 24 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 14 }}>User Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 10, padding: "10px 18px", fontSize: 10, color: "var(--dim)", letterSpacing: ".05em" }}>
          <span>NAME</span><span>UNIT</span><span>ROLE</span><span>STATUS</span>
        </div>
        {USERS_SEED.map((u, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 10, alignItems: "center", padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 12.5 }}>
            <span style={{ fontWeight: 600 }}>{u.name}</span>
            <span style={{ color: "var(--muted)" }}>{u.unit}</span>
            <span style={{ color: u.role === "Admin" ? "var(--lime)" : "var(--muted)" }}>{u.role}</span>
            <span className="cx-badge" style={{ background: u.status === "Active" ? "rgba(182,255,0,.12)" : "rgba(113,128,135,.15)", color: u.status === "Active" ? "var(--lime)" : "var(--dim)", width: "fit-content" }}>{u.status}</span>
          </div>
        ))}
      </div>
      <button className="cx-btn cx-btn-secondary" style={{ marginTop: 14 }} onClick={() => toast("Invite sent (demo action).")}>+ Invite Investigator</button>
    </div>
  );
}
