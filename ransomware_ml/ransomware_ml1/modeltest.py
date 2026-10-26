from __future__ import annotations

import pickle
from pathlib import Path
from typing import Any

HERE = Path(__file__).resolve().parent
MODEL_PATH = HERE / "ransomware_model.pkl"


def load_model(model_path: Path = MODEL_PATH) -> Any:
    """Load a locally trained model. Only load pickle files you trust."""
    if not model_path.is_file():
        raise FileNotFoundError(
            f"Trained model not found at {model_path}. Run modeltrain.py first."
        )
    with model_path.open("rb") as model_file:
        model = pickle.load(model_file)
    if not hasattr(model, "predict") or not hasattr(model, "predict_proba"):
        raise TypeError("The saved artifact is not a compatible classifier.")
    return model


def risk_level(risk_score: int) -> str:
    if risk_score < 25:
        return "LOW RISK — Normal Behavior"
    if risk_score < 60:
        return "SUSPICIOUS — Monitor Activity"
    return "HIGH RISK — Ransomware"


def predict_risk(
    files_per_sec: float,
    rename_count: float,
    entropy_change: float,
    honeypot: int,
    model: Any | None = None,
) -> dict:
    """Return a prediction and risk score for one observation."""
    if files_per_sec < 0 or rename_count < 0:
        raise ValueError("File-operation rates and rename counts cannot be negative.")
    if not 0 <= entropy_change <= 1:
        raise ValueError("entropy_change must be between 0 and 1.")
    if honeypot not in (0, 1):
        raise ValueError("honeypot must be 0 or 1.")

    classifier = model if model is not None else load_model()
    features = [[files_per_sec, rename_count, entropy_change, honeypot]]
    prediction = int(classifier.predict(features)[0])

    classes = list(getattr(classifier, "classes_", [0, 1]))
    if 1 not in classes or 0 not in classes:
        raise ValueError(f"Expected classifier classes 0 and 1; found {classes}")
    probabilities = classifier.predict_proba(features)[0]
    safe_probability = float(probabilities[classes.index(0)])
    ransomware_probability = float(probabilities[classes.index(1)])
    risk_score = max(0, min(100, round(ransomware_probability * 100)))

    return {
        "prediction": prediction,
        "status": "Ransomware-like activity" if prediction == 1 else "Safe-like activity",
        "risk_score": risk_score,
        "threat_level": risk_level(risk_score),
        "safe_probability": safe_probability,
        "ransomware_probability": ransomware_probability,
        "features": {
            "files_per_sec": files_per_sec,
            "rename_count": rename_count,
            "entropy_change": entropy_change,
            "honeypot": honeypot,
        },
    }


def main() -> None:
    result = predict_risk(140, 70, 0.95, 1)
    print("\n========== ML RESULT ==========")
    print(f"Files / Sec             : {result['features']['files_per_sec']}")
    print(f"Renames                 : {result['features']['rename_count']}")
    print(f"Entropy Change          : {result['features']['entropy_change']}")
    print(f"Honeypot Hit            : {result['features']['honeypot']}")
    print("--------------------------------")
    print(f"Status                  : {result['status']}")
    print(f"Risk Score              : {result['risk_score']} / 100")
    print(f"Threat Level            : {result['threat_level']}")
    print("--------------------------------")
    print(f"Safe Probability        : {result['safe_probability']:.2%}")
    print(f"Ransomware Probability  : {result['ransomware_probability']:.2%}")
    print("================================")


if __name__ == "__main__":
    main()
