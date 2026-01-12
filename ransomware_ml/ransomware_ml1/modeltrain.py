import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# ---------------- LOAD DATA ----------------
data = pd.read_csv("dataset.csv")

X = data[["files_per_sec","rename_count","entropy_change","honeypot"]]
y = data["label"]

# ---------------- SPLIT ----------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.4, random_state=42, shuffle=True
)#better realism,more advanced

# ---------------- MODEL ----------------
model = RandomForestClassifier(
    n_estimators=200,          # fewer trees
    max_depth=12,              # reduce tree depth
    min_samples_split=6,
    random_state=42
)



model.fit(X_train, y_train)

# ---------------- TEST ----------------
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print("\nMODEL TRAINED SUCCESSFULLY 🎉")
print("Accuracy:", round(accuracy * 100, 2), "%")
print("\nClassification Report:")
print(classification_report(y_test, predictions))

# ---------------- SAVE MODEL ----------------
with open("ransomware_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("\nModel saved as ransomware_model.pkl")
