import pickle
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "ransomware_model.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

def predict_from_features(features):
    arr = np.array(features).reshape(1, -1)

    if hasattr(model, "predict_proba"):
        return float(model.predict_proba(arr)[0][1])
    else:
        return float(model.predict(arr)[0])
