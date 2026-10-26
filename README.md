# Ransomware Early Detection

A student project exploring ransomware-risk classification from file-activity features, with a React/Vite dashboard prototype and a separate Python machine-learning demo.

> **Scope and safety:** This is an educational prototype, not an endpoint security product. The bundled CSV is a small example dataset; model results are not evidence of real-world detection performance. The dashboard and Python model are currently separate components. This project does not monitor or block real file-system activity.

## Project structure

- `src/` — React/Vite dashboard prototype.
- `ransomware_frontend/` — duplicate frontend project copy; the repository-root frontend is the primary build target.
- `ransomware_ml/ransomware_ml1/dataset.csv` — example tabular dataset.
- `ransomware_ml/ransomware_ml1/modeltrain.py` — trains and evaluates a Random Forest classifier.
- `ransomware_ml/ransomware_ml1/modeltest.py` — loads the trained model and returns a risk assessment for supplied feature values.
- `tests/` — lightweight unit tests for prediction and risk-score behavior.

## Machine-learning demo

Requirements: Python 3.10+.

From the repository root:

```bash
python -m venv .venv
```

Activate the environment, then install the ML dependencies:

**Windows PowerShell**
```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install -r ransomware_ml/ransomware_ml1/requirements.txt
```

**macOS / Linux**
```bash
source .venv/bin/activate
python -m pip install -r ransomware_ml/ransomware_ml1/requirements.txt
```

Train the model (the script locates its CSV relative to its own file, so the working directory does not matter):

```bash
python ransomware_ml/ransomware_ml1/modeltrain.py
```

Run the sample prediction:

```bash
python ransomware_ml/ransomware_ml1/modeltest.py
```

Run the unit tests:

```bash
python -m unittest discover -s tests -v
```

### Input features

| Feature | Meaning in this demo |
|---|---|
| `files_per_sec` | File operations per second |
| `rename_count` | Number of rename operations in the observation window |
| `entropy_change` | Normalized entropy-change feature, expected from 0 to 1 |
| `honeypot` | Whether a honeypot interaction was observed (0 or 1) |
| `label` | Target class: 0 = safe, 1 = ransomware-like activity |

The model reports standard held-out metrics. Because the example dataset is small and may contain patterns directly correlated with the labels, treat those metrics as a code/demo check—not a reliable estimate of production performance. For credible evaluation, use a larger, independently collected dataset, avoid train/test leakage, and report per-class precision, recall, F1, and a confusion matrix.

## Frontend dashboard

The dashboard is a Vite/React interface prototype. From the repository root:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The dashboard is not yet connected to the Python model or an operating-system file monitor. Do not interpret its visual alerts as live detection or as protection against actual ransomware.

## Responsible use

Use only on systems and datasets you own or are authorized to analyze. This repository demonstrates defensive detection concepts; it is not a substitute for endpoint protection, backups, or incident-response procedures.
