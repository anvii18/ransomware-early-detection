from flask import Blueprint, jsonify
from monitor.file_monitor import start_file_monitor, stop_file_monitor, is_file_running
from monitor.honeypot_monitor import start_honeypot_monitor, stop_honeypot_monitor, is_honeypot_running
from utils.alert_store import get_alerts
from utils.killswitch import is_killswitch_active, reset_killswitch

api_bp = Blueprint("api", __name__)

@api_bp.route("/start")
def start():
    reset_killswitch()
    start_file_monitor()
    start_honeypot_monitor()
    return jsonify({"message": "Monitoring started"})

@api_bp.route("/stop")
def stop():
    stop_file_monitor()
    stop_honeypot_monitor()
    return jsonify({"message": "Monitoring stopped"})

@api_bp.route("/status")
def status():
    return jsonify({
        "file_monitor": is_file_running(),
        "honeypot_monitor": is_honeypot_running(),
        "killswitch": is_killswitch_active()
    })

@api_bp.route("/alerts")
def alerts():
    return jsonify(get_alerts())
