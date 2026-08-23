import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { X, ShieldAlert } from "lucide-react";

// ---------------------------------------------------------------------------
// SAMPLE DATA — mirrors the demo case from the prototype (CS-2026-0142).
// Replace with the real API response once the backend pattern-detection
// service is live. Keep the shape (id, label, risk, x, y as 0–1 fractions)
// and the graph + drawer keep working unchanged.
// ---------------------------------------------------------------------------
const DEMO_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

const NODES = [
  { id: "A", label: "0x742d…f44e", risk: "high", x: 0.5, y: 0.5,
    score: 87, txCount: 247, linked: 34, patterns: ["Fund Splitting", "Rapid Pass-Through"] },
  { id: "B", label: "0x19a3…8bc2", risk: "normal", x: 0.28, y: 0.34,
    score: 22, txCount: 12, linked: 5, patterns: [] },
  { id: "C", label: "0x5fe2…119a", risk: "high", x: 0.69, y: 0.29,
    score: 74, txCount: 58, linked: 11, patterns: ["Rapid Pass-Through"] },
  { id: "D", label: "0xa817…d921", risk: "suspicious", x: 0.85, y: 0.55,
    score: 56, txCount: 9, linked: 4, patterns: ["Peel Chain"] },
  { id: "E", label: "0xb20c…ee73", risk: "suspicious", x: 0.65, y: 0.74,
    score: 61, txCount: 14, linked: 6, patterns: ["Fund Splitting"] },
  { id: "F", label: "0x91de…20ac", risk: "normal", x: 0.32, y: 0.68,
    score: 18, txCount: 6, linked: 3, patterns: [] },
  { id: "G", label: "0x40bc…77a1", risk: "normal", x: 0.12, y: 0.54,
    score: 15, txCount: 4, linked: 2, patterns: [] },
  { id: "H", label: "0xf08d…91cc", risk: "flagged", x: 0.91, y: 0.78,
    score: 96, txCount: 63, linked: 19, patterns: ["Flagged Connection", "Peel Chain"] },
  { id: "I", label: "0x2a7f…a01d", risk: "normal", x: 0.47, y: 0.16,
    score: 20, txCount: 3, linked: 2, patterns: [] },
];
const LINKS = [["A","B"],["A","C"],["B","F"],["B","G"],["C","D"],["C","E"],["C","I"],["D","H"],["E","H"],["F","G"]];

const REASONS = [
  "Rapid movement of funds",
  "Multiple intermediary wallets",
  "Fund splitting detected",
  "Connection to flagged address",
  "Unusual transaction timing",
];

const PATTERNS = [
  { badge: "DETECTED", title: "Fund Splitting", desc: "Funds divided across multiple intermediary wallets in a short period.", contribution: "+24" },
  { badge: "DETECTED", title: "Rapid Pass-Through", desc: "Funds moved through multiple wallets within an unusually short interval.", contribution: "+31" },
  { badge: "POSSIBLE", title: "Peel Chain", desc: "Repeated intermediary transfers where amounts gradually separate from the original flow.", contribution: "+18" },
  { badge: "DETECTED", title: "Flagged Connection", desc: "Direct or indirect connection to an address present on a public flagged-address list.", contribution: "+14" },
];

const ALERTS = [
  { sev: "high", label: "HIGH RISK", time: "2m ago", title: "Multiple intermediary wallets", desc: "A chain of 7 wallets was detected between the source and destination." },
  { sev: "medium", label: "MEDIUM RISK", time: "8m ago", title: "Unusual transaction frequency", desc: "Transaction volume increased sharply during a 13-minute interval." },
  { sev: "high", label: "HIGH RISK", time: "11m ago", title: "Flagged wallet connection", desc: "An indirect connection to a known flagged address was identified." },
];

