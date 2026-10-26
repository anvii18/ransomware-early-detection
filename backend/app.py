from __future__ import annotations

import logging
import os
import sys
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ML_DIR = PROJECT_ROOT / "ransomware_ml" / "ransomware_ml1"
sys.path.insert(0, str(ML_DIR))

from modeltest import MODEL_PATH, load_model, predict_risk  # noqa: E402
from modeltrain import train_model  # noqa: E402

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Ransomware Early Detection API",
    version="1.0.0",
    description="Educational API for testing a ransomware-risk classifier on supplied sample features.",
)

configured_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=configured_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class PredictionRequest(BaseModel):
    files_per_sec: float = Field(ge=0, le=1_000_000)
    rename_count: float = Field(ge=0, le=1_000_000)
    entropy_change: float = Field(ge=0, le=1)
    honeypot: Literal[0, 1]


@app.get("/api/health")
def health() -> dict:
    """Report API health without implying that a model has been trained."""
    return {"status": "ok", "model_ready": MODEL_PATH.is_file(), "mode": "educational_demo"}


@app.post("/api/predict")
def predict(request: PredictionRequest) -> dict:
    """Score supplied demo features; this endpoint does not monitor the host."""
    try:
        if not MODEL_PATH.is_file():
            logger.info("No trained model found; training from the bundled example dataset.")
            train_model()
        model = load_model()
        result = predict_risk(
            files_per_sec=request.files_per_sec,
            rename_count=request.rename_count,
            entropy_change=request.entropy_change,
            honeypot=request.honeypot,
            model=model,
        )
        result["mode"] = "educational_demo"
        result["disclaimer"] = (
            "This is a prediction from a small example dataset, not live endpoint monitoring "
            "or a validated ransomware-protection system."
        )
        return result
    except (FileNotFoundError, ValueError) as exc:
        logger.warning("Prediction could not be completed: %s", exc)
        raise HTTPException(
            status_code=503,
            detail="The demo model is unavailable. Check the bundled dataset and model setup.",
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected prediction failure")
        raise HTTPException(
            status_code=503,
            detail="Prediction is temporarily unavailable. Check the backend logs.",
        ) from exc
