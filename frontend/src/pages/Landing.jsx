import React, { useEffect } from "react";
import * as d3 from "d3";
import { LANDING_HTML } from "../data/landingHtml.js";
import Login from "./Login.jsx";

export default function Landing({ onLaunch }) {
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
