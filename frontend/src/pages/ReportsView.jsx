import React from "react";
import { FileText, Download } from "lucide-react";
import { REPORTS } from "../data/mockData.js";

export default function ReportsView({ toast }) {
  return (
    <div className="cx-fade-up" style={{ padding: 24 }}>
      <button className="cx-btn cx-btn-primary" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }} onClick={() => toast("Report generation started — this is a demo action.")}>
        <FileText size={14} /> Generate New Report
      </button>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        {REPORTS.map((r) => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{r.title}</div>
              <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{r.case} · {r.pages} pages · Generated {r.generated}</div>
            </div>
            <button className="cx-btn cx-btn-secondary" style={{ display: "flex", alignItems: "center", gap: 7 }} onClick={() => toast(`Downloading ${r.id}.pdf (demo)`)}>
              <Download size={13} /> Export PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
