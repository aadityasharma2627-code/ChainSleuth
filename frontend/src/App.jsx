import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Shield, LayoutDashboard, Briefcase, Search, ArrowLeftRight, Share2, Cpu,
  Activity, FileText, Settings, Bell, ChevronLeft, ChevronRight, Play, ArrowRight,
  ShieldAlert, CircleAlert, Lock, Mail, LogOut, Download, Clock, Users, UserCog,
  Copy, Check,
} from "lucide-react";

import "./LandingPage.css";

// Shortens a long address/hash to "0x742d...f44e" style. Anything already short is left alone.
function truncAddr(addr, front = 6, back = 4) {
  if (!addr) return "";
  return addr.length > front + back + 3 ? `${addr.slice(0, front)}...${addr.slice(-back)}` : addr;
}

// Truncated address/hash + a click-to-copy button.
function AddrChip({ value, front = 6, back = 4, mono = true, size = 12 }) {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: mono ? "monospace" : "inherit", fontSize: size }}>
      {truncAddr(value, front, back)}
      <button onClick={copy} title="Copy full address" style={{
        background: "none", border: 0, padding: 2, cursor: "pointer", display: "inline-flex",
        color: copied ? "var(--lime)" : "var(--dim)", flexShrink: 0,
      }}>
        {copied ? <Check size={size + 1} /> : <Copy size={size} />}
      </button>
    </span>
  );
}

// =============================================================================
// SAMPLE / FAKE DATA
// =============================================================================

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "cases", label: "Cases", icon: Briefcase },
  { id: "wallets", label: "Wallet Explorer", icon: Search },
  { id: "transactions", label: "Transaction Explorer", icon: ArrowLeftRight },
  { id: "graph", label: "Blockchain Graph", icon: Share2 },
  { id: "ai", label: "AI Detection", icon: Cpu },
  { id: "monitor", label: "Realtime Monitor", icon: Activity },
  { id: "reports", label: "Court Reports", icon: FileText },
  { id: "admin", label: "Admin Panel", icon: UserCog, adminOnly: true },
  { id: "settings", label: "Settings", icon: Settings },
];

const USERS_SEED = [
  { name: "Investigator Singh", unit: "Cyber Cell, Unit 5", role: "Investigator", status: "Active" },
  { name: "SI M. Verma", unit: "Cyber Cell, Unit 2", role: "Investigator", status: "Active" },
  { name: "Insp. A. Kaur", unit: "Cyber Cell, Unit 1", role: "Investigator", status: "Active" },
  { name: "ASI P. Rana", unit: "Cyber Cell, Unit 5", role: "Investigator", status: "Inactive" },
  { name: "Admin Sharma", unit: "System Administration", role: "Admin", status: "Active" },
];

const CHART_DATA = [
  { month: "Jan", crores: 1.2 }, { month: "Feb", crores: 1.8 }, { month: "Mar", crores: 1.5 },
  { month: "Apr", crores: 2.6 }, { month: "May", crores: 3.1 }, { month: "Jun", crores: 2.9 },
  { month: "Jul", crores: 4.2 },
];

const STATS = [
  { label: "Total Investigations", value: "34", note: "+12% this month", icon: Briefcase },
  { label: "High Risk Wallets", value: "9", note: "3 flagged today", icon: ShieldAlert },
  { label: "Tracked Entities", value: "212", note: "Clusters verified", icon: Users },
  { label: "Active Alerts", value: "14", note: "Requires review", icon: Bell },
];

const CASES = [
  { id: "CASE-2026011", title: "Cross-Border Layering Probe #10", officer: "ASI P. Rana", opened: "2026-01-01", status: "Open", risk: "high", wallets: 6 },
  { id: "CASE-2026012", title: "Terror Financing Inquiry #11", officer: "Insp. R. Sharma", opened: "2026-01-01", status: "Open", risk: "high", wallets: 4 },
  { id: "CASE-2026013", title: "Investment Scam Cluster #12", officer: "Insp. A. Kaur", opened: "2026-01-01", status: "Open", risk: "medium", wallets: 8 },
  { id: "CASE-2026014", title: "Operation Chandigarh Secure #13", officer: "SI M. Verma", opened: "2026-01-01", status: "Low", risk: "low", wallets: 2 },
  { id: "CASE-2026015", title: "Darknet Vendor Takedown #14", officer: "SI N. Chauhan", opened: "2026-01-01", status: "Low", risk: "medium", wallets: 5 },
  { id: "CASE-2026016", title: "Ransomware Payout Trace #15", officer: "ASI P. Rana", opened: "2026-01-01", status: "Low", risk: "high", wallets: 7 },
  { id: "CASE-2026017", title: "Cross-Border Layering Probe #16", officer: "Insp. R. Sharma", opened: "2026-01-01", status: "Open", risk: "medium", wallets: 3 },
  { id: "CASE-2026018", title: "Terror Financing Inquiry #17", officer: "Insp. A. Kaur", opened: "2026-01-01", status: "Open", risk: "high", wallets: 9 },
  { id: "CASE-2026019", title: "Investment Scam Cluster #18", officer: "SI M. Verma", opened: "2026-01-01", status: "Open", risk: "low", wallets: 1 },
];

