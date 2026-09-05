import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { CircleAlert } from "lucide-react";
import { PATTERNS, GRAPH_NODES, GRAPH_LINKS } from "../data/mockData.js";
import { riskColor } from "../utils/risk.js";
import AddrChip from "../components/AddrChip.jsx";

export default function GraphView() {
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
