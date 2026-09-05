import React, { useState } from "react";
import "./LandingPage.css";

import { STYLE } from "./styles/dashboardStyles.js";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// =============================================================================
// ROOT
// =============================================================================
export default function ChainSleuthApp() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [role, setRole] = useState("investigator");
  return (
    <div className="cx-root">
      {/* FIX: this <style> tag was missing before the refactor — the .cx-root/.cx-btn/
          .cx-fade/.cx-scale/.cx-badge classes used across Landing, Login and every
          dashboard view were defined in STYLE but never injected into the page. */}
      <style>{STYLE}</style>
      {screen === "landing" && <Landing onLaunch={() => setScreen("login")} />}
      {screen === "login" && <Login onLogin={(r) => { setRole(r); setScreen("app"); }} onBack={() => setScreen("landing")} />}
      {screen === "app" && <Dashboard role={role} onLogout={() => setScreen("landing")} />}
    </div>
  );
}
