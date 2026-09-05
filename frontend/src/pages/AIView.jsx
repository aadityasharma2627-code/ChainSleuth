import React from "react";
import { PATTERNS } from "../data/mockData.js";

export default function AIView() {
  return (
    <div className="cx-fade-up" style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
      {PATTERNS.map((p, i) => (
        <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 18, position: "relative", minHeight: 150 }}>
          <span className="cx-badge" style={{ border: "1px solid rgba(182,255,0,.2)", color: "var(--lime)" }}>{p.badge}</span>
          <h3 style={{ fontSize: 14.5, margin: "14px 0 7px" }}>{p.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 11.5, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
          <div style={{ position: "absolute", bottom: 16, fontSize: 10, color: "var(--dim)" }}>RISK CONTRIBUTION <b style={{ color: "#fff" }}>{p.contribution}</b></div>
        </div>
      ))}
    </div>
  );
}
