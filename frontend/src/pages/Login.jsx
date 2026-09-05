import React, { useState } from "react";
import { Search, ChevronLeft, ShieldAlert, Lock, Mail } from "lucide-react";

export default function Login({ onLogin, onBack }) {
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
