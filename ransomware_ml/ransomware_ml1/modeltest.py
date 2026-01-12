import pickle

# ---------------- LOAD MODEL ----------------
with open("ransomware_model.pkl", "rb") as f:
    model = pickle.load(f)

def test(files_per_sec, rename_count, entropy_change, honeypot):
    features = [[files_per_sec, rename_count, entropy_change, honeypot]]

    # ---- PREDICTION ----
    prediction = model.predict(features)[0]   # 0 = Safe , 1 = Ransomware

    # ---- PROBABILITY ----
    proba = model.predict_proba(features)[0]
    safe_prob = proba[0]
    ransomware_prob = proba[1]

    # Convert to percentage form
    safe_percent = safe_prob * 100
    ransom_percent = ransomware_prob * 100

    # ---------------- RISK SCORE LOGIC ----------------
    # Convert ransomware probability → 0–100 human friendly risk
    if ransomware_prob < 0.10:
        risk_score = int(ransomware_prob * 200)                  # 0 – 20
    elif ransomware_prob < 0.40:
        risk_score = int(20 + (ransomware_prob - 0.10) * 133)    # 20 – 60
    else:
        risk_score = int(60 + (ransomware_prob - 0.40) * 67)     # 60 – 100

    # ---- STATUS ----
    status = "Ransomware" if prediction == 1 else "Safe"

    # ---- THREAT LEVEL ----
    if risk_score < 25:
        level = "LOW RISK — Normal Behavior"
    elif risk_score < 60:
        level = "SUSPICIOUS — Monitor Activity"
    else:
        level = "HIGH RISK — Ransomware"

    # ----------- OUTPUT ----------
    print("\n========== ML RESULT ==========")
    print(f"Files / Sec   : {files_per_sec}")
    print(f"Renames       : {rename_count}")
    print(f"Entropy       : {entropy_change}")
    print(f"Honeypot Hit  : {honeypot}")
    print("--------------------------------")
    print(f"Status        : {status}")
    print(f"Risk Score    : {risk_score} / 100")
    print(f"Threat Level  : {level}")
    print("--------------------------------")
    print(f"Safe Probability        : {safe_percent:.2f}%")
    print(f"Ransomware Probability  : {ransom_percent:.2f}%")
    print("================================\n")


# ---------------- SAMPLE TESTS ----------------
# test(5, 1, 0.10, 0)         # Safe
#test(25, 7, 0.45, 0)        # Suspicious / usually safe   # Ransomware high risk
