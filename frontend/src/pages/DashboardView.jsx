import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_DATA, STATS, ALERT_SEEDS } from "../data/mockData.js";

export default function DashboardView() {
  return (
    <div className="cx-fade-up" style={{ padding: 24 }}>
      <style>{`
        .dv-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
        .dv-stat{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px; }
        .dv-stat .row{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
        .dv-stat .ic{ width:30px;height:30px;border-radius:8px;background:rgba(182,255,0,.1); display:grid; place-items:center; }
        .dv-stat strong{ font-size:24px; display:block; }
        .dv-stat em{ font-style:normal; font-size:10.5px; color:var(--lime); }
        .dv-grid{ display:grid; grid-template-columns:1.5fr 1fr; gap:12px; }
        .dv-panel{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px; }
        .dv-panel h3{ font-size:14px; margin:0 0 14px; }
        .dv-alert{ display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:11.5px; }
        .dv-alert:last-child{ border:0; }
        @media(max-width:900px){ .dv-stats{grid-template-columns:repeat(2,1fr)} .dv-grid{grid-template-columns:1fr} }
      `}</style>

      <div className="dv-stats">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div className="dv-stat" key={i}>
              <div className="row"><span style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.label}</span><span className="ic"><Icon size={14} color="var(--lime)" /></span></div>
              <strong>{s.value}</strong>
              <em>{s.note}</em>
            </div>
          );
        })}
      </div>

      <div className="dv-grid">
        <div className="dv-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Capital Tracing Velocity</h3>
            <span style={{ fontSize: 10.5, color: "var(--dim)" }}>₹ Crores traced per month</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={CHART_DATA}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
              <XAxis dataKey="month" stroke="#626c70" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#626c70" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#141a1c", border: "1px solid #263252", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="crores" stroke="#b6ff00" strokeWidth={2.5} dot={{ r: 3, fill: "#b6ff00" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="dv-panel">
          <h3>Recent High-Risk Alerts</h3>
          {ALERT_SEEDS.map((a, i) => (
            <div className="dv-alert" key={i}>
              <div>
                <div style={{ fontFamily: "monospace", color: "var(--text)" }}>{a.wallet}</div>
                <div style={{ color: "var(--dim)", marginTop: 2 }}>{a.title}</div>
              </div>
              <span className="cx-badge" style={{ background: a.sev === "high" ? "rgba(255,92,103,.12)" : "rgba(255,189,74,.12)", color: a.sev === "high" ? "var(--danger)" : "var(--warning)" }}>{a.sev.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
