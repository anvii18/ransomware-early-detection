import os
import time
import threading
from utils.alert_store import add_alert
from utils.logger import log_event
from utils.snapshot import save_snapshot
from utils.killswitch import activate_killswitch, is_killswitch_active
from ml.model import predict_from_features

DIR = "honeypots/files"
_running = False

def loop():
    state = {os.path.join(DIR, f): os.path.getmtime(os.path.join(DIR, f))
             for f in os.listdir(DIR)}

    while _running:
        if is_killswitch_active():
            break

        for p in list(state.keys()):
            try:
                new = os.path.getmtime(p)
                if new != state[p]:
                    features = [1, 0, 1, 0]
                    risk = predict_from_features(features)

                    msg = f"Honeypot modified: {p} | risk={risk:.2f}"
                    log_event(msg)
                    add_alert(msg)
                    save_snapshot(msg)

                    if risk > 0.7:
                        activate_killswitch("Ransomware behavior on honeypot")

                    state[p] = new
            except:
                msg = f"Honeypot deleted: {p}"
                log_event(msg)
                add_alert(msg)
                activate_killswitch("Honeypot deleted")

        time.sleep(2)

def start_honeypot_monitor():
    global _running
    if not _running:
        _running = True
        threading.Thread(target=loop, daemon=True).start()

def stop_honeypot_monitor():
    global _running
    _running = False

def is_honeypot_running():
    return _running