const WALLETS = [
  { addr: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", chain: "Ethereum", risk: "high", score: 87, lastActivity: "2h ago", txCount: 247 },
  { addr: "0x19a3f8b12c9e5d0a3f8b1c4e5d6a7b8c9d0e1f2a", chain: "Ethereum", risk: "low", score: 22, lastActivity: "1d ago", txCount: 12 },
  { addr: "0x5fe2119a8b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e", chain: "Ethereum", risk: "high", score: 74, lastActivity: "5h ago", txCount: 58 },
  { addr: "bc1qbfa550f2a8c1d4e5f6a7b8c9d0e1f2a3b4c5d", chain: "Bitcoin", risk: "medium", score: 56, lastActivity: "3h ago", txCount: 9 },
  { addr: "bc1q3a3ea0f8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d", chain: "Bitcoin", risk: "low", score: 18, lastActivity: "2d ago", txCount: 6 },
  { addr: "0xf08d91cc3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d", chain: "Ethereum", risk: "high", score: 96, lastActivity: "40m ago", txCount: 63 },
  { addr: "bc1qaa6100a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", chain: "Bitcoin", risk: "medium", score: 61, lastActivity: "6h ago", txCount: 14 },
];

const TRANSACTIONS = [
  { hash: "0x3c6eb4a1f2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7...84d4", from: "0xcd2da8...645a", to: "0xbdb660...9b92", value: "12.4 ETH", fee: "0.002 ETH", gas: "21,000", status: "Confirmed", date: "2026-01-01 00:00", risk: 12 },
  { hash: "0x3c8da3f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7...9ded", from: "0x19a3f8...8bc2", to: "0x5fe211...119a", value: "39,800 USDT", fee: "0.004 ETH", gas: "45,000", status: "Confirmed", date: "2026-01-01 00:00", risk: 61 },
  { hash: "0x3cac92b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7...3706", from: "0x5fe211...119a", to: "0xa817d9...d921", value: "19,500 USDT", fee: "0.003 ETH", gas: "38,000", status: "Confirmed", date: "2026-01-01 00:00", risk: 58 },
  { hash: "0x3ccb81a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8...d01f", from: "bc1qbfa5...834ab", to: "bc1q3a3e...f0ee", value: "0.42 BTC", fee: "0.0001 BTC", gas: "—", status: "Confirmed", date: "2026-01-01 00:00", risk: 34 },
  { hash: "0x3cea70b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9...6938", from: "0xb20cee...7370", to: "0xf08d91...91cc", value: "0.8 ETH", fee: "0.002 ETH", gas: "21,000", status: "Confirmed", date: "2026-01-01 00:00", risk: 89 },
  { hash: "0x3d095fc4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0...8251", from: "0x91de20...20ac", to: "0x40bc77...77a1", value: "0.05 ETH", fee: "0.001 ETH", gas: "21,000", status: "Confirmed", date: "2026-01-01 00:00", risk: 9 },
];

const PATTERNS = [
  { badge: "DETECTED", title: "Fund Splitting", desc: "Funds divided across multiple intermediary wallets in a short period.", contribution: "+24" },
  { badge: "DETECTED", title: "Rapid Pass-Through", desc: "Funds moved through multiple wallets within an unusually short interval.", contribution: "+31" },
  { badge: "POSSIBLE", title: "Peel Chain", desc: "Repeated intermediary transfers where amounts gradually separate from the original flow.", contribution: "+18" },
  { badge: "DETECTED", title: "Flagged Connection", desc: "Direct or indirect connection to an address present on a public flagged-address list.", contribution: "+14" },
  { badge: "POSSIBLE", title: "Mixer Interaction", desc: "Transaction routed through a contract associated with coin-mixing services.", contribution: "+9" },
  { badge: "DETECTED", title: "High-Velocity Inflow", desc: "Wallet received an unusually high number of deposits within a 24-hour window.", contribution: "+21" },
];

const ALERT_SEEDS = [
  { sev: "high", title: "Multiple intermediary wallets", desc: "A chain of 7 wallets was detected between the source and destination.", wallet: "0xf08d91...91cc" },
  { sev: "medium", title: "Unusual transaction frequency", desc: "Transaction volume increased sharply during a 13-minute interval.", wallet: "0xb20cee...ee73" },
  { sev: "high", title: "Flagged wallet connection", desc: "An indirect connection to a known flagged address was identified.", wallet: "0x5fe211...119a" },
  { sev: "low", title: "New wallet activity", desc: "First outbound transaction observed from a newly created wallet.", wallet: "0x91de20...20ac" },
];

const GRAPH_NODES = [
  { id: "A", label: "0x742d…f44e", risk: "high", x: 0.5, y: 0.5, score: 87, txCount: 247, linked: 34, patterns: ["Fund Splitting", "Rapid Pass-Through"] },
  { id: "B", label: "0x19a3…8bc2", risk: "normal", x: 0.28, y: 0.3, score: 22, txCount: 12, linked: 5, patterns: [] },
  { id: "C", label: "0x5fe2…119a", risk: "high", x: 0.7, y: 0.26, score: 74, txCount: 58, linked: 11, patterns: ["Rapid Pass-Through"] },
  { id: "D", label: "0xa817…d921", risk: "suspicious", x: 0.85, y: 0.52, score: 56, txCount: 9, linked: 4, patterns: ["Peel Chain"] },
  { id: "E", label: "0xb20c…ee73", risk: "suspicious", x: 0.63, y: 0.76, score: 61, txCount: 14, linked: 6, patterns: ["Fund Splitting"] },
  { id: "F", label: "0x91de…20ac", risk: "normal", x: 0.3, y: 0.7, score: 18, txCount: 6, linked: 3, patterns: [] },
  { id: "G", label: "0x40bc…77a1", risk: "normal", x: 0.1, y: 0.55, score: 15, txCount: 4, linked: 2, patterns: [] },
  { id: "H", label: "0xf08d…91cc", risk: "flagged", x: 0.92, y: 0.8, score: 96, txCount: 63, linked: 19, patterns: ["Flagged Connection", "Peel Chain"] },
];
const GRAPH_LINKS = [["A","B"],["A","C"],["B","F"],["B","G"],["C","D"],["C","E"],["D","H"],["E","H"],["F","G"]];

const REPORTS = [
  { id: "RPT-0142", case: "CS-2026-0142", title: "High-risk transaction cluster — evidence summary", pages: 18, generated: "2026-01-02" },
  { id: "RPT-0139", case: "CS-2026-0139", title: "Cross-border layering probe — wallet linkage report", pages: 24, generated: "2025-12-29" },
  { id: "RPT-0131", case: "CS-2026-0131", title: "Investment scam cluster — fund flow reconstruction", pages: 11, generated: "2025-12-20" },
];

const riskColor = (risk) => (risk === "high" || risk === "flagged" ? "#b6ff00" : risk === "suspicious" || risk === "medium" ? "#ffbd4a" : "#718087");
const riskLabel = (risk) => (risk === "high" || risk === "flagged" ? "HIGH" : risk === "suspicious" || risk === "medium" ? "MEDIUM" : "LOW");

// =============================================================================
// SHARED STYLE
// =============================================================================
const STYLE = `
  .cx-root{ --bg:#070a0c; --card:#0f1416; --card2:#151b1e; --lime:#b6ff00; --text:#f2f5f3;
    --muted:#8c969a; --dim:#626c70; --line:rgba(255,255,255,.08); --danger:#ff5c67; --warning:#ffbd4a;
    background:var(--bg); color:var(--text); font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;
    border-radius:20px; border:1px solid var(--line); overflow:hidden; min-height:640px; position:relative; }
  .cx-root *{ box-sizing:border-box; }
  .cx-btn{ border:0;border-radius:10px;padding:12px 18px;font-weight:800;font-size:13px;cursor:pointer; }
  .cx-btn-primary{ background:var(--lime); color:#081000; }
  .cx-btn-secondary{ background:rgba(255,255,255,.06); color:#fff; border:1px solid var(--line); }
  .cx-fade-up{ animation:cxFadeUp .4s ease; }
  .cx-fade{ animation:cxFade .35s ease; }
  .cx-scale{ animation:cxScale .35s ease; }
  @keyframes cxFadeUp{ from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
  @keyframes cxFade{ from{opacity:0} to{opacity:1} }
  @keyframes cxScale{ from{opacity:0;transform:scale(.97)} to{opacity:1;transform:none} }
  @keyframes cxSpin{ to{transform:rotate(360deg)} }
  .cx-spinner{ width:16px;height:16px;border:2px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:cxSpin .7s linear infinite;display:inline-block; }
  .cx-spinner.dark{ border:2px solid rgba(0,0,0,.2); border-top-color:#071000; }
  .cx-badge{ font-size:9px; font-weight:900; letter-spacing:.08em; padding:4px 8px; border-radius:6px; display:inline-block; }
  .cx-scroll::-webkit-scrollbar{ width:8px; } .cx-scroll::-webkit-scrollbar-thumb{ background:#232a2d; border-radius:8px; }
`;

// =============================================================================
// HTML CONTENT FOR FULL SCROLLABLE LANDING PAGE
// =============================================================================
const LANDING_HTML = `
<div class="grid-bg"></div>
<nav class="nav" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
        <a href="#" class="nav-logo" aria-label="ChainSleuth Home">
            <div class="nav-logo-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
            ChainSleuth
        </a>
        <ul class="nav-links">
            <li><a href="#investigate">Investigate</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#tech">Technology</a></li>
        </ul>
        <div class="nav-right">
            <div class="status-badge"><span class="status-dot"></span>LIVE</div>
            <button id="login-btn" class="btn btn-secondary btn-sm" style="border-radius: 8px; font-family: inherit;">Login Portal &rarr;</button>
        </div>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero" id="hero">
    <div class="hero-bg-text">FORENSICS</div>
    <div class="container">
        <div class="hero-inner">
            <div class="hero-content">
                <div class="hero-eyebrow">Blockchain Forensics / Intelligence Platform</div>
                <h1 class="hero-title">Trace the <span class="highlight">money</span>.<br>Expose the <span class="highlight">pattern</span>.</h1>
                <p class="hero-desc">Investigate cryptocurrency transactions, uncover suspicious wallet relationships, and identify potential laundering patterns through transparent blockchain intelligence.</p>
                <div class="hero-buttons">
                    <button id="launch-btn" class="btn btn-primary" style="font-family: inherit;">Launch Dashboard <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
                    <button class="btn btn-secondary" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})" style="font-family: inherit;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg> Learn More</button>
                </div>
                <div class="hero-trust">
                    <div class="trust-item"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B6FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg><strong>LIVE BLOCKCHAIN DATA</strong></div>
                    <div class="trust-item"><span>Etherscan / Ethereum</span></div>
                    <div class="trust-item"><span>Blockchain.info / Bitcoin</span></div>
                </div>
            </div>
            <div class="hero-visual">
                <svg class="network-graph" id="heroGraph" viewBox="0 0 500 500"></svg>
                <div class="floating-card fc-risk">
                    <div class="floating-card-label">Risk Score</div>
                    <div class="floating-card-value">87 / 100</div>
                </div>
                <div class="floating-card fc-pattern">
                    <div class="floating-card-label">Suspicious Pattern</div>
                    <div class="floating-card-value" style="font-size:0.875rem;">Rapid Pass-Through</div>
                </div>
                <div class="floating-card fc-linked">
                    <div class="floating-card-label">Linked Wallets</div>
                    <div class="floating-card-value">14</div>
                </div>
                <div class="floating-card fc-tx">
                    <div class="floating-card-label">Transactions</div>
                    <div class="floating-card-value">247</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Investigation Input -->
<section class="investigate-section" id="investigate">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Start an Investigation</h2>
            <p class="section-subtitle">Enter a wallet address to begin tracing transaction flows and detecting suspicious patterns.</p>
        </div>
        <div class="investigate-box">
            <div class="input-group">
                <label class="input-label" for="walletInput">Enter wallet address</label>
                <input type="text" class="input-field" id="walletInput" placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e" aria-label="Wallet address input">
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label class="input-label" for="blockchainSelect">Blockchain</label>
                    <select class="select-field" id="blockchainSelect" aria-label="Select blockchain">
                        <option value="ethereum">Ethereum</option>
                        <option value="bitcoin">Bitcoin</option>
                    </select>
                </div>
                <div class="input-group">
                    <label class="input-label" for="modeSelect">Investigation Mode</label>
                    <select class="select-field" id="modeSelect" aria-label="Select investigation mode">
                        <option value="full">Full Analysis</option>
                        <option value="flow">Transaction Flow</option>
                        <option value="risk">Risk Analysis</option>
                    </select>
                </div>
            </div>
            <div class="investigate-actions">
                <button class="btn btn-primary" id="analyzeBtn" style="font-family: inherit;">Analyze Wallet <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
                <button class="demo-btn" id="loadDemoBtn" style="font-family: inherit;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Load Demo Investigation</button>
            </div>
        </div>
    </div>
</section>

<!-- Why ChainSleuth -->
<section class="why-section" id="about">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Why ChainSleuth?</h2>
            <p class="section-subtitle">Blockchain data is public. Investigation shouldn't be complicated.</p>
        </div>
        <p style="text-align:center;color:var(--text-secondary);max-width:700px;margin:0 auto 3rem;line-height:1.7;">Blockchain transactions are publicly visible, but manually tracing funds across multiple wallets is slow and technically difficult. ChainSleuth transforms raw transaction data into actionable intelligence.</p>
        <div class="why-grid">
            <div class="why-card">
                <div class="why-number">01</div>
                <h3 class="why-card-title">Trace</h3>
                <p class="why-card-desc">Follow funds across connected wallets with an interactive visual graph. See exactly where money moved, when, and through which intermediaries.</p>
            </div>
            <div class="why-card">
                <div class="why-number">02</div>
                <h3 class="why-card-title">Detect</h3>
                <p class="why-card-desc">Identify suspicious transaction patterns automatically — fund splitting, rapid pass-throughs, peel chains, and connections to flagged addresses.</p>
            </div>
            <div class="why-card">
                <div class="why-number">03</div>
                <h3 class="why-card-title">Prioritize</h3>
                <p class="why-card-desc">Get a transparent, explainable risk score that helps investigators focus on the most suspicious leads first. No black boxes.</p>
            </div>
        </div>
    </div>
</section>

<!-- How It Works -->
<section class="how-section" id="how">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">How It Works</h2>
            <p class="section-subtitle">From wallet address to investigative lead in four steps.</p>
        </div>
        <div class="steps">
            <div class="step">
                <div class="step-number">01</div>
                <h3 class="step-title">Submit</h3>
                <p class="step-desc">Enter a suspicious wallet address and select your investigation parameters.</p>
            </div>
            <div class="step">
                <div class="step-number">02</div>
                <h3 class="step-title">Collect</h3>
                <p class="step-desc">Retrieve public blockchain transaction data from Etherscan or Blockchain.info APIs.</p>
            </div>
            <div class="step">
                <div class="step-number">03</div>
                <h3 class="step-title">Analyze</h3>
                <p class="step-desc">Detect suspicious wallet relationships, patterns, and anomalies using rule-based analytics.</p>
            </div>
            <div class="step">
                <div class="step-number">04</div>
                <h3 class="step-title">Investigate</h3>
                <p class="step-desc">Explore the visual graph and prioritized findings with full transparency and explainability.</p>
            </div>
        </div>
    </div>
</section>

<!-- Technology -->
<section class="tech-section" id="tech">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Built for Blockchain Investigation</h2>
            <p class="section-subtitle">A transparent, modular technology stack designed for forensic workflows.</p>
        </div>
        <div class="tech-grid">
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg></div>
                <div><div class="tech-name">Etherscan API</div><div class="tech-desc">Ethereum transaction data</div></div>
            </div>
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.192-6.897m-1.192 6.897L12.5 21.5m-1.225-2.411c-4.924.868-6.14-6.025-1.192-6.897m1.192 6.897L11.5 21.5m1.225-2.411c4.924.868 6.14-6.025 1.192-6.897m-1.192 6.897L12.5 21.5"/><path d="M15.5 11.5c.466.751.593 1.677.296 2.548-.297.87-1.01 1.547-1.87 1.79"/><path d="M8.5 11.5c-.466.751-.593 1.677-.296 2.548.297.87 1.01 1.547 1.87 1.79"/></svg></div>
                <div><div class="tech-name">Blockchain.info API</div><div class="tech-desc">Bitcoin transaction data</div></div>
            </div>
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg></div>
                <div><div class="tech-name">Neo4j</div><div class="tech-desc">Wallet relationship graph</div></div>
            </div>
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg></div>
                <div><div class="tech-name">Python</div><div class="tech-desc">Pattern detection and analytics</div></div>
            </div>
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
                <div><div class="tech-name">React</div><div class="tech-desc">Investigator interface</div></div>
            </div>
            <div class="tech-card">
                <div class="tech-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
                <div><div class="tech-name">D3.js / React Flow</div><div class="tech-desc">Transaction visualization</div></div>
            </div>
        </div>
    </div>
</section>

<!-- Disclaimer -->
<section class="disclaimer">
    <div class="container">
        <div class="disclaimer-box">
            <div class="disclaimer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
            <p class="disclaimer-text"><strong>Important:</strong> ChainSleuth identifies suspicious patterns in publicly available blockchain data. It does not make legal determinations or accusations. All findings should be reviewed by a qualified human investigator. Risk scores represent detected pattern correlations, not proof of criminal activity.</p>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-brand">
                <a href="#" class="footer-logo">
                    <div class="nav-logo-icon" style="width:28px;height:28px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
                    ChainSleuth
                </a>
                <p class="footer-tagline">Blockchain intelligence for modern investigations. Trace the money. Expose the pattern.</p>
            </div>
            <div>
                <h4 class="footer-col-title">Product</h4>
                <ul class="footer-links">
                    <li><a href="#" id="footer-investigate">Investigate</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div>
                <h4 class="footer-col-title">Resources</h4>
                <ul class="footer-links">
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">API Reference</a></li>
                </ul>
            </div>
            <div>
                <h4 class="footer-col-title">Company</h4>
                <ul class="footer-links">
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-copyright">© 2026 ChainSleuth. All rights reserved. Demo prototype for hackathon presentation.</p>
            <div class="footer-status"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> System Status: Operational</div>
        </div>
    </div>
</footer>
`;

// =============================================================================
// LANDING PAGE (Fully scrollable HTML embedded securely in React)
// =============================================================================
function Landing({ onLaunch }) {
  useEffect(() => {
    // 1. Hook up all "Login" and "Launch" buttons inside the HTML string to React's state
    const actionBtns = ['login-btn', 'launch-btn', 'analyzeBtn', 'loadDemoBtn', 'footer-investigate'];
    const handleLaunch = (e) => { 
      e.preventDefault(); 
      onLaunch(); 
    };
    
    actionBtns.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', handleLaunch);
    });

    // 2. Setup Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) navbar?.classList.add('scrolled');
        else navbar?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Render the exact D3 graph animation from your HTML file
    const svg = d3.select('#heroGraph');
    if (!svg.empty()) {
        svg.selectAll('*').remove();
        svg.attr('viewBox', '0 0 500 500');

        const heroNodes = [
            { id: 'A', x: 150, y: 100, type: 'target' },
            { id: 'B', x: 350, y: 150, type: 'suspicious' },
            { id: 'C', x: 250, y: 250, type: 'suspicious' },
            { id: 'D', x: 120, y: 350, type: 'normal' },
            { id: 'E', x: 380, y: 350, type: 'flagged' }
        ];
        const heroLinks = [
            { source: 'A', target: 'B' },
            { source: 'B', target: 'C' },
            { source: 'C', target: 'D' },
            { source: 'C', target: 'E' }
        ];

        // Draw Links
        const links = svg.selectAll('.hero-link')
            .data(heroLinks)
            .enter()
            .append('line')
            .attr('class', 'hero-link')
            .attr('x1', d => heroNodes.find(n => n.id === d.source).x)
            .attr('y1', d => heroNodes.find(n => n.id === d.source).y)
            .attr('x2', d => heroNodes.find(n => n.id === d.target).x)
            .attr('y2', d => heroNodes.find(n => n.id === d.target).y)
            .attr('stroke', '#B6FF00')
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-dasharray', '5,5');

        // Animate Links
        function animateLinks() {
            links.transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attrTween('stroke-dashoffset', function() {
                    return d3.interpolate(20, 0);
                })
                .on('end', animateLinks);
        }
        animateLinks();

        // Draw Nodes
        const nodeGroups = svg.selectAll('.hero-node')
            .data(heroNodes)
            .enter()
            .append('g')
            .attr('class', 'hero-node')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        nodeGroups.append('circle')
            .attr('r', 24)
            .attr('fill', d => d.type === 'flagged' ? '#EF4444' : d.type === 'suspicious' ? '#FF6B35' : '#B6FF00')
            .attr('fill-opacity', 0.15)
            .attr('stroke', d => d.type === 'flagged' ? '#EF4444' : d.type === 'suspicious' ? '#FF6B35' : '#B6FF00')
            .attr('stroke-width', 2);

        nodeGroups.append('circle')
            .attr('r', 8)
            .attr('fill', d => d.type === 'flagged' ? '#EF4444' : d.type === 'suspicious' ? '#FF6B35' : '#B6FF00');

        // Target Node Pulse
        const targetNode = nodeGroups.filter(d => d.type === 'target');
        const pulseCircle = targetNode.append('circle')
            .attr('r', 24)
            .attr('fill', 'none')
            .attr('stroke', '#B6FF00')
            .attr('stroke-width', 2)
            .attr('opacity', 0.8);

        function animatePulse() {
            pulseCircle.transition()
                .duration(2000)
                .ease(d3.easeSinOut)
                .attr('r', 48)
                .attr('opacity', 0)
                .on('end', function() {
                    d3.select(this).attr('r', 24).attr('opacity', 0.8);
                    animatePulse();
                });
        }
        animatePulse();

        // Node Labels
        nodeGroups.append('text')
            .attr('dy', 45)
            .attr('text-anchor', 'middle')
            .attr('fill', '#8B9499')
            .attr('font-size', '11px')
            .attr('font-family', 'JetBrains Mono, monospace')
            .text(d => `Wallet ${d.id}`);
    }

    return () => {
      actionBtns.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.removeEventListener('click', handleLaunch);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onLaunch]);

  return <div dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />;
}

