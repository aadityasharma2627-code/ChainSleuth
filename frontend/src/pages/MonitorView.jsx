import React, { useState, useEffect } from "react";
import { ALERT_SEEDS } from "../data/mockData.js";

export default function MonitorView() {
  const [feed, setFeed] = useState(ALERT_SEEDS.map((a, i) => ({ ...a, id: i, time: "just now" })));
  useEffect(() => {
    let n = feed.length;
    const iv = window.setInterval(() => {
      const seed = ALERT_SEEDS[Math.floor(Math.random() * ALERT_SEEDS.length)];
      setFeed((f) => [{ ...seed, id: n++, time: "just now" }, ...f].slice(0, 12));
    }, 6000);
    return () => window.clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="cx-fade" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 12.5, color: "var(--lime)" }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--lime)", boxShadow: "0 0 0 4px rgba(182,255,0,.15)" }} />
        Live feed — updates automatically
      </div>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        {feed.map((a) => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="cx-badge" style={{ background: a.sev === "high" ? "rgba(255,92,103,.12)" : a.sev === "medium" ? "rgba(255,189,74,.12)" : "rgba(113,128,135,.15)", color: a.sev === "high" ? "var(--danger)" : a.sev === "medium" ? "var(--warning)" : "var(--dim)" }}>{a.sev.toUpperCase()}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{a.title}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}>{a.desc}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10.5, color: "var(--dim)", marginTop: 4 }}>{a.wallet}</div>
            </div>
            <span style={{ fontSize: 10.5, color: "var(--dim)", whiteSpace: "nowrap" }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
