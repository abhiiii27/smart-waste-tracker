import tempfile
import unittest
from pathlib import Path

from backend.services import create_scan, get_scan, list_scans


class ScanServiceTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.db_path = Path(self.temp_dir.name) / "test.db"

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_create_and_get_scan(self):
        scan = create_scan(
            self.db_path,
            {
                "item": "Plastic Bottle",
                "waste_type": "Recyclable",
                "recommendation": "Rinse and recycle",
                "action": "Place in recycling bin",
            },
        )
        fetched = get_scan(self.db_path, scan.id)
        self.assertIsNotNone(fetched)
        self.assertEqual(fetched.item, "Plastic Bottle")

    def test_list_scans(self):
        create_scan(self.db_path, {"item": "Paper", "waste_type": "Recyclable"})
        create_scan(self.db_path, {"item": "Food", "waste_type": "Organic"})
        scans = list_scans(self.db_path, limit=10)
        self.assertEqual(len(scans), 2)


if __name__ == "__main__":
    unittest.main()