// =============================================================================
// LOGIN PAGE
// =============================================================================
function Login({ onLogin, onBack }) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("investigator");
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => onLogin(role), 900);
  };
  return (
    <div className="cx-scale" style={{ minHeight: 640, display: "grid", placeItems: "center", padding: 24 }}>
      <style>{`
        .lg-card{ width:100%; max-width:380px; background:var(--card); border:1px solid var(--line); border-radius:20px; padding:34px; }
        .lg-mark{ width:44px;height:44px;border-radius:12px;background:var(--lime); display:grid; place-items:center; margin:0 auto 18px; }
        .lg-title{ text-align:center; font-size:19px; margin:0 0 4px; }
        .lg-sub{ text-align:center; font-size:12px; color:var(--dim); margin:0 0 22px; }
        .lg-roles{ display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px; }
        .lg-role{ border:1px solid var(--line); background:#080b0d; border-radius:10px; padding:12px 10px; cursor:pointer; text-align:center; transition:border-color .15s, background .15s; }
        .lg-role.active{ border-color:var(--lime); background:rgba(182,255,0,.06); }
        .lg-role div.rlabel{ font-size:12px; font-weight:700; color:#fff; margin-top:6px; }
        .lg-role div.rsub{ font-size:9.5px; color:var(--dim); margin-top:2px; }
        .lg-field{ margin-bottom:14px; }
        .lg-field label{ display:block; font-size:11px; color:var(--muted); margin-bottom:7px; }
        .lg-inputwrap{ display:flex; align-items:center; gap:9px; background:#080b0d; border:1px solid var(--line); border-radius:10px; padding:12px 13px; }
        .lg-inputwrap input{ background:none; border:0; outline:0; color:#fff; font-size:13px; flex:1; }
        .lg-back{ display:flex; align-items:center; gap:6px; color:var(--dim); font-size:12px; background:none; border:0; cursor:pointer; margin-bottom:18px; }
        .lg-foot{ text-align:center; font-size:10.5px; color:var(--dim); margin-top:18px; }
      `}</style>
      <div className="lg-card">
        <button className="lg-back" onClick={onBack}><ChevronLeft size={14} /> Back</button>
        <div className="lg-mark"><Lock size={19} color="#081000" /></div>
        <h2 className="lg-title">Secure Login Portal</h2>
        <p className="lg-sub">Chandigarh Cyber Cell — restricted access</p>

        <div className="lg-roles">
          <div className={`lg-role ${role === "investigator" ? "active" : ""}`} onClick={() => setRole("investigator")}>
            <Search size={16} color={role === "investigator" ? "var(--lime)" : "var(--dim)"} />
            <div className="rlabel">Investigator</div>
            <div className="rsub">Case &amp; wallet access</div>
          </div>
          <div className={`lg-role ${role === "admin" ? "active" : ""}`} onClick={() => setRole("admin")}>
            <ShieldAlert size={16} color={role === "admin" ? "var(--lime)" : "var(--dim)"} />
            <div className="rlabel">Admin</div>
            <div className="rsub">Full system access</div>
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="lg-field">
            <label>OFFICIAL EMAIL</label>
            <div className="lg-inputwrap"><Mail size={14} color="var(--dim)" /><input type="email" placeholder={role === "admin" ? "admin@cybercell.gov.in" : "investigator@cybercell.gov.in"} defaultValue={role === "admin" ? "admin@cybercell.gov.in" : "investigator@cybercell.gov.in"} key={role} required /></div>
          </div>
          <div className="lg-field">
            <label>PASSWORD</label>
            <div className="lg-inputwrap"><Lock size={14} color="var(--dim)" /><input type="password" placeholder="••••••••" defaultValue="demo1234" required /></div>
          </div>
          <button className="cx-btn cx-btn-primary" style={{ width: "100%", marginTop: 6, display: "flex", justifyContent: "center", gap: 8 }} disabled={loading}>
            {loading ? (<><span className="cx-spinner dark" /> Verifying</>) : `Sign In as ${role === "admin" ? "Admin" : "Investigator"}`}
          </button>
        </form>
        <div className="lg-foot">Demo mode — any credentials will work. All access is logged.</div>
      </div>
    </div>
  );
}

