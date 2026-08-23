from flask import Flask, request, jsonify
from neo4j import GraphDatabase
import os
from dotenv import load_dotenv
import requests
from web3 import Web3
from fraud_detection import calculate_suspicion_score
load_dotenv()

app = Flask(__name__)

class Neo4jConnection:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))
    
    def close(self):
        self.driver.close()
    
    def query(self, query, parameters=None):
        with self.driver.session() as session:
            return session.run(query, parameters or {}).data()

neo4j_conn = Neo4jConnection(
    uri=os.getenv("NEO4J_URI"),
    user=os.getenv("NEO4J_USER"),
    password=os.getenv("NEO4J_PASSWORD")
)

import requests

from web3 import Web3

def fetch_ethereum_transactions(wallet_address):
    """Return mock transactions for testing"""
    MOCK_TRANSACTIONS = {
        "0xaddress1111": [
            {"hash": "0xtx001", "to": "0xaddress2222", "value": "5000000000000000000", "timeStamp": "1692000000"},
            {"hash": "0xtx002", "to": "0xaddress3333", "value": "3000000000000000000", "timeStamp": "1692100000"},
        ],
        "0xaddress2222": [
            {"hash": "0xtx003", "to": "0xaddress4444", "value": "8000000000000000000", "timeStamp": "1692200000"},
        ],
    }
    return MOCK_TRANSACTIONS.get(wallet_address, [])

def add_wallet_to_db(address, blockchain, transactions):
    query = "MERGE (w:Wallet {address: $address, blockchain: $blockchain}) SET w.first_seen = $first_seen, w.last_seen = $last_seen, w.transaction_count = $tx_count, w.total_volume = $total_volume RETURN w"
    timestamps = [int(tx.get("timeStamp", 0)) for tx in transactions]
    first_seen = min(timestamps) if timestamps else 0
    last_seen = max(timestamps) if timestamps else 0
    total_volume = sum(float(tx.get("value", 0)) for tx in transactions) / 1e18
    params = {"address": address, "blockchain": blockchain, "first_seen": first_seen, "last_seen": last_seen, "tx_count": len(transactions), "total_volume": total_volume}
    return neo4j_conn.query(query, params)

def add_transactions_to_db(source_address, blockchain, transactions):
    for tx in transactions:
        to_address = tx.get("to")
        amount = float(tx.get("value", 0)) / 1e18
        if not to_address:
            continue
        query = "MATCH (from:Wallet {address: $from_addr}) MERGE (to:Wallet {address: $to_addr, blockchain: $blockchain}) MERGE (from)-[r:SENT_TO]->(to) SET r.amount = coalesce(r.amount, 0) + $amount, r.last_transaction = $timestamp, r.transaction_count = coalesce(r.transaction_count, 0) + 1 RETURN r"
        params = {"from_addr": source_address, "to_addr": to_address, "blockchain": blockchain, "amount": amount, "timestamp": int(tx.get("timeStamp", 0))}
        neo4j_conn.query(query, params)

@app.route('/api/wallet/analyze', methods=['POST'])
def analyze_wallet():
    try:
        data = request.json
        address = data.get("address")
        blockchain = data.get("blockchain", "ethereum").lower()
        if not address:
            return jsonify({"error": "No address provided"}), 400
        transactions = fetch_ethereum_transactions(address)
        if not transactions:
            return jsonify({"error": "No transactions found"}), 404
        add_wallet_to_db(address, blockchain, transactions)
        add_transactions_to_db(address, blockchain, transactions)
        return jsonify({"status": "success", "message": f"Analyzed {len(transactions)} transactions", "address": address, "blockchain": blockchain, "transaction_count": len(transactions)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/wallet/get', methods=['GET'])
def get_wallet():
    try:
        address = request.args.get("address")
        if not address:
            return jsonify({"error": "No address provided"}), 400
        query = "MATCH (w:Wallet {address: $address}) RETURN w.address as address, w.blockchain as blockchain, w.transaction_count as tx_count, w.total_volume as total_volume, w.first_seen as first_seen, w.last_seen as last_seen"
        result = neo4j_conn.query(query, {"address": address})
        if not result:
            return jsonify({"error": "Wallet not found"}), 404
        return jsonify(result[0]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/wallet/connections', methods=['GET'])
def get_wallet_connections():
    try:
        address = request.args.get("address")
        if not address:
            return jsonify({"error": "No address provided"}), 400
        query = "MATCH (w:Wallet {address: $address})-[r:SENT_TO]->(connected) RETURN connected.address as address, r.amount as total_sent, r.transaction_count as num_transactions, r.last_transaction as last_transaction ORDER BY r.amount DESC"
        result = neo4j_conn.query(query, {"address": address})
        return jsonify({"from_address": address, "connected_wallets": result, "total_connections": len(result)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "backend is running"}), 200

@app.route('/api/wallet/fraud-score', methods=['GET'])
def get_fraud_score():
    try:
        address = request.args.get("address")
        
        if not address:
            return jsonify({"error": "No address provided"}), 400
        
        # Get connections
        query = "MATCH (w:Wallet {address: $address})-[r:SENT_TO]->(connected) RETURN connected.address as address, r.amount as total_sent, r.transaction_count as num_transactions, r.last_transaction as last_transaction ORDER BY r.amount DESC"
        result = neo4j_conn.query(query, {"address": address})
        
        # Calculate fraud score
        fraud_data = calculate_suspicion_score(address, result)
        
        return jsonify(fraud_data), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
if __name__ == '__main__':
    print("🚀 ChainSleuth Backend (Mock Data Mode)")
    app.run(debug=True, port=5001)