import pandas as pd
import random

safe_data = []
ransom_data = []

# ---------------- SAFE NORMAL ACTIVITY ----------------
for _ in range(300):
    safe_data.append([
        random.randint(1, 25),                    # low file activity
        random.randint(0, 4),                    # few renames
        round(random.uniform(0.05, 0.25), 2),     # low entropy change
        0,                                        # honeypot untouched
        0                                         # LABEL SAFE
    ])

# ---------------- SAFE BUT HEAVY ACTIVITY (CONFUSING) ----------------
for _ in range(220):
    safe_data.append([
        random.randint(40, 120),                 # high writes like developer / editing / syncing
        random.randint(5, 25),                   # renames but human-like
        round(random.uniform(0.25, 0.55), 2),    # medium entropy (compressed files, media edits)
        0,                                       # still does NOT touch honeypot
        0
    ])

# ---------------- NORMAL RANSOMWARE (FAST ATTACK) ----------------
for _ in range(280):
    ransom_data.append([
        random.randint(120, 220),                # massive file changes
        random.randint(40, 120),                 # lots of renames
        round(random.uniform(0.70, 1.00), 2),    # very high entropy change
        1,                                       # honeypot triggered
        1                                        # LABEL RANSOMWARE
    ])

# ---------------- STEALTH RANSOMWARE (SLOW + SMART) ----------------
for _ in range(200):
    ransom_data.append([
        random.randint(40, 110),                 # looks moderate like normal user
        random.randint(5, 25),                   # few renames
        round(random.uniform(0.35, 0.65), 2),    # medium-high entropy
        random.randint(0, 1),                    # may OR may not hit honeypot
        1
    ])

# ---------------- COMBINE ----------------
dataset = safe_data + ransom_data
random.shuffle(dataset)

df = pd.DataFrame(dataset, columns=[
    "files_per_sec",
    "rename_count",
    "entropy_change",
    "honeypot",
    "label"
])

df.to_csv("dataset.csv", index=False)
print("Realistic ransomware dataset generated successfully!")
print("Total Records:", len(df))
print("Safe:", len(safe_data))
print("Ransomware:", len(ransom_data))