const TIMELINE = [
  { time: "10:42 AM", from: "Wallet A", to: "Wallet B", addr: "0x742d...f44e → 0x19a3...8bc2", amount: "$42,000", tag: "NORMAL" },
  { time: "10:47 AM", from: "Wallet B", to: "Wallet C", addr: "0x19a3...8bc2 → 0x5fe2...119a", amount: "$39,800", tag: "SUSPICIOUS" },
  { time: "10:49 AM", from: "Wallet C", to: "Wallet D", addr: "0x5fe2...119a → 0xa817...d921", amount: "$19,500", tag: "SUSPICIOUS" },
  { time: "10:51 AM", from: "Wallet C", to: "Wallet E", addr: "0x5fe2...119a → 0xb20c...ee73", amount: "$19,800", tag: "FUND SPLITTING" },
];

const LOADING_MESSAGES = ["Fetching blockchain data...", "Mapping wallet relationships...", "Scanning transaction patterns...", "Calculating suspicion score..."];

const riskColor = (risk) => (risk === "high" || risk === "flagged" ? "#b6ff00" : risk === "suspicious" ? "#ffbd4a" : "#718087");

export default function InvestigationDashboard() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("Ethereum");
  const [mode, setMode] = useState("Full Analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const timers = useRef([]);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(timers.current._toast);
    timers.current._toast = window.setTimeout(() => setToast(""), 2800);
  };

  const analyze = () => {
    if (!address.trim()) {
      showToast("Enter a wallet address or load the demo investigation.");
      return;
    }
    setAnalyzing(true);
    setShowResults(false);
    let i = 0;
    setLoadingText(LOADING_MESSAGES[0]);
    const interval = window.setInterval(() => {
      i++;
      if (i < LOADING_MESSAGES.length) setLoadingText(LOADING_MESSAGES[i]);
    }, 650);
    const done = window.setTimeout(() => {
      window.clearInterval(interval);
      setAnalyzing(false);
      setShowResults(true);
      showToast("Analysis complete — 4 suspicious patterns detected.");
    }, 2900);
    timers.current.push(interval, done);
  };

  const loadDemo = () => {
    setAddress(DEMO_ADDRESS);
    window.setTimeout(analyze, 0);
  };

  useEffect(() => () => timers.current.forEach((t) => { window.clearInterval(t); window.clearTimeout(t); }), []);

  const drawGraph = useCallback(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (!svgEl || !container) return;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    const w = container.clientWidth || 600;
    const h = container.clientHeight || 500;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "id-glow-main");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const merge = filter.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const scaleX = (n) => n.x * w;
    const scaleY = (n) => n.y * h;
    const map = new Map(NODES.map((n) => [n.id, n]));
    const g = svg.append("g");

    LINKS.forEach(([a, b]) => {
      const s = map.get(a), t = map.get(b);
      g.append("line").attr("x1", scaleX(s)).attr("y1", scaleY(s)).attr("x2", scaleX(t)).attr("y2", scaleY(t))
        .attr("stroke", "rgba(182,255,0,.28)").attr("stroke-width", 1.2);
      g.append("line").attr("x1", scaleX(s)).attr("y1", scaleY(s)).attr("x2", scaleX(t)).attr("y2", scaleY(t))
        .attr("stroke", "rgba(182,255,0,.13)").attr("stroke-width", 7).attr("filter", "url(#id-glow-main)");
    });

    NODES.forEach((n) => {
      const group = g.append("g").attr("transform", `translate(${scaleX(n)},${scaleY(n)})`).style("cursor", "pointer")
        .on("click", () => setSelected(n));
      const c = riskColor(n.risk);
      group.append("circle").attr("r", n.id === "A" ? 15 : 11).attr("fill", "#0a0e10").attr("stroke", c).attr("stroke-width", 2);
      group.append("circle").attr("r", 4).attr("fill", c);
      group.append("text").attr("y", 27).attr("text-anchor", "middle").attr("fill", "#a9b1b3").attr("font-size", "9").text(n.label);
    });

    const target = map.get("A");
    const pulse = g.append("circle").attr("cx", scaleX(target)).attr("cy", scaleY(target)).attr("r", 17)
      .attr("fill", "none").attr("stroke", "#b6ff00").attr("opacity", 0.55);
    let alive = true;
    function loop() {
      if (!alive) return;
      pulse.transition().duration(1400).attr("r", 32).attr("opacity", 0).on("end", () => {
        if (!alive) return;
        pulse.attr("r", 17).attr("opacity", 0.55);
        loop();
      });
    }
    loop();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!showResults) return;
    const t = window.setTimeout(drawGraph, 50);
    const onResize = () => drawGraph();
    window.addEventListener("resize", onResize);
    return () => { window.clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, [showResults, drawGraph]);

  return (
    <div className="cs-root">
      <style>{`
        .cs-root {
          --bg:#070a0c; --card:#0f1416; --card2:#151b1e; --lime:#b6ff00;
          --text:#f2f5f3; --muted:#8c969a; --dim:#626c70; --line:rgba(255,255,255,.08);
          --danger:#ff5c67; --warning:#ffbd4a; --radius:20px;
          background:var(--bg); color:var(--text);
          font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;
          border-radius:20px; border:1px solid var(--line); padding:28px; position:relative;
        }
        .cs-root *{box-sizing:border-box}
        .cs-kicker{font-size:11px;font-weight:900;letter-spacing:.16em;color:var(--lime);margin-bottom:10px}
        .cs-h2{font-size:clamp(26px,3.2vw,38px);line-height:1;letter-spacing:-.03em;margin:0 0 8px}
        .cs-h2 span{color:var(--lime)}
        .cs-desc{color:var(--muted);font-size:13px;max-width:480px;margin-bottom:26px;line-height:1.6}
        .cs-investigator{display:grid;grid-template-columns:1fr 280px;gap:12px;padding:14px;border:1px solid var(--line);border-radius:24px;background:#0d1214}
        .cs-input-area{padding:20px}
        .cs-input-label{font-size:11px;color:var(--lime);font-weight:900;letter-spacing:.14em;margin-bottom:14px}
        .cs-address-row{display:flex;gap:10px;flex-wrap:wrap}
        .cs-address-row input{flex:1;min-width:220px;background:#080b0d;border:1px solid var(--line);border-radius:11px;color:#fff;padding:15px 16px;outline:none}
        .cs-address-row input:focus{border-color:rgba(182,255,0,.6);box-shadow:0 0 0 3px rgba(182,255,0,.07)}
        .cs-btn{border:0;border-radius:10px;padding:12px 18px;font-weight:800;font-size:13px;cursor:pointer}
        .cs-btn-primary{background:var(--lime);color:#081000}
        .cs-btn-primary:disabled{opacity:.6;cursor:default}
        .cs-btn-secondary{background:rgba(255,255,255,.06);color:#fff;border:1px solid var(--line)}
        .cs-controls{display:flex;gap:9px;margin-top:14px;flex-wrap:wrap}
        .cs-controls select{background:#121719;color:#fff;border:1px solid var(--line);border-radius:9px;padding:10px 12px;outline:none}
        .cs-demo-side{border-left:1px solid var(--line);padding:20px;display:flex;flex-direction:column;justify-content:space-between}
        .cs-demo-side small{color:var(--dim);font-size:10px;letter-spacing:.1em}
        .cs-demo-side strong{font-size:14px;line-height:1.5;display:block;margin:6px 0 14px}
        .cs-loading{background:var(--card);border:1px solid var(--line);border-radius:18px;margin-top:12px;padding:26px}
        .cs-loading-text{font-size:18px;font-weight:800;margin-top:4px}
        .cs-results{margin-top:18px;animation:cs-up .45s ease}
        @keyframes cs-up{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}
        .cs-metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
        .cs-metric{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
        .cs-metric small{display:block;color:var(--dim);font-size:9px;letter-spacing:.1em;margin-bottom:9px}
        .cs-metric strong{font-size:22px}
        .cs-metric em{font-style:normal;color:var(--lime);font-size:10px;display:block;margin-top:6px}
        .cs-analysis-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:12px;margin-top:12px}
        .cs-panel{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden}
        .cs-panel-head{padding:16px 18px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
        .cs-panel-head h3{font-size:14px;margin:0}
        .cs-panel-head span{font-size:10px;color:var(--dim)}
        .cs-graphwrap{width:100%;height:440px;background:radial-gradient(circle at center,rgba(182,255,0,.045),transparent 55%)}
        .cs-risk-panel{padding:22px}
        .cs-risk-score{display:flex;align-items:center;gap:18px;margin-bottom:22px}
        .cs-ring{width:105px;height:105px;border-radius:50%;display:grid;place-items:center;position:relative}
        .cs-ring:after{content:"";position:absolute;inset:8px;border-radius:50%;background:var(--card)}
        .cs-ring b{position:relative;z-index:1;font-size:25px}
        .cs-risk-title small{display:block;color:var(--dim);font-size:9px;letter-spacing:.1em;margin-bottom:6px}
        .cs-risk-title strong{font-size:17px;color:var(--lime)}
        .cs-reasons{display:grid;gap:8px}
        .cs-reason{display:flex;gap:9px;font-size:12px;color:#c2c9ca;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
        .cs-reason i{color:var(--lime);font-style:normal}
        .cs-timeline .cs-tx{display:grid;grid-template-columns:80px 1fr auto;gap:16px;padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.05);align-items:center}
        .cs-timeline .cs-tx:last-child{border:0}
        .cs-tx-time{font-size:11px;color:var(--dim)}
        .cs-tx-route strong{font-size:12px}.cs-tx-route small{display:block;color:var(--muted);margin-top:3px}
        .cs-tx-amount{text-align:right;font-size:12px}.cs-tx-amount span{display:block;color:var(--lime);font-size:9px;margin-top:4px}
        .cs-patterns{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}
        .cs-pattern{padding:18px;border:1px solid var(--line);border-radius:16px;background:var(--card);min-height:150px;position:relative}
        .cs-pattern .badge{font-size:9px;color:var(--lime);border:1px solid rgba(182,255,0,.2);padding:5px 7px;border-radius:5px;display:inline-block}
        .cs-pattern h3{font-size:15px;margin:16px 0 7px}
        .cs-pattern p{color:var(--muted);font-size:11.5px;line-height:1.5}
        .cs-pattern .contribution{position:absolute;bottom:16px;color:var(--dim);font-size:10px}
        .cs-pattern .contribution b{color:#fff}
        .cs-alerts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
        .cs-alert{padding:18px;border:1px solid var(--line);border-radius:16px;background:var(--card)}
        .cs-alert-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .cs-severity{font-size:9px;font-weight:900;letter-spacing:.1em}
        .cs-severity.high{color:var(--danger)}.cs-severity.medium{color:var(--warning)}
        .cs-alert h3{font-size:13px;margin:0 0 7px}.cs-alert p{color:var(--muted);font-size:11.5px;line-height:1.5;margin:0}
        .cs-disclaimer{border:1px solid rgba(182,255,0,.18);background:rgba(182,255,0,.035);border-radius:16px;padding:18px;display:flex;gap:12px;align-items:flex-start;margin-top:12px}
        .cs-disclaimer p{margin:0;color:#9da6a8;font-size:11.5px;line-height:1.6}
        .cs-spinner{width:15px;height:15px;border:2px solid rgba(0,0,0,.2);border-top-color:#071000;border-radius:50%;animation:cs-spin .7s linear infinite;display:inline-block;vertical-align:middle;margin-right:7px}
        @keyframes cs-spin{to{transform:rotate(360deg)}}
        .cs-overlay{display:${selected ? "block" : "none"};position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:70;border-radius:20px}
        .cs-drawer{position:absolute;right:${selected ? "0" : "-360px"};top:0;bottom:0;width:min(340px,90%);background:#0c1113;border-left:1px solid var(--line);z-index:80;padding:22px;transition:.3s;overflow-y:auto}
        .cs-drawer-close{float:right;background:none;border:0;color:#fff;cursor:pointer}
        .cs-drawer h2{font-size:24px;margin-top:36px}
        .cs-drawer-label{font-size:9px;color:var(--lime);letter-spacing:.15em;margin-top:18px}
        .cs-detail{border-bottom:1px solid var(--line);padding:12px 0}
        .cs-detail small{display:block;color:var(--dim);font-size:9px;margin-bottom:5px}
        .cs-detail b{font-size:12.5px;word-break:break-all}
        .cs-toast{position:absolute;right:20px;bottom:20px;background:#141b1d;border:1px solid rgba(182,255,0,.3);border-radius:12px;padding:12px 16px;z-index:100;font-size:12px;box-shadow:0 15px 50px rgba(0,0,0,.4);opacity:${toast ? 1 : 0};transform:translateY(${toast ? "0" : "20px"});transition:.3s;pointer-events:none;max-width:280px}
        @media(max-width:900px){
          .cs-investigator{grid-template-columns:1fr}.cs-demo-side{border-left:0;border-top:1px solid var(--line)}
          .cs-metrics{grid-template-columns:repeat(3,1fr)}.cs-analysis-grid{grid-template-columns:1fr}
          .cs-patterns{grid-template-columns:repeat(2,1fr)}.cs-alerts{grid-template-columns:1fr}
        }
      `}</style>

      <div className="cs-kicker">INVESTIGATION CONSOLE</div>
      <h2 className="cs-h2">Start an <span>investigation.</span></h2>
      <p className="cs-desc">Enter a wallet address or load the prepared demo case to explore the complete investigator workflow.</p>

      <div className="cs-investigator">
        <div className="cs-input-area">
          <div className="cs-input-label">TARGET WALLET ADDRESS</div>
          <div className="cs-address-row">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={DEMO_ADDRESS}
            />
            <button className="cs-btn cs-btn-primary" disabled={analyzing} onClick={analyze}>
              {analyzing ? (<><span className="cs-spinner" />Analyzing</>) : "Analyze Wallet →"}
            </button>
          </div>
          <div className="cs-controls">
            <select value={chain} onChange={(e) => setChain(e.target.value)}>
              <option>Ethereum</option>
              <option>Bitcoin</option>
            </select>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option>Full Analysis</option>
              <option>Transaction Flow</option>
              <option>Risk Analysis</option>
            </select>
            <button className="cs-btn cs-btn-secondary" onClick={loadDemo}>Load Demo Investigation</button>
          </div>
        </div>
        <div className="cs-demo-side">
          <div>
            <small>DEMO CASE</small>
            <strong>CS-2026-0142<br />High-risk transaction cluster</strong>
          </div>
          <button className="cs-btn cs-btn-secondary" onClick={loadDemo}>Load case →</button>
        </div>
      </div>

      {analyzing && (
        <div className="cs-loading">
          <div className="cs-input-label">ANALYSIS IN PROGRESS</div>
          <div className="cs-loading-text">{loadingText}</div>
        </div>
      )}

      {showResults && (
        <div className="cs-results">
          <div className="cs-metrics">
            <div className="cs-metric"><small>RISK SCORE</small><strong style={{ color: "var(--lime)" }}>87/100</strong><em>HIGH RISK</em></div>
            <div className="cs-metric"><small>TRANSACTIONS</small><strong>247</strong><em>ANALYZED</em></div>
            <div className="cs-metric"><small>LINKED WALLETS</small><strong>34</strong><em>8 FLAGGED</em></div>
            <div className="cs-metric"><small>TOTAL VOLUME</small><strong>$1.42M</strong><em>ESTIMATED</em></div>
            <div className="cs-metric"><small>PATTERNS</small><strong>4</strong><em>DETECTED</em></div>
          </div>

          <div className="cs-analysis-grid">
            <div className="cs-panel">
              <div className="cs-panel-head"><h3>Transaction Flow</h3><span>Click a wallet for details</span></div>
              <div className="cs-graphwrap" ref={containerRef}>
                <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            <div className="cs-panel">
              <div className="cs-panel-head"><h3>Suspicion Analysis</h3><span>Explainable score</span></div>
              <div className="cs-risk-panel">
                <div className="cs-risk-score">
                  <div className="cs-ring" style={{ background: `conic-gradient(var(--lime) 0 87%, #20282b 87% 100%)` }}>
                    <b>87</b>
                  </div>
                  <div className="cs-risk-title">
                    <small>OVERALL STATUS</small>
                    <strong>HIGH RISK</strong>
                    <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}>4 meaningful indicators</div>
                  </div>
                </div>
                <div className="cs-input-label">WHY WAS THIS WALLET FLAGGED?</div>
                <div className="cs-reasons">
                  {REASONS.map((r, i) => (
                    <div className="cs-reason" key={i}><i>✓</i> {r}</div>
                  ))}
                </div>
                <button className="cs-btn cs-btn-primary" style={{ width: "100%", marginTop: 18 }} onClick={() => showToast("Investigation saved to local demo state.")}>
                  Save Investigation
                </button>
              </div>
            </div>
          </div>

          <div className="cs-panel" style={{ marginTop: 12 }}>
            <div className="cs-panel-head"><h3>Transaction Timeline</h3><span>Showing suspicious activity first</span></div>
            <div className="cs-timeline">
              {TIMELINE.map((tx, i) => (
                <div className="cs-tx" key={i}>
                  <div className="cs-tx-time">{tx.time}</div>
                  <div className="cs-tx-route"><strong>{tx.from} → {tx.to}</strong><small>{tx.addr}</small></div>
                  <div className="cs-tx-amount">{tx.amount}<span>{tx.tag}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-patterns">
            {PATTERNS.map((p, i) => (
              <article className="cs-pattern" key={i}>
                <span className="badge">{p.badge}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="contribution">RISK CONTRIBUTION <b>{p.contribution}</b></div>
              </article>
            ))}
          </div>

          <div className="cs-alerts">
            {ALERTS.map((a, i) => (
              <article className="cs-alert" key={i}>
                <div className="cs-alert-top">
                  <span className={`cs-severity ${a.sev}`}>{a.label}</span>
                  <span style={{ color: "var(--dim)", fontSize: 10 }}>{a.time}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>

          <div className="cs-disclaimer">
            <ShieldAlert size={16} style={{ color: "var(--lime)", flexShrink: 0 }} />
            <p><strong style={{ color: "#fff" }}>Investigative assistance only.</strong> ChainSleuth identifies suspicious patterns in publicly available blockchain data. It does not make legal determinations or accusations. All findings should be reviewed by a qualified human investigator.</p>
          </div>
        </div>
      )}

      <div className="cs-overlay" onClick={() => setSelected(null)} />
      <aside className="cs-drawer">
        <button className="cs-drawer-close" onClick={() => setSelected(null)}><X size={20} /></button>
        <div className="cs-drawer-label">SELECTED WALLET</div>
        <h2>Wallet <span style={{ color: "var(--lime)" }}>Details.</span></h2>
        {selected && (
          <>
            <div className="cs-detail"><small>ADDRESS</small><b>{selected.label}</b></div>
            <div className="cs-detail"><small>RISK SCORE</small><b style={{ color: "var(--lime)" }}>{selected.score} / 100 — {selected.risk.toUpperCase()}</b></div>
            <div className="cs-detail"><small>TRANSACTIONS</small><b>{selected.txCount} analyzed</b></div>
            <div className="cs-detail"><small>LINKED WALLETS</small><b>{selected.linked} connections</b></div>
            <div className="cs-detail"><small>DETECTED PATTERNS</small><b>{selected.patterns.length ? selected.patterns.join(" · ") : "None"}</b></div>
            <button className="cs-btn cs-btn-primary" style={{ width: "100%", marginTop: 20 }} onClick={() => { showToast("Graph focus applied to selected wallet."); setSelected(null); }}>
              Focus on Graph
            </button>
          </>
        )}
      </aside>

      <div className="cs-toast">{toast}</div>
    </div>
  );
}