import os
from datetime import datetime

def save_snapshot(info):
    os.makedirs("snapshots", exist_ok=True)
    name = datetime.now().strftime("%Y%m%d_%H%M%S.txt")
    path = f"snapshots/{name}"

    with open(path, "w") as f:
        f.write(info)

    return path
