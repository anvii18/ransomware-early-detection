import os
import time
import threading
from utils.alert_store import add_alert
from utils.logger import log_event
from utils.killswitch import is_killswitch_active, activate_killswitch

WATCH_FOLDER = r"C:\Users\rakes\simulation\demo_test_files"

_running = False


def loop():
    print("✅ FILE MONITOR STARTED")

    while _running:
        if is_killswitch_active():
            print("🛑 Kill switch active. Monitor stopped.")
            break

        try:
            files = os.listdir(WATCH_FOLDER)
            print("📁 Files:", files)

            locked_files = [f for f in files if f.endswith(".locked")]

            if locked_files:
                msg = f"RANSOMWARE BEHAVIOR DETECTED: {locked_files}"
                print("🚨 ALERT:", msg)

                log_event(msg)
                add_alert(msg)

                activate_killswitch()
                add_alert("KILL SWITCH ACTIVATED")
                print("🛑 KILL SWITCH ACTIVATED")

                break  # stop monitoring after detection

        except Exception as e:
            print("❌ MONITOR ERROR:", e)
            add_alert(f"ERROR: {e}")

        time.sleep(2)


def start_file_monitor():
    global _running
    if not _running:
        print("▶ Starting file monitor...")
        _running = True
        threading.Thread(target=loop, daemon=True).start()


def stop_file_monitor():
    global _running
    _running = False


def is_file_running():
    return _running
