import React, { useState } from "react";
import { Cpu, ArrowRight } from "lucide-react";
import { TRANSACTIONS } from "../data/mockData.js";
import AddrChip from "../components/AddrChip.jsx";

export default function TransactionsView() {
  const [selected, setSelected] = useState(TRANSACTIONS[0]);
  return (
    <div className="cx-scale" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 12 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 14 }}>Results</div>
        <div style={{ maxHeight: 460, overflowY: "auto" }} className="cx-scroll">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.hash} onClick={() => setSelected(tx)} style={{
              padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer",
              background: selected.hash === tx.hash ? "rgba(182,255,0,.05)" : "transparent",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--lime)" }}><AddrChip value={tx.hash} size={11.5} /></span>
                <span className="cx-badge" style={{ background: tx.risk > 60 ? "rgba(255,92,103,.12)" : "rgba(113,128,135,.15)", color: tx.risk > 60 ? "var(--danger)" : "var(--dim)" }}>{tx.risk}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{tx.value} · {tx.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--dim)" }}>TRANSACTION HASH</div>
            <div style={{ marginTop: 4 }}><AddrChip value={selected.hash} size={14} front={12} /></div>
          </div>
          <span className="cx-badge" style={{ background: selected.risk > 60 ? "rgba(255,92,103,.12)" : "rgba(182,255,0,.12)", color: selected.risk > 60 ? "var(--danger)" : "var(--lime)" }}>{selected.risk}/100 — {selected.risk > 60 ? "Elevated" : "Low"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#0a0e10", border: "1px solid var(--line)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
          <div><div style={{ fontSize: 9.5, color: "var(--dim)" }}>FROM</div><div style={{ marginTop: 3 }}><AddrChip value={selected.from} size={12} front={selected.from.length} back={0} /></div></div>
          <ArrowRight size={16} color="var(--lime)" />
          <div><div style={{ fontSize: 9.5, color: "var(--dim)" }}>TO</div><div style={{ marginTop: 3 }}><AddrChip value={selected.to} size={12} front={selected.to.length} back={0} /></div></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
          {[["Value", selected.value], ["Network Fee", selected.fee], ["Gas", selected.gas], ["Status", selected.status]].map(([k, v]) => (
            <div key={k} style={{ background: "#0a0e10", border: "1px solid var(--line)", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 9, color: "var(--dim)" }}>{k.toUpperCase()}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 5 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(182,255,0,.05)", border: "1px solid rgba(182,255,0,.2)", borderRadius: 12, padding: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--lime)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}><Cpu size={13} /> AI Risk Explanation</div>
          <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
            {selected.risk > 60 ? "This transaction is part of a rapid pass-through sequence linked to a higher-risk wallet cluster." : "No material risk indicators found for either counterparty at this time."}
          </div>
        </div>
      </div>
    </div>
  );
}
