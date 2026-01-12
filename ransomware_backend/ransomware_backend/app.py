from flask import Flask
from flask_cors import CORS
from api.routes import api_bp
from utils.logger import setup_logger
from honeypots.honeypot_manager import deploy_honeypots

def create_app():
    app = Flask(__name__)
    CORS(app)
    setup_logger()
    deploy_honeypots()
    app.register_blueprint(api_bp, url_prefix="/api")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
