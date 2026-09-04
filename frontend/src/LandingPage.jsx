import { useEffect, useRef } from "react";
import "./LandingPage.css";

const BODY_HTML = `
    <div class="grid-bg"></div>
    <nav class="nav" id="navbar" role="navigation" aria-label="Main navigation">
        <div class="nav-inner">
            <a href="#" class="nav-logo" aria-label="ChainSleuth Home">
                <div class="nav-logo-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
                ChainSleuth
            </a>
            <ul class="nav-links">
                <li><a href="#investigate" class="active">Investigate</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#graph">Transaction Graph</a></li>
                <li><a href="#alerts">Alerts</a></li>
                <li><a href="#case">Investigations</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            <div class="nav-right">
                <a href="/login" class="btn btn-secondary btn-sm" style="border-radius: 8px;">Login Portal &rarr;</a>
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
            </div>
        </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
        <a href="#investigate">Investigate</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#graph">Transaction Graph</a>
        <a href="#alerts">Alerts</a>
        <a href="#case">Investigations</a>
        <a href="#about">About</a>
    </div>

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
                        <a href="#dashboard" class="btn btn-primary" onclick="document.getElementById('dashboard').classList.add('active');">Launch Dashboard &rarr;</a>
                        <button class="btn btn-secondary" id="heroDemoBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg> 
                            Watch Demo
                        </button>
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
                    <button class="btn btn-primary" id="analyzeBtn">Analyze Wallet <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
                    <button class="demo-btn" id="loadDemoBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Load Demo Investigation</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay" role="dialog" aria-label="Analysis in progress">
        <div class="loading-spinner"></div>
        <div class="loading-text" id="loadingText"><strong>Analyzing</strong> wallet data...</div>
        <div class="loading-steps">
            <div class="loading-step active" id="step1"><span class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg></span>Fetching blockchain data...</div>
            <div class="loading-step" id="step2"><span class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg></span>Mapping wallet relationships...</div>
            <div class="loading-step" id="step3"><span class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>Scanning transaction patterns...</div>
            <div class="loading-step" id="step4"><span class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg></span>Calculating suspicion score...</div>
        </div>
    </div>

    <!-- Dashboard -->
    <section class="dashboard" id="dashboard">
        <div class="container">
            <div class="demo-label"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> DEMO DATA — For demonstration purposes only</div>
            <div class="dashboard-header">
                <div>
                    <h2 class="dashboard-title">Investigation Overview</h2>
                    <p class="dashboard-subtitle">Target: <span id="targetWallet" style="font-family:var(--font-mono);color:var(--accent);">0x742d...f44e</span></p>
                </div>
            </div>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-label">Risk Score</div><div class="stat-value accent" id="statRisk">87 / 100</div></div>
                <div class="stat-card"><div class="stat-label">Transactions Analyzed</div><div class="stat-value" id="statTx">247</div></div>
                <div class="stat-card"><div class="stat-label">Linked Wallets</div><div class="stat-value" id="statLinked">34</div></div>
                <div class="stat-card"><div class="stat-label">Flagged Connections</div><div class="stat-value warning" id="statFlagged">8</div></div>
                <div class="stat-card"><div class="stat-label">Total Volume</div><div class="stat-value" id="statVolume">$1.42M</div></div>
            </div>

            <!-- Risk Score Section -->
            <div class="risk-section" id="risk">
                <div class="risk-card">
                    <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;">Suspicion Score</h3>
                    <div class="risk-gauge">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle class="risk-gauge-bg" cx="100" cy="100" r="70"></circle>
                            <circle class="risk-gauge-fill" id="riskGaugeFill" cx="100" cy="100" r="70"></circle>
                        </svg>
                        <div class="risk-gauge-center">
                            <div class="risk-score-number" id="riskScoreNum">0</div>
                            <div class="risk-score-label">/ 100</div>
                        </div>
                    </div>
                    <div class="risk-status" id="riskStatus">HIGH RISK</div>
                </div>
                <div class="risk-card" style="text-align:left;">
                    <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;">Why was this wallet flagged?</h3>
                    <div class="risk-reasons">
                        <div class="risk-reason"><span class="risk-reason-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span><span>Rapid movement of funds detected across multiple wallets</span></div>
                        <div class="risk-reason"><span class="risk-reason-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span><span>Multiple intermediary wallets identified in transaction chain</span></div>
                        <div class="risk-reason"><span class="risk-reason-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span><span>Fund splitting behavior detected across 6 destination wallets</span></div>
                        <div class="risk-reason"><span class="risk-reason-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span><span>Direct connection to previously flagged address detected</span></div>
                        <div class="risk-reason"><span class="risk-reason-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span><span>Unusual transaction timing: 23 transactions within 4 minutes</span></div>
                    </div>
                </div>
            </div>

            <!-- Transaction Graph -->
            <div class="graph-section" id="graph">
                <div class="graph-header">
                    <h3 style="font-size:1.5rem;font-weight:700;">Transaction Flow</h3>
                    <div class="graph-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="normal">Normal</button>
                        <button class="filter-btn" data-filter="suspicious">Suspicious</button>
                        <button class="filter-btn" data-filter="flagged">Flagged</button>
                    </div>
                </div>
                <div class="graph-container" id="graphContainer">
                    <svg id="txGraph"></svg>
                    <div class="graph-controls">
                        <button class="graph-control-btn" id="zoomIn" aria-label="Zoom in"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg></button>
                        <button class="graph-control-btn" id="zoomOut" aria-label="Zoom out"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg></button>
                        <button class="graph-control-btn" id="resetGraph" aria-label="Reset graph"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg></button>
                    </div>
                </div>
            </div>

            <!-- Detected Patterns -->
            <div id="patterns">
                <div class="section-header" style="text-align:left;margin-bottom:2rem;">
                    <h3 class="section-title" style="font-size:1.75rem;">Detected Patterns</h3>
                </div>
                <div class="patterns-grid">
                    <div class="pattern-card">
                        <div class="pattern-number">01</div>
                        <div class="pattern-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></svg></div>
                        <div class="pattern-name">Fund Splitting</div>
                        <div class="pattern-desc">Funds divided across multiple destination wallets in rapid succession, suggesting intentional obfuscation.</div>
                        <div class="pattern-meta">
                            <span class="pattern-status">Detected</span>
                            <span class="pattern-risk">+24</span>
                        </div>
                        <a href="#graph" class="pattern-link">View on graph <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                    <div class="pattern-card">
                        <div class="pattern-number">02</div>
                        <div class="pattern-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg></div>
                        <div class="pattern-name">Rapid Pass-Through</div>
                        <div class="pattern-desc">Funds moved through 5+ intermediary wallets within a 12-minute window with minimal retention time.</div>
                        <div class="pattern-meta">
                            <span class="pattern-status">Detected</span>
                            <span class="pattern-risk">+31</span>
                        </div>
                        <a href="#graph" class="pattern-link">View on graph <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                    <div class="pattern-card">
                        <div class="pattern-number">03</div>
                        <div class="pattern-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg></div>
                        <div class="pattern-name">Peel Chain</div>
                        <div class="pattern-desc">Funds repeatedly transferred through intermediary wallets while gradually separating amounts into smaller chunks.</div>
                        <div class="pattern-meta">
                            <span class="pattern-status possible">Possible</span>
                            <span class="pattern-risk">+18</span>
                        </div>
                        <a href="#graph" class="pattern-link">View on graph <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                    <div class="pattern-card">
                        <div class="pattern-number">04</div>
                        <div class="pattern-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                        <div class="pattern-name">Flagged Address Connection</div>
                        <div class="pattern-desc">Wallet has a direct transaction path to an address previously flagged in law enforcement databases.</div>
                        <div class="pattern-meta">
                            <span class="pattern-status">Detected</span>
                            <span class="pattern-risk">+14</span>
                        </div>
                        <a href="#graph" class="pattern-link">View on graph <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                </div>
            </div>

            <!-- Transaction Timeline -->
            <div class="timeline" id="timeline">
                <div class="timeline-header">
                    <h3 style="font-size:1.5rem;font-weight:700;">Transaction Timeline</h3>
                    <div class="timeline-filters">
                        <button class="filter-btn active" data-tx-filter="all">All</button>
                        <button class="filter-btn" data-tx-filter="suspicious">Suspicious Only</button>
                    </div>
                </div>
                <div class="timeline-list" id="timelineList">
                    <div class="timeline-item" data-tx-type="normal">
                        <div class="timeline-time">10:42 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x742d...f44e</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x8a3e...b21c</span></div>
                        <div class="timeline-amount">$42,000</div>
                        <div class="timeline-badge normal">Normal</div>
                    </div>
                    <div class="timeline-item" data-tx-type="suspicious">
                        <div class="timeline-time">10:47 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x8a3e...b21c</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x3f1a...c89d</span></div>
                        <div class="timeline-amount">$39,800</div>
                        <div class="timeline-badge suspicious">Suspicious</div>
                    </div>
                    <div class="timeline-item" data-tx-type="suspicious">
                        <div class="timeline-time">10:49 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x3f1a...c89d</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x5d2e...a14f</span></div>
                        <div class="timeline-amount">$19,500</div>
                        <div class="timeline-badge suspicious">Suspicious</div>
                    </div>
                    <div class="timeline-item" data-tx-type="flagged">
                        <div class="timeline-time">10:51 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x3f1a...c89d</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x9c4b...e72a</span></div>
                        <div class="timeline-amount">$19,800</div>
                        <div class="timeline-badge flagged">Fund Splitting</div>
                    </div>
                    <div class="timeline-item" data-tx-type="suspicious">
                        <div class="timeline-time">10:53 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x5d2e...a14f</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x1b7c...d35e</span></div>
                        <div class="timeline-amount">$12,300</div>
                        <div class="timeline-badge suspicious">Suspicious</div>
                    </div>
                    <div class="timeline-item" data-tx-type="normal">
                        <div class="timeline-time">11:15 AM</div>
                        <div class="timeline-tx"><span class="timeline-addr from">0x1b7c...d35e</span><span class="timeline-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="timeline-addr">0x4e9f...h68k</span></div>
                        <div class="timeline-amount">$8,200</div>
                        <div class="timeline-badge normal">Normal</div>
                    </div>
                </div>
            </div>

            <!-- Alerts -->
            <div class="alerts-section" id="alerts">
                <div class="section-header" style="text-align:left;margin-bottom:2rem;">
                    <h3 class="section-title" style="font-size:1.75rem;">Investigation Alerts</h3>
                </div>
                <div class="alert-list">
                    <div class="alert-item">
                        <span class="alert-severity high">High Risk</span>
                        <div class="alert-content">
                            <div class="alert-text">Multiple intermediary wallets detected in rapid succession</div>
                            <div class="alert-time">10:47 AM — Pattern Analysis</div>
                        </div>
                        <a href="#graph" class="alert-action">Investigate →</a>
                    </div>
                    <div class="alert-item">
                        <span class="alert-severity medium">Medium Risk</span>
                        <div class="alert-content">
                            <div class="alert-text">Unusual transaction frequency: 6 transactions in 11 minutes</div>
                            <div class="alert-time">10:49 AM — Frequency Analysis</div>
                        </div>
                        <a href="#timeline" class="alert-action">Investigate →</a>
                    </div>
                    <div class="alert-item">
                        <span class="alert-severity high">High Risk</span>
                        <div class="alert-content">
                            <div class="alert-text">Connection to previously flagged wallet 0x9c4b...e72a</div>
                            <div class="alert-time">10:51 AM — Database Cross-Reference</div>
                        </div>
                        <a href="#graph" class="alert-action">Investigate →</a>
                    </div>
                    <div class="alert-item">
                        <span class="alert-severity low">Low Risk</span>
                        <div class="alert-content">
                            <div class="alert-text">Large transaction volume detected ($42,000 initial transfer)</div>
                            <div class="alert-time">10:42 AM — Volume Analysis</div>
                        </div>
                        <a href="#timeline" class="alert-action">Investigate →</a>
                    </div>
                </div>
            </div>

            <!-- Case Panel -->
            <div class="case-panel" id="case">
                <div class="case-header">
                    <h3 class="case-title">Active Investigation</h3>
                    <div class="case-actions">
                        <button class="btn btn-secondary btn-sm" id="saveInvestigation"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Investigation</button>
                        <button class="btn btn-primary btn-sm" id="exportReport"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Export Report</button>
                    </div>
                </div>
                <div class="case-grid">
                    <div class="case-field">
                        <span class="case-field-label">Case ID</span>
                        <span class="case-field-value">CS-2026-0142</span>
                    </div>
                    <div class="case-field">
                        <span class="case-field-label">Target Wallet</span>
                        <span class="case-field-value accent">0x742d...f44e</span>
                    </div>
                    <div class="case-field">
                        <span class="case-field-label">Blockchain</span>
                        <span class="case-field-value">Ethereum</span>
                    </div>
                    <div class="case-field">
                        <span class="case-field-label">Investigation Started</span>
                        <span class="case-field-value">Today</span>
                    </div>
                    <div class="case-field">
                        <span class="case-field-label">Current Status</span>
                        <span class="case-field-value accent">Analyzing</span>
                    </div>
                    <div class="case-field">
                        <span class="case-field-label">Risk Score</span>
                        <span class="case-field-value warning">87 / 100</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Side Panel -->
    <div class="side-panel-overlay" id="sidePanelOverlay"></div>
    <div class="side-panel" id="sidePanel" role="dialog" aria-label="Wallet details">
        <div class="side-panel-header">
            <h3 class="side-panel-title">Wallet Details</h3>
            <button class="side-panel-close" id="sidePanelClose" aria-label="Close panel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        </div>
        <div id="sidePanelContent">
            <div class="wallet-detail-row"><span class="wallet-detail-label">Address</span><span class="wallet-detail-value" id="panelAddress">0x742d...f44e</span></div>
            <div class="wallet-detail-row"><span class="wallet-detail-label">Risk Score</span><span class="wallet-detail-value accent" id="panelRisk">87/100</span></div>
            <div class="wallet-detail-row"><span class="wallet-detail-label">Status</span><span class="wallet-detail-value warning" id="panelStatus">High Risk</span></div>
            <div class="wallet-detail-row"><span class="wallet-detail-label">Transactions</span><span class="wallet-detail-value" id="panelTx">247</span></div>
            <div class="wallet-detail-row"><span class="wallet-detail-label">Linked Wallets</span><span class="wallet-detail-value" id="panelLinked">14</span></div>
            <div class="wallet-detail-row"><span class="wallet-detail-label">Total Volume</span><span class="wallet-detail-value" id="panelVolume">$1.42M</span></div>
            <div style="margin-top:1.5rem;">
                <span class="wallet-detail-label" style="display:block;margin-bottom:0.5rem;">Detected Patterns</span>
                <div class="pattern-tags" id="panelPatterns">
                    <span class="pattern-tag">Fund Splitting</span>
                    <span class="pattern-tag">Rapid Pass-Through</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Tooltip -->
    <div class="tooltip" id="graphTooltip">
        <div class="tooltip-title" id="tooltipTitle">Wallet</div>
        <div class="tooltip-row"><span class="tooltip-label">Risk Score</span><span class="tooltip-value" id="tooltipRisk">--</span></div>
        <div class="tooltip-row"><span class="tooltip-label">Incoming</span><span class="tooltip-value" id="tooltipIn">--</span></div>
        <div class="tooltip-row"><span class="tooltip-label">Outgoing</span><span class="tooltip-value" id="tooltipOut">--</span></div>
        <div class="tooltip-row"><span class="tooltip-label">Volume</span><span class="tooltip-value" id="tooltipVol">--</span></div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container" id="toastContainer"></div>

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
    <section class="how-section">
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
    <section class="tech-section">
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
                        <li><a href="#investigate">Investigate</a></li>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#graph">Transaction Graph</a></li>
                        <li><a href="#alerts">Alerts</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-col-title">Resources</h4>
                    <ul class="footer-links">
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">API Reference</a></li>
                        <li><a href="#">Pattern Library</a></li>
                        <li><a href="#">Case Studies</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-col-title">Company</h4>
                    <ul class="footer-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#">Contact</a></li>
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

export default function LandingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const boot = async () => {
      // 1. Load dependencies
      await loadScript("https://unpkg.com/lucide@latest");
      await loadScript("https://d3js.org/d3.v7.min.js");
      
      // 2. Initialize icons
      if (window.lucide) window.lucide.createIcons();

      // 3. Load your custom logic from the public folder
      await loadScript("/chainsleuth-logic.js");
    };

    boot();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="chainsleuth-wrapper"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }} 
    />
  );
}