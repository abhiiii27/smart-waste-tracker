import os
import unittest
import uuid

from backend.db import check_connection
from backend.services import create_scan, get_scan, list_scans

DB_CONFIG = {
    "host": os.getenv("ECOSORT_DB_HOST", "127.0.0.1"),
    "port": int(os.getenv("ECOSORT_DB_PORT", "3306")),
    "database": os.getenv("ECOSORT_DB_NAME", "ECOSORT DB"),
    "user": os.getenv("ECOSORT_DB_USER", "root"),
    "password": os.getenv("ECOSORT_DB_PASSWORD", ""),
}


@unittest.skipUnless(
    os.getenv("ECOSORT_RUN_DB_TESTS") == "1",
    "Set ECOSORT_RUN_DB_TESTS=1 to run MySQL integration tests.",
)
class ScanServiceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        ok, detail = check_connection(DB_CONFIG)
        if not ok:
            raise unittest.SkipTest(f"MySQL not available: {detail}")

    def test_create_and_get_scan(self):
        unique_item = f"test-item-{uuid.uuid4()}"
        scan = create_scan(
            DB_CONFIG,
            {
                "item": unique_item,
                "waste_type": "Recyclable",
                "recommendation": "Rinse and recycle",
                "action": "Place in recycling bin",
            },
        )
        fetched = get_scan(DB_CONFIG, scan.id)
        self.assertIsNotNone(fetched)
        self.assertEqual(fetched.item, unique_item)

    def test_list_scans_contains_new_item(self):
        unique_item = f"test-list-{uuid.uuid4()}"
        create_scan(
            DB_CONFIG,
            {
                "item": unique_item,
                "waste_type": "Organic",
                "recommendation": "Compost it",
                "action": "Place in wet waste bin",
            },
        )
        scans = list_scans(DB_CONFIG, limit=50)
        self.assertTrue(any(scan.item == unique_item for scan in scans))


if __name__ == "__main__":
    unittest.main()
