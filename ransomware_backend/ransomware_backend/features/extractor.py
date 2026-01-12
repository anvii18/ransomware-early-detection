def extract_features(events):
    """
    Take raw file events and compute features for ML model
    """
    if not events:
        return {"files_per_sec":0, "rename_count":0, "entropy_change":0, "honeypot":0}

    files_per_sec = sum(e["files_per_sec"] for e in events) / len(events)
    rename_count = sum(e["rename_count"] for e in events) / len(events)
    entropy_change = sum(e["entropy_change"] for e in events) / len(events)
    honeypot = 1 if any(e["honeypot"]==1 for e in events) else 0

    return {
        "files_per_sec": round(files_per_sec,2),
        "rename_count": round(rename_count,2),
        "entropy_change": round(entropy_change,2),
        "honeypot": honeypot
    }
