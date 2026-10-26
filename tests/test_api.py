import unittest

from fastapi.testclient import TestClient

from backend.app import app


class PredictionApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_health_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
        self.assertEqual(response.json()["mode"], "educational_demo")

    def test_prediction_endpoint_returns_model_scores(self):
        response = self.client.post(
            "/api/predict",
            json={
                "files_per_sec": 140,
                "rename_count": 70,
                "entropy_change": 0.95,
                "honeypot": 1,
            },
        )
        self.assertEqual(response.status_code, 200, response.text)
        body = response.json()
        self.assertIn(body["prediction"], [0, 1])
        self.assertGreaterEqual(body["risk_score"], 0)
        self.assertLessEqual(body["risk_score"], 100)
        self.assertIn("ransomware_probability", body)
        self.assertEqual(body["mode"], "educational_demo")
        self.assertIn("not live endpoint monitoring", body["disclaimer"])

    def test_invalid_features_are_rejected(self):
        response = self.client.post(
            "/api/predict",
            json={
                "files_per_sec": 1,
                "rename_count": 0,
                "entropy_change": 1.5,
                "honeypot": 0,
            },
        )
        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