// =============================================================================
// APP SHELL (sidebar + topbar + view switcher)
// =============================================================================
function Sidebar({ view, setView, collapsed, setCollapsed, onLogout, role }) {
  const items = NAV.filter((n) => !n.adminOnly || role === "admin");
  return (
    <aside style={{
      width: collapsed ? 66 : 220, flexShrink: 0, borderRight: "1px solid var(--line)",
      padding: "18px 12px", display: "flex", flexDirection: "column", transition: "width .2s ease", background: "#0a0e10",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px 18px", borderBottom: "1px solid var(--line)", marginBottom: 14 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--lime)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Shield size={15} color="#081000" />
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <b style={{ fontSize: 13, display: "block" }}>ChainSleuth</b>
            <small style={{ fontSize: 8.5, color: "var(--dim)", letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--lime)", display: "inline-block" }} /> SECURE MODE
            </small>
          </div>
        )}
      </div>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }} className="cx-scroll">
        {items.map((n) => {
          const Icon = n.icon;
          const active = view === n.id;
          return (
            <button key={n.id} onClick={() => setView(n.id)} title={n.label} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 9,
              border: 0, cursor: "pointer", fontSize: 12.5, textAlign: "left", width: "100%",
              background: active ? "var(--lime)" : "transparent", color: active ? "#081000" : "var(--muted)",
              fontWeight: active ? 700 : 500, transition: "background .15s",
            }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && n.label}
            </button>
          );
        })}
      </nav>
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, marginTop: 8 }}>
        {!collapsed && <div style={{ fontSize: 10, color: "var(--dim)", lineHeight: 1.6, padding: "0 6px 10px" }}>All actions logged to immutable audit ledger.</div>}
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: 0, color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: "8px 6px", width: "100%" }}>
          <LogOut size={14} /> {!collapsed && "Log out"}
        </button>
        <button onClick={() => setCollapsed((c) => !c)} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: 0, color: "var(--dim)", fontSize: 11, cursor: "pointer", padding: "8px 6px", width: "100%" }}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />} {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, role }) {
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

// --- Dashboard view ---------------------------------------------------------
function DashboardView() {
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

// --- Cases view --------------------------------------------------------------
function CasesView({ cases, onOpen, isAdmin, onAddCase, toast }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [officer, setOfficer] = useState("");
  const [risk, setRisk] = useState("medium");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !officer.trim()) return;
    const n = cases.length + 20;
    onAddCase({
      id: `CASE-2026${String(20 + cases.length).padStart(3, "0")}`,
      title: title.trim(),
      officer: officer.trim(),
      opened: new Date().toISOString().slice(0, 10),
      status: "Open",
      risk,
      wallets: 0,
    });
    toast && toast("New case created and added to the active list.");
    setTitle(""); setOfficer(""); setRisk("medium"); setShowForm(false);
  };

  return (
    <div className="cx-fade-up" style={{ padding: 24, position: "relative" }}>
      <style>{`
        .cv-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .cv-card{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px; cursor:pointer; transition:transform .15s, border-color .15s; }
        .cv-card:hover{ border-color:rgba(182,255,0,.35); transform:translateY(-2px); }
        .cv-card .top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .cv-id{ font-size:10px; color:var(--dim); font-family:monospace; }
        .cv-title{ font-size:14px; font-weight:700; margin:4px 0 12px; line-height:1.4; }
        .cv-meta{ font-size:11px; color:var(--muted); display:flex; align-items:center; gap:6px; margin-bottom:5px; }
        .cv-foot{ display:flex; justify-content:space-between; align-items:center; margin-top:12px; }
        .cv-new{ border:1px dashed var(--line); border-radius:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--dim); cursor:pointer; min-height:150px; transition:border-color .15s, color .15s; }
        .cv-new:hover{ border-color:rgba(182,255,0,.4); color:var(--lime); }
        .cv-modal-bg{ position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:200; display:flex; align-items:center; justify-content:center; }
        .cv-modal{ width:min(420px,90%); background:var(--card); border:1px solid rgba(182,255,0,.25); border-radius:18px; padding:24px; }
        .cv-field{ margin-bottom:14px; }
        .cv-field label{ display:block; font-size:11px; color:var(--muted); margin-bottom:7px; }
        .cv-field input, .cv-field select{ width:100%; background:#080b0d; border:1px solid var(--line); border-radius:9px; padding:11px 12px; color:#fff; font-size:13px; outline:none; }
        .cv-field input:focus, .cv-field select:focus{ border-color:rgba(182,255,0,.5); }
        @media(max-width:900px){ .cv-grid{grid-template-columns:1fr} }
      `}</style>

      {isAdmin && (
        <button className="cx-btn cx-btn-primary" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }} onClick={() => setShowForm(true)}>
          + New Case
        </button>
      )}

      <div className="cv-grid">
        {isAdmin && (
          <div className="cv-new" onClick={() => setShowForm(true)}>
            <Briefcase size={20} />
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>Create New Case</span>
          </div>
        )}
        {cases.map((c) => (
          <div className="cv-card" key={c.id} onClick={() => onOpen(c)}>
            <div className="top">
              <span className="cv-id">{c.id}</span>
              <span className="cx-badge" style={{ background: `${riskColor(c.risk)}22`, color: riskColor(c.risk) }}>{c.status}</span>
            </div>
            <div className="cv-title">{c.title}</div>
            <div className="cv-meta"><Users size={12} /> {c.officer}</div>
            <div className="cv-meta"><Clock size={12} /> Opened {c.opened}</div>
            <div className="cv-foot"><span style={{ fontSize: 11, color: "var(--dim)" }}>{c.wallets} wallets</span><ArrowRight size={13} color="var(--dim)" /></div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="cv-modal-bg" onClick={() => setShowForm(false)}>
          <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 10, color: "var(--lime)", fontWeight: 800, letterSpacing: ".1em", marginBottom: 4 }}>NEW CASE</div>
            <h3 style={{ fontSize: 17, margin: "2px 0 18px" }}>Open an investigation</h3>
            <form onSubmit={submit}>
              <div className="cv-field">
                <label>CASE TITLE</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cross-Border Layering Probe #19" required />
              </div>
              <div className="cv-field">
                <label>ASSIGNED OFFICER</label>
                <input value={officer} onChange={(e) => setOfficer(e.target.value)} placeholder="e.g. Insp. R. Sharma" required />
              </div>
              <div className="cv-field">
                <label>INITIAL RISK LEVEL</label>
                <select value={risk} onChange={(e) => setRisk(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button type="button" className="cx-btn cx-btn-secondary" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="cx-btn cx-btn-primary" style={{ flex: 1 }}>Create Case</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Case Detail view -----------------------------
function CaseDetailView({ caseItem, onBack }) {
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

// --- Wallet Explorer view -----------------------------------------------------
function WalletsView() {
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

// --- Transaction Explorer view -----------------------------------------------
function TransactionsView() {
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

// --- Blockchain Graph view -----------------------------------------------------
function GraphView() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const draw = useCallback(() => {
    const svgEl = svgRef.current, container = containerRef.current;
    if (!svgEl || !container) return;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    const w = container.clientWidth || 600, h = container.clientHeight || 460;
    svg.attr("viewBox", `0 0 ${w} ${h}`);
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "gx-glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "b");
    const merge = filter.append("feMerge");
    merge.append("feMergeNode").attr("in", "b"); merge.append("feMergeNode").attr("in", "SourceGraphic");
    const map = new Map(GRAPH_NODES.map((n) => [n.id, n]));
    const sx = (n) => n.x * w, sy = (n) => n.y * h;
    const g = svg.append("g");
    GRAPH_LINKS.forEach(([a, b]) => {
      const s = map.get(a), t = map.get(b);
      g.append("line").attr("x1", sx(s)).attr("y1", sy(s)).attr("x2", sx(t)).attr("y2", sy(t)).attr("stroke", "rgba(182,255,0,.25)").attr("stroke-width", 1.2);
      g.append("line").attr("x1", sx(s)).attr("y1", sy(s)).attr("x2", sx(t)).attr("y2", sy(t)).attr("stroke", "rgba(182,255,0,.12)").attr("stroke-width", 7).attr("filter", "url(#gx-glow)");
    });
    GRAPH_NODES.forEach((n) => {
      const c = riskColor(n.risk);
      const grp = g.append("g").attr("transform", `translate(${sx(n)},${sy(n)})`).style("cursor", "pointer").on("click", () => setSelected(n));
      grp.append("circle").attr("r", n.id === "A" ? 15 : 11).attr("fill", "#0a0e10").attr("stroke", c).attr("stroke-width", 2);
      grp.append("circle").attr("r", 4).attr("fill", c);
      grp.append("text").attr("y", 27).attr("text-anchor", "middle").attr("fill", "#a9b1b3").attr("font-size", "9").style("user-select", "none").text(n.label);
    });
    const t = map.get("A");
    const pulse = g.append("circle").attr("cx", sx(t)).attr("cy", sy(t)).attr("r", 17).attr("fill", "none").attr("stroke", "#b6ff00").attr("opacity", .55);
    let alive = true;
    (function loop() { if (!alive) return; pulse.transition().duration(1400).attr("r", 32).attr("opacity", 0).on("end", () => { if (!alive) return; pulse.attr("r", 17).attr("opacity", .55); loop(); }); })();
    return () => { alive = false; };
  }, []);

  useEffect(() => { const t = window.setTimeout(draw, 50); const r = () => draw(); window.addEventListener("resize", r); return () => { window.clearTimeout(t); window.removeEventListener("resize", r); }; }, [draw]);

  return (
    <div className="cx-scale" style={{ padding: 24, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 14 }}>Transaction Flow</div>
        <div ref={containerRef} style={{ height: 460, background: "radial-gradient(circle at center, rgba(182,255,0,.045), transparent 55%)" }}>
          <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 20 }}>
        {selected ? (
          <>
            <div style={{ fontSize: 10, color: "var(--lime)", fontWeight: 800, letterSpacing: ".1em", marginBottom: 10 }}>SELECTED WALLET</div>
            <div style={{ marginBottom: 16 }}><AddrChip value={selected.label} size={14} front={selected.label.length} back={0} /></div>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `conic-gradient(${riskColor(selected.risk)} 0 ${selected.score}%, #20282b ${selected.score}% 100%)`, display: "grid", placeItems: "center", marginBottom: 16 }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", background: "var(--card)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 19 }}>{selected.score}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>{selected.txCount} transactions · {selected.linked} linked wallets</div>
            <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 14, marginBottom: 8 }}>DETECTED PATTERNS</div>
            {selected.patterns.length ? selected.patterns.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}><CircleAlert size={13} color="var(--warning)" /> {p}</div>
            )) : <div style={{ fontSize: 12, color: "var(--dim)" }}>No patterns matched.</div>}
          </>
        ) : (
          <div style={{ color: "var(--dim)", fontSize: 12.5 }}>Click a wallet node to inspect it.</div>
        )}
      </div>
    </div>
  );
}

