import os
import time
import random
import string
from datetime import datetime

BASE_DIR = os.path.dirname(_file_)  # simulation folder
TARGET_FOLDER = os.path.join(BASE_DIR, "demo_test_files")


LOG_FILE = "simulator.log"


def log(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"{datetime.now()} | {msg}\n")
    print(msg)


def fake_encrypt(path):
    # SAFE: only appends random text (no real encryption)
    with open(path, "a", encoding="utf-8", errors="ignore") as f:
        f.write("\n" + "".join(
            random.choices(string.ascii_letters + string.digits, k=60)
        ))


def run():
    log("=== Simulator started (SAFE DEMO MODE) ===")
    log(f"Target folder: {TARGET_FOLDER}")

    if not os.path.exists(TARGET_FOLDER):
        log("ERROR: Target folder does not exist!")
        return

    while True:
        for filename in os.listdir(TARGET_FOLDER):
            path = os.path.join(TARGET_FOLDER, filename)

            if os.path.isfile(path) and not filename.endswith(".locked"):
                try:
                    fake_encrypt(path)
                    new_path = path + ".locked"
                    os.rename(path, new_path)
                    log(f"Locked file: {filename}")
                    time.sleep(1)
                except Exception as e:
                    log(f"Error processing {filename}: {e}")

        time.sleep(2)


if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        log("=== Simulator stopped by user ===")
