from typing import Optional, Tuple

import mysql.connector

from .auth import hash_password, verify_password
from .db import get_connection, init_db
from .models import User


def create_user(db_config: dict, payload: dict) -> Tuple[Optional[User], Optional[str]]:
    init_db(db_config)
    full_name = str(payload.get("full_name", "")).strip()
    email = str(payload.get("email", "")).strip().lower()
    phone = str(payload.get("phone", "")).strip()
    password = str(payload.get("password", ""))

    if not full_name or not email or not phone or not password:
        return None, "Missing required fields"

    if len(password) < 6:
        return None, "Password must be at least 6 characters"

    created_at = User.now_iso()
    password_hash = hash_password(password)

    try:
        with get_connection(db_config) as connection:
            cursor = connection.cursor()
            cursor.execute(
                """
                INSERT INTO users (full_name, email, phone, password_hash, created_at)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (full_name, email, phone, password_hash, created_at),
            )
            user_id = int(cursor.lastrowid)
            connection.commit()
            cursor.close()
    except mysql.connector.Error as exc:
        if exc.errno == 1062:
            return None, "Email already registered"
        raise

    return (
        User(
            id=user_id,
            full_name=full_name,
            email=email,
            phone=phone,
            created_at=created_at,
        ),
        None,
    )


def authenticate_user(db_config: dict, email: str, password: str) -> Optional[User]:
    init_db(db_config)
    normalized_email = str(email).strip().lower()
    if not normalized_email or not str(password):
        return None

    with get_connection(db_config) as connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT id, full_name, email, phone, password_hash, created_at
            FROM users
            WHERE email = %s
            """,
            (normalized_email,),
        )
        row = cursor.fetchone()
        cursor.close()

    if not row:
        return None

    if not verify_password(password, row["password_hash"]):
        return None

    return User(
        id=int(row["id"]),
        full_name=row["full_name"],
        email=row["email"],
        phone=row["phone"],
        created_at=row["created_at"],
    )

