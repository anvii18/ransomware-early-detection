# Ransomware Early Detection

An educational ransomware-risk classification project with a React/Vite dashboard, a Python FastAPI endpoint, and a Random Forest model trained on example file-activity features.

- **Live dashboard:** https://ransomware-early-detection-ui.onrender.com
- **API health:** https://ransomware-early-detection-api.onrender.com/api/health
- **Interactive API docs:** https://ransomware-early-detection-api.onrender.com/docs

> **Important:** This is a student demo, not an endpoint security product. It does not monitor or block real file-system activity. The bundled CSV is a small example dataset, so model scores are not evidence of real-world detection performance.

## Project structure

- `src/` — primary React/Vite dashboard.
- `ransomware_frontend/` — duplicate frontend project copy.
- `backend/app.py` — FastAPI health and prediction endpoints.
- `ransomware_ml/ransomware_ml1/dataset.csv` — example tabular dataset.
- `ransomware_ml/ransomware_ml1/modeltrain.py` — validates data, trains and evaluates the Random Forest model.
- `ransomware_ml/ransomware_ml1/modeltest.py` — validates features and returns a risk assessment.
- `tests/` — unit tests for prediction behavior.

## 1. Set up the Python API

Requirements: Python 3.10+.

Create and activate a virtual environment from the repository root.

**Windows PowerShell**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r ransomware_ml/ransomware_ml1/requirements.txt
python -m pip install -r backend/requirements.txt
uvicorn backend.app:app --reload
```

**macOS / Linux**
```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r ransomware_ml/ransomware_ml1/requirements.txt
python -m pip install -r backend/requirements.txt
uvicorn backend.app:app --reload
```

The API runs at `http://127.0.0.1:8000`. Interactive API documentation is available at `http://127.0.0.1:8000/docs`. The first prediction automatically trains a model from the bundled dataset if no local model artifact exists.

- `GET /api/health` — reports API health and whether a model artifact is present.
- `POST /api/predict` — accepts `files_per_sec`, `rename_count`, `entropy_change` (0–1), and `honeypot` (0 or 1).

Example request:
```json
{
  "files_per_sec": 140,
  "rename_count": 70,
  "entropy_change": 0.95,
  "honeypot": 1
}
```

Train and inspect model metrics manually:
```bash
python ransomware_ml/ransomware_ml1/modeltrain.py
```

## 2. Run the frontend

In a second terminal, from the repository root:

```bash
npm install
npm run dev
```

The frontend runs at the Vite URL shown in the terminal (usually `http://localhost:5173`). The ML Prediction Playground calls the Python API at `http://127.0.0.1:8000` by default. If the API is hosted elsewhere, create a local `.env` file with:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
```

For a production frontend, set `VITE_API_URL` to the deployed API URL and set the API's `FRONTEND_ORIGINS` environment variable to the exact frontend origin(s), comma-separated.

Build the frontend:
```bash
npm run build
```

## 3. Live demo and deployment

The project is deployed on Render:

- **Frontend dashboard:** https://ransomware-early-detection-ui.onrender.com
- **API health check:** https://ransomware-early-detection-api.onrender.com/api/health
- **Interactive API documentation:** https://ransomware-early-detection-api.onrender.com/docs

Open the dashboard and use **ML Prediction Playground** to submit sample activity features. The health endpoint should return JSON containing `"status": "ok"` and `"model_ready": true`.

To deploy or redeploy your own instance, the repository includes a Render Blueprint in `render.yaml`:

1. Sign in to Render and choose **New → Blueprint**.
2. Connect `anvii18/ransomware-early-detection` and select the `main` branch.
3. Review the API and static-site services described by `render.yaml`, then apply the Blueprint.
4. If Render assigns different service URLs, update `VITE_API_URL` on the static site and `FRONTEND_ORIGINS` on the API to match the actual URLs, then redeploy.

Render free services may sleep when idle, so the first request after inactivity can take a little time.

This is an educational demo. It classifies manually entered example features; it does not monitor a real device, isolate a host, or block file writes.

## 4. Tests

```bash
python -m unittest discover -s tests -v
```

GitHub Actions runs the Python tests, a model-training smoke test, and the frontend production build.

## Model features

| Feature | Meaning in this demo |
|---|---|
| `files_per_sec` | File operations per second |
| `rename_count` | Rename operations in an observation window |
| `entropy_change` | Normalized entropy-change feature |
| `honeypot` | Whether a honeypot interaction was observed (0/1) |
| `label` | Target class: 0 = safe, 1 = ransomware-like activity |

The model uses a stratified train/test split and reports accuracy, per-class precision/recall/F1, and a confusion matrix. Since the dataset is small and may contain patterns directly correlated with labels, these metrics are for demonstration only. A credible evaluation requires larger independent data, leakage checks, and external validation.

## Responsible use

Use only systems and datasets you own or are authorized to analyze. The API scores features supplied by the user; it does not scan files, execute ransomware, isolate a host, or block file writes. Use established endpoint protection, backups, and incident-response processes for real systems.
