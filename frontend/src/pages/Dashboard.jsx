import React, { useState } from "react";
import { Search, Settings } from "lucide-react";
import { CASES } from "../data/mockData.js";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import DashboardView from "./DashboardView.jsx";
import CasesView from "./CasesView.jsx";
import CaseDetailView from "./CaseDetailView.jsx";
import WalletsView from "./WalletsView.jsx";
import TransactionsView from "./TransactionsView.jsx";
import GraphView from "./GraphView.jsx";
import AIView from "./AIView.jsx";
import MonitorView from "./MonitorView.jsx";
import ReportsView from "./ReportsView.jsx";
import SettingsView from "./SettingsView.jsx";
import AdminView from "./AdminView.jsx";

export default function Dashboard({ onLogout, role }) {
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
