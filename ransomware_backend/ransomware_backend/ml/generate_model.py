import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Dummy dataset for demo
np.random.seed(42)
X = np.random.rand(100, 4)  # 100 samples, 4 features
y = np.random.randint(0, 2, 100)  # 0 = safe, 1 = ransomware

# Train a simple model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model to the ml folder
with open("ransomware_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Dummy ML model created as ransomware_model.pkl")
