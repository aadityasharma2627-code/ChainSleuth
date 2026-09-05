import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PATTERNS } from "../data/mockData.js";
import { riskColor } from "../utils/risk.js";
import WalletsView from "./WalletsView.jsx";
import TransactionsView from "./TransactionsView.jsx";
import GraphView from "./GraphView.jsx";
import AIView from "./AIView.jsx";

export default function CaseDetailView({ caseItem, onBack }) {
  const [tab, setTab] = useState("overview");
  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "wallets", label: "Wallet Explorer" },
    { id: "transactions", label: "Transaction Explorer" },
    { id: "graph", label: "Blockchain Graph" },
    { id: "ai", label: "AI Detection" },
  ];
  return (
    <div className="cx-fade-up" style={{ padding: 24 }}>
      <style>{`
        .cd-tabs{ display:flex; gap:6px; margin:18px 0 6px; border-bottom:1px solid var(--line); }
        .cd-tab{ background:none; border:0; padding:10px 14px; font-size:12.5px; color:var(--dim); cursor:pointer; border-bottom:2px solid transparent; }
        .cd-tab.active{ color:var(--lime); border-color:var(--lime); font-weight:700; }
      `}</style>
      <button className="lg-back" onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: 0, color: "var(--dim)", fontSize: 12, cursor: "pointer", marginBottom: 14 }}>
        <ChevronLeft size={14} /> Back to Cases
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--dim)", fontFamily: "monospace" }}>{caseItem.id}</div>
          <h2 style={{ fontSize: 20, margin: "4px 0 8px" }}>{caseItem.title}</h2>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{caseItem.officer} · Opened {caseItem.opened} · {caseItem.wallets} wallets tracked</div>
        </div>
        <span className="cx-badge" style={{ background: `${riskColor(caseItem.risk)}22`, color: riskColor(caseItem.risk), fontSize: 10.5, padding: "6px 12px" }}>{caseItem.status}</span>
      </div>

      <div className="cd-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`cd-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div style={{ marginTop: 4 }}>
        {tab === "overview" && (
          <div className="cx-fade" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 14 }}>
            {PATTERNS.slice(0, 3).map((p, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 18 }}>
                <span className="cx-badge" style={{ border: "1px solid rgba(182,255,0,.2)", color: "var(--lime)" }}>{p.badge}</span>
                <h3 style={{ fontSize: 14, margin: "12px 0 6px" }}>{p.title}</h3>
                <p style={{ fontSize: 11.5, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "wallets" && <div style={{ marginTop: 8 }}><WalletsView /></div>}
        {tab === "transactions" && <div style={{ marginTop: 8 }}><TransactionsView /></div>}
        {tab === "graph" && <div style={{ marginTop: 8 }}><GraphView /></div>}
        {tab === "ai" && <div style={{ marginTop: 8 }}><AIView /></div>}
      </div>
    </div>
  );
}
