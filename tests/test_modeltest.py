import unittest

from ransomware_ml.ransomware_ml1.modeltest import predict_risk, risk_level


class FakeClassifier:
    classes_ = [0, 1]

    def __init__(self, prediction=1, probabilities=(0.15, 0.85)):
        self.prediction = prediction
        self.probabilities = probabilities

    def predict(self, features):
        return [self.prediction]

    def predict_proba(self, features):
        return [self.probabilities]


class PredictionTests(unittest.TestCase):
    def test_probability_maps_to_risk_score(self):
        result = predict_risk(20, 2, 0.2, 0, model=FakeClassifier())
        self.assertEqual(result["risk_score"], 85)
        self.assertEqual(result["prediction"], 1)
        self.assertEqual(result["status"], "Ransomware-like activity")

    def test_class_order_is_not_assumed(self):
        class ReversedClassifier(FakeClassifier):
            classes_ = [1, 0]

            def predict_proba(self, features):
                return [(0.8, 0.2)]

        result = predict_risk(20, 2, 0.2, 0, model=ReversedClassifier())
        self.assertEqual(result["safe_probability"], 0.2)
        self.assertEqual(result["ransomware_probability"], 0.8)

    def test_invalid_features_are_rejected(self):
        with self.assertRaises(ValueError):
            predict_risk(-1, 0, 0.2, 0, model=FakeClassifier())
        with self.assertRaises(ValueError):
            predict_risk(1, 0, 1.2, 0, model=FakeClassifier())
        with self.assertRaises(ValueError):
            predict_risk(1, 0, 0.2, 2, model=FakeClassifier())

    def test_risk_levels(self):
        self.assertEqual(risk_level(10), "LOW RISK — Normal Behavior")
        self.assertEqual(risk_level(40), "SUSPICIOUS — Monitor Activity")
        self.assertEqual(risk_level(80), "HIGH RISK — Ransomware")


if __name__ == "__main__":
    unittest.main()
