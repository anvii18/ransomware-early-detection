import unittest
from pathlib import Path

from ransomware_ml.ransomware_ml1.evaluate_model import DEFAULT_DATA, evaluate


class ModelEvaluationTests(unittest.TestCase):
    def test_evaluation_report_is_complete_and_consistent(self):
        report = evaluate(Path(DEFAULT_DATA))

        self.assertGreater(report["dataset"]["rows"], 0)
        self.assertEqual(
            report["dataset"]["rows"],
            report["dataset"]["class_counts"]["safe_0"]
            + report["dataset"]["class_counts"]["ransomware_1"],
        )
        self.assertEqual(report["split"]["train_rows"] + report["split"]["test_rows"], report["dataset"]["rows"])
        self.assertIn("accuracy", report["metrics"])
        self.assertIn("ransomware_recall", report["metrics"])
        self.assertIn("ransomware_f1", report["metrics"])
        matrix = report["metrics"]["confusion_matrix_labels_0_safe_1_ransomware"]
        self.assertEqual(len(matrix), 2)
        self.assertEqual(sum(sum(row) for row in matrix), report["split"]["test_rows"])
        self.assertIn("not evidence", report["warning"])


if __name__ == "__main__":
    unittest.main()
