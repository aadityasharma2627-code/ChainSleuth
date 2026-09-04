 const demoData = {
        targetWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        riskScore: 87,
        transactions: 247,
        linkedWallets: 34,
        flaggedConnections: 8,
        totalVolume: "$1.42M",
        nodes: [
            { id: "0x742d...f44e", label: "0x742d...f44e", type: "target", risk: 87, tx: 247, volume: "$1.42M", incoming: 89, outgoing: 158 },
            { id: "0x8a3e...b21c", label: "0x8a3e...b21c", type: "suspicious", risk: 72, tx: 134, volume: "$892K", incoming: 45, outgoing: 89 },
            { id: "0x3f1a...c89d", label: "0x3f1a...c89d", type: "suspicious", risk: 68, tx: 98, volume: "$654K", incoming: 32, outgoing: 66 },
            { id: "0x5d2e...a14f", label: "0x5d2e...a14f", type: "normal", risk: 23, tx: 45, volume: "$210K", incoming: 20, outgoing: 25 },
            { id: "0x9c4b...e72a", label: "0x9c4b...e72a", type: "flagged", risk: 95, tx: 312, volume: "$2.1M", incoming: 156, outgoing: 156 },
            { id: "0x1b7c...d35e", label: "0x1b7c...d35e", type: "normal", risk: 18, tx: 34, volume: "$145K", incoming: 15, outgoing: 19 },
            { id: "0x4e9f...h68k", label: "0x4e9f...h68k", type: "normal", risk: 12, tx: 22, volume: "$89K", incoming: 10, outgoing: 12 },
            { id: "0x7a2d...k91m", label: "0x7a2d...k91m", type: "suspicious", risk: 61, tx: 78, volume: "$432K", incoming: 30, outgoing: 48 },
            { id: "0x2c5f...n34p", label: "0x2c5f...n34p", type: "normal", risk: 15, tx: 28, volume: "$112K", incoming: 12, outgoing: 16 },
            { id: "0x6b8e...q67r", label: "0x6b8e...q67r", type: "suspicious", risk: 74, tx: 156, volume: "$987K", incoming: 67, outgoing: 89 },
            { id: "0x3d1a...s89t", label: "0x3d1a...s89t", type: "normal", risk: 22, tx: 41, volume: "$198K", incoming: 18, outgoing: 23 },
            { id: "0x9f4c...u12v", label: "0x9f4c...u12v", type: "flagged", risk: 91, tx: 267, volume: "$1.8M", incoming: 134, outgoing: 133 },
            { id: "0x1e8b...w45x", label: "0x1e8b...w45x", type: "normal", risk: 19, tx: 37, volume: "$167K", incoming: 16, outgoing: 21 },
            { id: "0x5c2d...y78z", label: "0x5c2d...y78z", type: "suspicious", risk: 55, tx: 67, volume: "$345K", incoming: 28, outgoing: 39 },
            { id: "0x8a1f...a23b", label: "0x8a1f...a23b", type: "normal", risk: 14, tx: 25, volume: "$98K", incoming: 11, outgoing: 14 },
            { id: "0x4b7e...c56d", label: "0x4b7e...c56d", type: "suspicious", risk: 63, tx: 89, volume: "$456K", incoming: 35, outgoing: 54 },
            { id: "0x2f9a...e89f", label: "0x2f9a...e89f", type: "normal", risk: 21, tx: 38, volume: "$176K", incoming: 17, outgoing: 21 },
            { id: "0x7c3b...g12h", label: "0x7c3b...g12h", type: "flagged", risk: 88, tx: 198, volume: "$1.3M", incoming: 99, outgoing: 99 },
            { id: "0x1d5e...i34j", label: "0x1d5e...i34j", type: "normal", risk: 16, tx: 29, volume: "$123K", incoming: 13, outgoing: 16 },
            { id: "0x6a4c...k56l", label: "0x6a4c...k56l", type: "suspicious", risk: 58, tx: 72, volume: "$378K", incoming: 30, outgoing: 42 },
            { id: "0x3b8f...m78n", label: "0x3b8f...m78n", type: "normal", risk: 20, tx: 35, volume: "$156K", incoming: 15, outgoing: 20 },
            { id: "0x9e2a...o90p", label: "0x9e2a...o90p", type: "suspicious", risk: 69, tx: 103, volume: "$567K", incoming: 42, outgoing: 61 },
            { id: "0x5d1c...q12r", label: "0x5d1c...q12r", type: "normal", risk: 13, tx: 24, volume: "$92K", incoming: 10, outgoing: 14 },
            { id: "0x2a7f...s34t", label: "0x2a7f...s34t", type: "flagged", risk: 93, tx: 245, volume: "$1.9M", incoming: 123, outgoing: 122 },
            { id: "0x8b3d...u56v", label: "0x8b3d...u56v", type: "normal", risk: 17, tx: 31, volume: "$134K", incoming: 14, outgoing: 17 },
            { id: "0x4c9e...w78x", label: "0x4c9e...w78x", type: "suspicious", risk: 52, tx: 61, volume: "$312K", incoming: 25, outgoing: 36 },
            { id: "0x1f6b...y90z", label: "0x1f6b...y90z", type: "normal", risk: 11, tx: 19, volume: "$76K", incoming: 8, outgoing: 11 },
            { id: "0x7e4a...a12b", label: "0x7e4a...a12b", type: "suspicious", risk: 66, tx: 84, volume: "$423K", incoming: 33, outgoing: 51 },
            { id: "0x3c8d...c34e", label: "0x3c8d...c34e", type: "normal", risk: 24, tx: 43, volume: "$187K", incoming: 19, outgoing: 24 },
            { id: "0x9a1f...e56f", label: "0x9a1f...e56f", type: "flagged", risk: 89, tx: 201, volume: "$1.4M", incoming: 101, outgoing: 100 },
            { id: "0x5b2e...g78h", label: "0x5b2e...g78h", type: "normal", risk: 15, tx: 27, volume: "$108K", incoming: 12, outgoing: 15 },
            { id: "0x2d7c...i90j", label: "0x2d7c...i90j", type: "suspicious", risk: 57, tx: 69, volume: "$356K", incoming: 28, outgoing: 41 }
        ],
        links: [
            { source: "0x742d...f44e", target: "0x8a3e...b21c", value: 42000 },
            { source: "0x8a3e...b21c", target: "0x3f1a...c89d", value: 39800 },
            { source: "0x3f1a...c89d", target: "0x5d2e...a14f", value: 19500 },
            { source: "0x3f1a...c89d", target: "0x9c4b...e72a", value: 19800 },
            { source: "0x5d2e...a14f", target: "0x1b7c...d35e", value: 12300 },
            { source: "0x1b7c...d35e", target: "0x4e9f...h68k", value: 8200 },
            { source: "0x8a3e...b21c", target: "0x7a2d...k91m", value: 25400 },
            { source: "0x7a2d...k91m", target: "0x2c5f...n34p", value: 11200 },
            { source: "0x3f1a...c89d", target: "0x6b8e...q67r", value: 15600 },
            { source: "0x6b8e...q67r", target: "0x3d1a...s89t", value: 8900 },
            { source: "0x9c4b...e72a", target: "0x9f4c...u12v", value: 23400 },
            { source: "0x9f4c...u12v", target: "0x1e8b...w45x", value: 10200 },
            { source: "0x6b8e...q67r", target: "0x5c2d...y78z", value: 18700 },
            { source: "0x5c2d...y78z", target: "0x8a1f...a23b", value: 7600 },
            { source: "0x7a2d...k91m", target: "0x4b7e...c56d", value: 21300 },
            { source: "0x4b7e...c56d", target: "0x2f9a...e89f", value: 9800 },
            { source: "0x9c4b...e72a", target: "0x7c3b...g12h", value: 31200 },
            { source: "0x7c3b...g12h", target: "0x1d5e...i34j", value: 13400 },
            { source: "0x4b7e...c56d", target: "0x6a4c...k56l", value: 16500 },
            { source: "0x6a4c...k56l", target: "0x3b8f...m78n", value: 7200 },
            { source: "0x6b8e...q67r", target: "0x9e2a...o90p", value: 19800 },
            { source: "0x9e2a...o90p", target: "0x5d1c...q12r", value: 8100 },
            { source: "0x9f4c...u12v", target: "0x2a7f...s34t", value: 27800 },
            { source: "0x2a7f...s34t", target: "0x8b3d...u56v", value: 11200 },
            { source: "0x7c3b...g12h", target: "0x4c9e...w78x", value: 18900 },
            { source: "0x4c9e...w78x", target: "0x1f6b...y90z", value: 6500 },
            { source: "0x2a7f...s34t", target: "0x7e4a...a12b", value: 22300 },
            { source: "0x7e4a...a12b", target: "0x3c8d...c34e", value: 9800 },
            { source: "0x9f4c...u12v", target: "0x9a1f...e56f", value: 25600 },
            { source: "0x9a1f...e56f", target: "0x5b2e...g78h", value: 10800 },
            { source: "0x7e4a...a12b", target: "0x2d7c...i90j", value: 17600 },
            { source: "0x2d7c...i90j", target: "0x5d1c...q12r", value: 7400 }
        ]
    };

    // State
    let currentFilter = 'all';
    let currentTxFilter = 'all';
    let graphZoom = d3.zoomIdentity;
    let selectedNode = null;

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadDemoBtn = document.getElementById('loadDemoBtn');
    const heroDemoBtn = document.getElementById('heroDemoBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const dashboard = document.getElementById('dashboard');
    const walletInput = document.getElementById('walletInput');
    const sidePanel = document.getElementById('sidePanel');
    const sidePanelOverlay = document.getElementById('sidePanelOverlay');
    const sidePanelClose = document.getElementById('sidePanelClose');
    const toastContainer = document.getElementById('toastContainer');

    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const expanded = mobileMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Toast notification
    function showToast(message, icon = 'check-circle') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></span>
            <span class="toast-text">${message}</span>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Loading sequence
    function runLoadingSequence(callback) {
        loadingOverlay.classList.add('active');
        const steps = [
            { id: 'step1', text: 'Fetching blockchain data...', delay: 0 },
            { id: 'step2', text: 'Mapping wallet relationships...', delay: 800 },
            { id: 'step3', text: 'Scanning transaction patterns...', delay: 1600 },
            { id: 'step4', text: 'Calculating suspicion score...', delay: 2400 }
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                document.querySelectorAll('.loading-step').forEach((el, i) => {
                    if (i < index) {
                        el.classList.remove('active');
                        el.classList.add('done');
                    } else if (i === index) {
                        el.classList.add('active');
                        el.classList.remove('done');
                    } else {
                        el.classList.remove('active', 'done');
                    }
                });
                document.getElementById('loadingText').innerHTML = `<strong>Analyzing</strong> ${step.text}`;
            }, step.delay);
        });

        setTimeout(() => {
            loadingOverlay.classList.remove('active');
            document.querySelectorAll('.loading-step').forEach(el => el.classList.remove('active', 'done'));
            document.getElementById('step1').classList.add('active');
            if (callback) callback();
        }, 3200);
    }

    // Show dashboard
    function showDashboard() {
        dashboard.classList.add('active');
        dashboard.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            animateRiskScore(87);
            renderMainGraph();
        }, 500);
    }

    // Risk score animation
    function animateRiskScore(target) {
        const numEl = document.getElementById('riskScoreNum');
        const fillEl = document.getElementById('riskGaugeFill');
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (target / 100) * circumference;

        let current = 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.round(easeOut * target);
            numEl.textContent = current;
            fillEl.style.strokeDashoffset = circumference - (current / 100) * circumference;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Analyze button
    analyzeBtn.addEventListener('click', () => {
        const address = walletInput.value.trim();
        if (!address || address.length < 10) {
            showToast('Please enter a valid wallet address');
            walletInput.focus();
            return;
        }
        runLoadingSequence(showDashboard);
    });

    // Demo buttons
    loadDemoBtn.addEventListener('click', () => {
        walletInput.value = demoData.targetWallet;
        runLoadingSequence(showDashboard);
    });

    heroDemoBtn.addEventListener('click', () => {
        walletInput.value = demoData.targetWallet;
        runLoadingSequence(showDashboard);
    });

    // Side panel
    function openSidePanel(nodeData) {
        document.getElementById('panelAddress').textContent = nodeData.id;
        document.getElementById('panelRisk').textContent = nodeData.risk + '/100';
        document.getElementById('panelStatus').textContent = nodeData.type === 'flagged' ? 'Flagged' : nodeData.type === 'suspicious' ? 'Suspicious' : 'Normal';
        document.getElementById('panelTx').textContent = nodeData.tx;
        document.getElementById('panelLinked').textContent = Math.floor(nodeData.tx / 8);
        document.getElementById('panelVolume').textContent = nodeData.volume;

        const patternsEl = document.getElementById('panelPatterns');
        patternsEl.innerHTML = '';
        if (nodeData.type === 'suspicious' || nodeData.type === 'flagged') {
            const patterns = ['Fund Splitting', 'Rapid Pass-Through', 'Peel Chain'];
            const count = nodeData.type === 'flagged' ? 3 : Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < count; i++) {
                const tag = document.createElement('span');
                tag.className = 'pattern-tag';
                tag.textContent = patterns[i];
                patternsEl.appendChild(tag);
            }
        } else {
            const tag = document.createElement('span');
            tag.className = 'pattern-tag';
            tag.style.background = 'rgba(34,197,94,0.1)';
            tag.style.borderColor = 'rgba(34,197,94,0.2)';
            tag.style.color = 'var(--success)';
            tag.textContent = 'No suspicious patterns';
            patternsEl.appendChild(tag);
        }

        sidePanel.classList.add('active');
        sidePanelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidePanel() {
        sidePanel.classList.remove('active');
        sidePanelOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    sidePanelClose.addEventListener('click', closeSidePanel);
    sidePanelOverlay.addEventListener('click', closeSidePanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidePanel();
    });

    // Save investigation
    document.getElementById('saveInvestigation').addEventListener('click', () => {
        showToast('Investigation saved to case file CS-2026-0142');
    });

    // Export report
    document.getElementById('exportReport').addEventListener('click', () => {
        const reportContent = `CHAIN SLEUTH INVESTIGATION REPORT
================================
Case ID: CS-2026-0142
Target: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
Blockchain: Ethereum
Date: ${new Date().toLocaleDateString()}

RISK ASSESSMENT
---------------
Suspicion Score: 87/100 (HIGH RISK)

DETECTED PATTERNS
-----------------
1. Fund Splitting (+24)
2. Rapid Pass-Through (+31)
3. Peel Chain (+18)
4. Flagged Address Connection (+14)

STATISTICS
----------
Transactions Analyzed: 247
Linked Wallets: 34
Flagged Connections: 8
Total Volume: $1.42M

DISCLAIMER
----------
This report identifies suspicious patterns in publicly available blockchain data. 
It does not make legal determinations or accusations. All findings should be 
reviewed by a qualified human investigator.
`;
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ChainSleuth_Report_CS-2026-0142.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Report exported successfully');
    });

    // Timeline filtering
    document.querySelectorAll('[data-tx-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-tx-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.txFilter;
            document.querySelectorAll('.timeline-item').forEach(item => {
                if (filter === 'all' || item.dataset.txType === 'suspicious' || item.dataset.txType === 'flagged') {
                    item.style.display = filter === 'all' ? 'grid' : (item.dataset.txType === 'suspicious' || item.dataset.txType === 'flagged') ? 'grid' : 'none';
                }
                if (filter === 'all') item.style.display = 'grid';
            });
        });
    });

    // Hero Graph (simplified animated network)
    function renderHeroGraph() {
        const svg = d3.select('#heroGraph');
        const width = 500;
        const height = 500;
        svg.attr('viewBox', `0 0 ${width} ${height}`);

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

        // Draw links
        svg.selectAll('.hero-link')
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

        // Animate links
        svg.selectAll('.hero-link')
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attrTween('stroke-dashoffset', function() {
                return d3.interpolate(20, 0);
            })
            .on('end', function repeat() {
                d3.select(this)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeLinear)
                    .attrTween('stroke-dashoffset', function() {
                        return d3.interpolate(20, 0);
                    })
                    .on('end', repeat);
            });

        // Draw nodes
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

        // Pulse animation for target node
        const targetNode = nodeGroups.filter(d => d.type === 'target');
        targetNode.append('circle')
            .attr('r', 24)
            .attr('fill', 'none')
            .attr('stroke', '#B6FF00')
            .attr('stroke-width', 2)
            .attr('opacity', 0.8)
            .transition()
            .duration(2000)
            .ease(d3.easeSinOut)
            .attr('r', 48)
            .attr('opacity', 0)
            .on('end', function repeat() {
                d3.select(this)
                    .attr('r', 24)
                    .attr('opacity', 0.8)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeSinOut)
                    .attr('r', 48)
                    .attr('opacity', 0)
                    .on('end', repeat);
            });

        // Labels
        nodeGroups.append('text')
            .attr('dy', 45)
            .attr('text-anchor', 'middle')
            .attr('fill', '#8B9499')
            .attr('font-size', '11px')
            .attr('font-family', 'JetBrains Mono, monospace')
            .text(d => `Wallet ${d.id}`);
    }

    // Main Transaction Graph
    let mainGraphSvg, mainGraphG, simulation;

    function renderMainGraph() {
        const container = document.getElementById('graphContainer');
        const width = container.clientWidth;
        const height = container.clientHeight;

        d3.select('#txGraph').selectAll('*').remove();

        mainGraphSvg = d3.select('#txGraph')
            .attr('width', width)
            .attr('height', height);

        // Define arrow marker
        mainGraphSvg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 28)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', 'rgba(255,255,255,0.2)');

        mainGraphG = mainGraphSvg.append('g');

        const zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on('zoom', (event) => {
                graphZoom = event.transform;
                mainGraphG.attr('transform', event.transform);
            });

        mainGraphSvg.call(zoom);

        // Filter nodes based on current filter
        let filteredNodes = demoData.nodes;
        let filteredLinks = demoData.links;

        if (currentFilter !== 'all') {
            filteredNodes = demoData.nodes.filter(n => n.type === currentFilter);
            const nodeIds = new Set(filteredNodes.map(n => n.id));
            filteredLinks = demoData.links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target));
        }

        // Create node and link data for D3
        const nodes = filteredNodes.map(n => ({ ...n }));
        const links = filteredLinks.map(l => ({
            source: typeof l.source === 'string' ? l.source : l.source.id,
            target: typeof l.target === 'string' ? l.target : l.target.id,
            value: l.value
        }));

        // Resolve link references
        links.forEach(link => {
            link.source = nodes.find(n => n.id === link.source) || link.source;
            link.target = nodes.find(n => n.id === link.target) || link.target;
        });

        // Force simulation
        simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(35));

        // Draw links
        const link = mainGraphG.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', d => {
                const sourceType = typeof d.source === 'object' ? d.source.type : 'normal';
                const targetType = typeof d.target === 'object' ? d.target.type : 'normal';
                if (sourceType === 'flagged' || targetType === 'flagged') return '#EF4444';
                if (sourceType === 'suspicious' || targetType === 'suspicious') return '#FF6B35';
                return 'rgba(255,255,255,0.15)';
            })
            .attr('stroke-width', d => Math.max(1, Math.log10(d.value / 1000)))
            .attr('stroke-opacity', 0.6)
            .attr('marker-end', 'url(#arrow)');

        // Draw nodes
        const node = mainGraphG.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('cursor', 'pointer')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Node circles
        node.append('circle')
            .attr('r', d => d.type === 'target' ? 22 : 16)
            .attr('fill', d => {
                if (d.type === 'flagged') return '#EF4444';
                if (d.type === 'suspicious') return '#FF6B35';
                if (d.type === 'target') return '#B6FF00';
                return 'rgba(255,255,255,0.1)';
            })
            .attr('fill-opacity', d => d.type === 'normal' ? 0.3 : 0.2)
            .attr('stroke', d => {
                if (d.type === 'flagged') return '#EF4444';
                if (d.type === 'suspicious') return '#FF6B35';
                if (d.type === 'target') return '#B6FF00';
                return 'rgba(255,255,255,0.3)';
            })
            .attr('stroke-width', 2);

        // Node labels
        node.append('text')
            .attr('dy', d => d.type === 'target' ? 38 : 30)
            .attr('text-anchor', 'middle')
            .attr('fill', '#F4F7F5')
            .attr('font-size', '10px')
            .attr('font-family', 'JetBrains Mono, monospace')
            .attr('font-weight', '600')
            .text(d => d.label);

        // Risk indicator on node
        node.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .attr('fill', d => d.type === 'flagged' ? '#EF4444' : d.type === 'suspicious' ? '#FF6B35' : '#B6FF00')
            .attr('font-size', '9px')
            .attr('font-family', 'JetBrains Mono, monospace')
            .attr('font-weight', '700')
            .text(d => d.type === 'normal' ? '' : d.risk);

        // Tooltip
        const tooltip = d3.select('#graphTooltip');

        node.on('mouseenter', function(event, d) {
            tooltip.style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .classed('visible', true);
            document.getElementById('tooltipTitle').textContent = d.id;
            document.getElementById('tooltipRisk').textContent = d.risk + '/100';
            document.getElementById('tooltipRisk').style.color = d.type === 'flagged' ? '#EF4444' : d.type === 'suspicious' ? '#FF6B35' : '#B6FF00';
            document.getElementById('tooltipIn').textContent = d.incoming;
            document.getElementById('tooltipOut').textContent = d.outgoing;
            document.getElementById('tooltipVol').textContent = d.volume;

            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('r', d.type === 'target' ? 26 : 20)
                .attr('stroke-width', 3);
        })
        .on('mousemove', function(event) {
            tooltip.style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseleave', function(event, d) {
            tooltip.classed('visible', false);
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('r', d.type === 'target' ? 22 : 16)
                .attr('stroke-width', 2);
        })
        .on('click', function(event, d) {
            event.stopPropagation();
            selectedNode = d;
            openSidePanel(d);
        });

        // Click on background to deselect
        mainGraphSvg.on('click', () => {
            selectedNode = null;
        });

        // Update positions
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    // Graph filter buttons
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMainGraph();
        });
    });

    // Graph controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        mainGraphSvg.transition().duration(300).call(
            d3.zoom().transform,
            graphZoom.scale(graphZoom.k * 1.3)
        );
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        mainGraphSvg.transition().duration(300).call(
            d3.zoom().transform,
            graphZoom.scale(graphZoom.k / 1.3)
        );
    });

    document.getElementById('resetGraph').addEventListener('click', () => {
        mainGraphSvg.transition().duration(500).call(
            d3.zoom().transform,
            d3.zoomIdentity
        );
        if (simulation) {
            simulation.alpha(1).restart();
        }
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        renderHeroGraph();
    });