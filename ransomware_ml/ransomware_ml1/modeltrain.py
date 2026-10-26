from __future__ import annotations

import pickle
from pathlib import Path

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split

HERE = Path(__file__).resolve().parent
DATA_PATH = HERE / "dataset.csv"
MODEL_PATH = HERE / "ransomware_model.pkl"
FEATURES = ["files_per_sec", "rename_count", "entropy_change", "honeypot"]
TARGET = "label"


def load_dataset(path: Path = DATA_PATH) -> tuple[pd.DataFrame, pd.Series]:
    """Load and validate the example dataset."""
    if not path.is_file():
        raise FileNotFoundError(
            f"Dataset not found at {path}. Keep dataset.csv beside modeltrain.py."
        )

    data = pd.read_csv(path)
    missing = [column for column in FEATURES + [TARGET] if column not in data.columns]
    if missing:
        raise ValueError(f"Dataset is missing required columns: {', '.join(missing)}")
    if data.empty:
        raise ValueError("Dataset contains no rows.")
    if data[FEATURES + [TARGET]].isnull().any().any():
        raise ValueError("Required feature/label columns contain missing values.")

    labels = set(data[TARGET].unique())
    if labels != {0, 1}:
        raise ValueError(f"Expected binary labels 0 and 1; found {sorted(labels)}")
    if (data["entropy_change"].lt(0) | data["entropy_change"].gt(1)).any():
        raise ValueError("entropy_change values must be between 0 and 1.")
    if not data["honeypot"].isin([0, 1]).all():
        raise ValueError("honeypot values must be 0 or 1.")

    return data[FEATURES], data[TARGET].astype(int)


def train_model(data_path: Path = DATA_PATH, model_path: Path = MODEL_PATH) -> dict:
    """Train, evaluate, and save a Random Forest model."""
    features, labels = load_dataset(data_path)
    if labels.value_counts().min() < 2:
        raise ValueError("Need at least two rows per class for a stratified split.")

    X_train, X_test, y_train, y_test = train_test_split(
        features,
        labels,
        test_size=0.2,
        random_state=42,
        stratify=labels,
    )

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=6,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print("\nMODEL TRAINED SUCCESSFULLY")
    print(f"Rows: {len(features)} | Train: {len(X_train)} | Test: {len(X_test)}")
    print(f"Accuracy: {accuracy:.2%}")
    print("\nClassification report:")
    print(
        classification_report(
            y_test, predictions, labels=[0, 1],
            target_names=["Safe", "Ransomware"], zero_division=0
        )
    )
    print("Confusion matrix (rows=true, columns=predicted; labels 0, 1):")
    print(confusion_matrix(y_test, predictions, labels=[0, 1]))

    model_path.parent.mkdir(parents=True, exist_ok=True)
    with model_path.open("wb") as model_file:
        pickle.dump(model, model_file)
    print(f"Model saved to: {model_path}")

    return {"accuracy": accuracy, "model_path": model_path, "model": model}


if __name__ == "__main__":
    train_model()
