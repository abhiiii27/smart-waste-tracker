import hashlib
import hmac
import secrets

DEFAULT_PBKDF2_ITERATIONS = 200_000


def hash_password(password: str, iterations: int = DEFAULT_PBKDF2_ITERATIONS) -> str:
    salt = secrets.token_bytes(16)
    derived = hashlib.pbkdf2_hmac(
        "sha256",
        str(password).encode("utf-8"),
        salt,
        int(iterations),
    )
    return f"pbkdf2_sha256${int(iterations)}${salt.hex()}${derived.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        scheme, iter_str, salt_hex, hash_hex = str(stored).split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False
        iterations = int(iter_str)
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(hash_hex)
    except (ValueError, TypeError):
        return False

    derived = hashlib.pbkdf2_hmac(
        "sha256",
        str(password).encode("utf-8"),
        salt,
        iterations,
    )
    return hmac.compare_digest(derived, expected)

