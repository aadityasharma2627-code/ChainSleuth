def calculate_suspicion_score(wallet_address, connected_wallets):
    """Analyze wallet connections and return suspicion score (0-100)"""
    
    score = 0
    flags = []
    
    if len(connected_wallets) > 10:
        score += 30
        flags.append("MANY_CONNECTIONS")
    
    total_sent = sum(w.get("total_sent", 0) for w in connected_wallets)
    if total_sent > 50:
        score += 25
        flags.append("HIGH_VOLUME")
    
    for wallet in connected_wallets:
        if wallet.get("num_transactions", 0) > 5:
            score += 15
            flags.append("REPEATED_TRANSACTIONS")
            break
    
    return {
        "address": wallet_address,
        "suspicion_score": min(score, 100),
        "flags": flags,
        "risk_level": "HIGH" if score > 70 else "MEDIUM" if score > 40 else "LOW"
    }