alerts = []

def add_alert(msg):
    alerts.append(msg)
    if len(alerts) > 200:
        alerts.pop(0)

def get_alerts():
    return alerts