// --- AI Detection view -----------------------------------------------------
function AIView() {
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

// --- Realtime Monitor view -----------------------------------------------------
function MonitorView() {
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

// --- Court Reports view -----------------------------------------------------
function ReportsView({ toast }) {
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

// --- Settings view -----------------------------------------------------
function SettingsView({ toast, role }) {
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

// --- Admin Panel view (admin role only) -----------------------------
function AdminView({ toast }) {
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

// =============================================================================
// APP SHELL
// =============================================================================
function Dashboard({ onLogout, role }) {
  const [view, setView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [activeCase, setActiveCase] = useState(null);
  const [cases, setCases] = useState(CASES);
  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg) => { setToastMsg(msg); window.setTimeout(() => setToastMsg(""), 2800); };

  const isAdmin = role === "admin";
  const displayName = isAdmin ? "Admin Sharma" : "Investigator Singh";
  const unitLabel = isAdmin ? "System Administration" : "Chandigarh Cyber Cell";

  const titles = {
    dashboard: ["Investigation Command Center", `Welcome back, ${displayName} · ${unitLabel}`],
    cases: ["Active Cases", "34 investigations currently open across your unit — click a case to open it"],
    wallets: ["Wallet Explorer", "Search and inspect tracked wallet addresses"],
    transactions: ["Transaction Explorer", "Look up any transaction hash across tracked chains"],
    graph: ["Blockchain Graph", "Visual fund-flow trace for the current case"],
    ai: ["AI Pattern Detection", "Patterns currently contributing to suspicion scores"],
    monitor: ["Realtime Monitor", "Live alert feed across all tracked wallets"],
    reports: ["Court Reports", "Generate and export evidence-ready reports"],
    admin: ["Admin Panel", "Manage investigator accounts and access"],
    settings: ["Settings", "Manage your investigator profile"],
  };
  const [title, subtitle] = view === "cases" && activeCase
    ? [activeCase.title, `Case file · ${activeCase.id}`]
    : titles[view];

  const openView = (id) => { setActiveCase(null); setView(id); };

  return (
    <div style={{ display: "flex", minHeight: 640 }}>
      <Sidebar view={view} setView={openView} collapsed={collapsed} setCollapsed={setCollapsed} onLogout={onLogout} role={role} />
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto", maxHeight: 720 }} className="cx-scroll">
        <Topbar title={title} subtitle={subtitle} role={role} />
        {view === "dashboard" && <DashboardView />}
        {view === "cases" && (
          activeCase
            ? <CaseDetailView caseItem={activeCase} onBack={() => setActiveCase(null)} />
            : <CasesView cases={cases} onOpen={(c) => setActiveCase(c)} isAdmin={isAdmin} onAddCase={(c) => setCases((prev) => [c, ...prev])} toast={toast} />
        )}
        {view === "wallets" && <WalletsView />}
        {view === "transactions" && <TransactionsView />}
        {view === "graph" && <GraphView />}
        {view === "ai" && <AIView />}
        {view === "monitor" && <MonitorView />}
        {view === "reports" && <ReportsView toast={toast} />}
        {view === "admin" && isAdmin && <AdminView toast={toast} />}
        {view === "settings" && <SettingsView toast={toast} role={role} />}
      </div>
      <div style={{
        position: "absolute", right: 20, bottom: 20, background: "#141b1d", border: "1px solid rgba(182,255,0,.3)",
        borderRadius: 12, padding: "12px 16px", fontSize: 12, zIndex: 100, boxShadow: "0 15px 50px rgba(0,0,0,.4)",
        opacity: toastMsg ? 1 : 0, transform: `translateY(${toastMsg ? "0" : "20px"})`, transition: ".3s", pointerEvents: "none", maxWidth: 280,
      }}>{toastMsg}</div>
    </div>
  );
}

// =============================================================================
// ROOT
// =============================================================================
export default function ChainSleuthApp() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [role, setRole] = useState("investigator");
  return (
    <div className="cx-root">
      {screen === "landing" && <Landing onLaunch={() => setScreen("login")} />}
      {screen === "login" && <Login onLogin={(r) => { setRole(r); setScreen("app"); }} onBack={() => setScreen("landing")} />}
      {screen === "app" && <Dashboard role={role} onLogout={() => setScreen("landing")} />}
    </div>
  );
}