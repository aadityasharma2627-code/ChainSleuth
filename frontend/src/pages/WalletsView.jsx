import React, { useState } from "react";
import { WALLETS } from "../data/mockData.js";
import { riskColor, riskLabel } from "../utils/risk.js";
import AddrChip from "../components/AddrChip.jsx";

export default function WalletsView() {
  const [wallets, setWallets] = useState(WALLETS);
  const [selected, setSelected] = useState(WALLETS[0]);
  const [query, setQuery] = useState("");

  const addWallet = () => {
    const addr = query.trim();
    if (!addr) return;
    const existing = wallets.find((w) => w.addr.toLowerCase() === addr.toLowerCase());
    if (existing) { setSelected(existing); return; }
    const fresh = {
      addr, chain: addr.startsWith("bc1") ? "Bitcoin" : "Ethereum",
      risk: "low", score: Math.floor(Math.random() * 30) + 5,
      lastActivity: "just added", txCount: Math.floor(Math.random() * 10) + 1,
    };
    setWallets((w) => [fresh, ...w]);
    setSelected(fresh);
    setQuery("");
  };

  const filtered = query.trim() ? wallets.filter((w) => w.addr.toLowerCase().includes(query.trim().toLowerCase())) : wallets;

  return (
    <div className="cx-fade-up" style={{ padding: 24, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
      <style>{`
        .wv-row{ display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:10px; align-items:center; padding:13px 16px; border-bottom:1px solid rgba(255,255,255,.05); cursor:pointer; font-size:12px; }
        .wv-row:hover{ background:rgba(255,255,255,.02); }
        .wv-row.active{ background:rgba(182,255,0,.05); }
        .wv-addr{ font-family:monospace; font-size:11.5px; }
        .wv-search{ display:flex; gap:8px; padding:14px 16px; border-bottom:1px solid var(--line); }
        .wv-search input{ flex:1; background:#080b0d; border:1px solid var(--line); border-radius:9px; padding:10px 12px; color:#fff; font-size:12.5px; outline:none; font-family:monospace; }
        .wv-search input:focus{ border-color:rgba(182,255,0,.5); }
      `}</style>
      <div className="dv-panel" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 14 }}>Tracked Wallets</div>
        <div className="wv-search">
          <input
            placeholder="Enter wallet address to search or start tracking..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWallet()}
          />
          <button className="cx-btn cx-btn-primary" style={{ padding: "10px 16px", fontSize: 12, whiteSpace: "nowrap" }} onClick={addWallet}>Track Wallet</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, padding: "10px 16px", fontSize: 10, color: "var(--dim)", letterSpacing: ".05em" }}>
          <span>ADDRESS</span><span>CHAIN</span><span>RISK</span><span>LAST SEEN</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto" }} className="cx-scroll">
          {filtered.length === 0 && <div style={{ padding: 20, fontSize: 12, color: "var(--dim)" }}>No tracked wallet matches — press Enter or "Track Wallet" to add it.</div>}
          {filtered.map((w) => (
            <div className={`wv-row ${selected.addr === w.addr ? "active" : ""}`} key={w.addr} onClick={() => setSelected(w)}>
              <span className="wv-addr"><AddrChip value={w.addr} size={11.5} /></span>
              <span style={{ color: "var(--muted)" }}>{w.chain}</span>
              <span className="cx-badge" style={{ background: `${riskColor(w.risk)}22`, color: riskColor(w.risk), width: "fit-content" }}>{riskLabel(w.risk)}</span>
              <span style={{ color: "var(--dim)" }}>{w.lastActivity}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dv-panel" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 10, color: "var(--lime)", fontWeight: 800, letterSpacing: ".1em", marginBottom: 10 }}>WALLET DETAIL</div>
        <div style={{ marginBottom: 18 }}><AddrChip value={selected.addr} size={14} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: `conic-gradient(${riskColor(selected.risk)} 0 ${selected.score}%, #20282b ${selected.score}% 100%)`, display: "grid", placeItems: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--card)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 17 }}>{selected.score}</div>
          </div>
          <div>
            <div style={{ color: riskColor(selected.risk), fontWeight: 800, fontSize: 13 }}>{riskLabel(selected.risk)} RISK</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 3 }}>{selected.chain} · {selected.txCount} transactions</div>
          </div>
        </div>
        <button className="cx-btn cx-btn-primary" style={{ width: "100%" }}>Open Full Investigation →</button>
      </div>
    </div>
  );
}
