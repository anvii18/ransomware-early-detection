from utils.alert_store import add_alert
from utils.logger import log_event

_kill_active = False

def activate_killswitch(reason="Threat detected"):
    global _kill_active
    if not _kill_active:
        _kill_active = True
        msg = f"🚨 KILL SWITCH ACTIVATED: {reason}"
        log_event(msg)
        add_alert(msg)

def reset_killswitch():
    global _kill_active
    _kill_active = False

def is_killswitch_active():
    return _kill_active
