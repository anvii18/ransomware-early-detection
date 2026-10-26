"""Reproducible hold-out evaluation for the educational ransomware demo.

Run from the repository root:
    python ransomware_ml/ransomware_ml1/evaluate_model.py

The bundled CSV is synthetic/example data, not a representative real-world
ransomware benchmark. Results describe only this dataset and split.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split

HERE = Path(__file__).resolve().parent
DEFAULT_DATA = HERE / "dataset.csv"
FEATURES = ["files_per_sec", "rename_count", "entropy_change", "honeypot"]
TARGET = "label"
SEED = 42
TEST_SIZE = 0.2


def evaluate(data_path: Path) -> dict:
    """Validate the CSV, train a fixed model, and return hold-out metrics."""
    if not data_path.is_file():
        raise FileNotFoundError(f"Dataset not found: {data_path}")

    data = pd.read_csv(data_path)
    required = FEATURES + [TARGET]
    missing = [name for name in required if name not in data.columns]
    if missing:
        raise ValueError(f"Missing required columns: {', '.join(missing)}")
    if data.empty:
        raise ValueError("Dataset is empty.")
    if data[required].isnull().any().any():
        raise ValueError("Required feature/label columns contain missing values.")
    if not set(data[TARGET].unique()).issubset({0, 1}) or set(data[TARGET].unique()) != {0, 1}:
        raise ValueError("label must contain both binary classes 0 and 1 only.")
    if not data["entropy_change"].between(0, 1).all():
        raise ValueError("entropy_change must be between 0 and 1.")
    if not data["honeypot"].isin([0, 1]).all():
        raise ValueError("honeypot must contain only 0 or 1.")

    X = data[FEATURES]
    y = data[TARGET].astype(int)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=SEED, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=6,
        class_weight="balanced",
        random_state=SEED,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)
    predicted = model.predict(X_test)

    # Identical feature rows in both splits can make the hold-out score optimistic.
    train_rows = set(map(tuple, X_train.to_numpy().tolist()))
    test_rows = set(map(tuple, X_test.to_numpy().tolist()))
    overlap = len(train_rows.intersection(test_rows))

    report = classification_report(
        y_test, predicted, labels=[0, 1],
        target_names=["Safe", "Ransomware"],
        output_dict=True, zero_division=0,
    )
    return {
        "evaluation_scope": "stratified hold-out split of bundled example CSV only",
        "warning": (
            "Educational synthetic/example data; these results are not evidence "
            "of real-world ransomware detection performance."
        ),
        "dataset": {
            "path": str(data_path),
            "rows": int(len(data)),
            "feature_columns": FEATURES,
            "class_counts": {
                "safe_0": int((y == 0).sum()),
                "ransomware_1": int((y == 1).sum()),
            },
            "duplicate_feature_rows": int(X.duplicated().sum()),
        },
        "split": {
            "random_state": SEED,
            "test_fraction": TEST_SIZE,
            "train_rows": int(len(X_train)),
            "test_rows": int(len(X_test)),
            "unique_feature_rows_shared_between_train_and_test": overlap,
        },
        "metrics": {
            "accuracy": float(accuracy_score(y_test, predicted)),
            "ransomware_precision": float(precision_score(y_test, predicted, pos_label=1, zero_division=0)),
            "ransomware_recall": float(recall_score(y_test, predicted, pos_label=1, zero_division=0)),
            "ransomware_f1": float(f1_score(y_test, predicted, pos_label=1, zero_division=0)),
            "classification_report": report,
            "confusion_matrix_labels_0_safe_1_ransomware": confusion_matrix(
                y_test, predicted, labels=[0, 1]
            ).tolist(),
        },
        "model": {
            "algorithm": "RandomForestClassifier",
            "n_estimators": 200,
            "max_depth": 12,
            "min_samples_split": 6,
            "class_weight": "balanced",
            "random_state": SEED,
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=DEFAULT_DATA, help="Path to dataset CSV")
    parser.add_argument("--output", type=Path, help="Optional path to save the JSON report")
    args = parser.parse_args()

    report = evaluate(args.data)
    rendered = json.dumps(report, indent=2)
    print(rendered)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered + "\n", encoding="utf-8")
        print(f"\nReport saved to: {args.output}")


if __name__ == "__main__":
    main()
