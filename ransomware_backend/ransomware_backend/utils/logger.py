import logging
import os

def setup_logger():
    os.makedirs("logs", exist_ok=True)
    logging.basicConfig(
        filename="logs/backend.log",
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s"
    )

def log_event(msg):
    print(msg)
    logging.info(msg)


