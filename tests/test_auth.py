import unittest

from backend.auth import hash_password, verify_password


class AuthTests(unittest.TestCase):
    def test_hash_and_verify(self):
        hashed = hash_password("secret-password")
        self.assertTrue(verify_password("secret-password", hashed))
        self.assertFalse(verify_password("wrong-password", hashed))


if __name__ == "__main__":
    unittest.main()

