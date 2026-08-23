# ChainSleuth — Blockchain Forensics Platform

Trace cryptocurrency transaction flows and expose money-laundering patterns through intelligent blockchain analysis. Features interactive wallet network visualization, real-time risk scoring, pattern detection, and Neo4j graph analytics.

## Structure
- **frontend/** — React + Vite UI with D3.js wallet graph visualization
- **backend/** — Flask API with Neo4j graph database & fraud detection

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
source env/bin/activate
python app.py
```

## Deploy
- Frontend → Vercel
- Backend → Render

Built with React, Flask, D3.js, and Neo4j.
