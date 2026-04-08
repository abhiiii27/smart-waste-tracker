from typing import List, Optional

from .db import get_connection, init_db
from .models import Scan


DEFAULT_LIMIT = 100


def create_scan(db_config: dict, payload: dict) -> Scan:
    init_db(db_config)
    item = str(payload.get("item", "")).strip()
    waste_type = str(payload.get("waste_type", "")).strip()
    recommendation = str(payload.get("recommendation", "")).strip()
    action = str(payload.get("action", "")).strip()

    created_at = Scan.now_iso()

    with get_connection(db_config) as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            INSERT INTO scans (item, waste_type, recommendation, action, created_at)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (item, waste_type, recommendation, action, created_at),
        )
        scan_id = int(cursor.lastrowid)
        connection.commit()
        cursor.close()

    return Scan(
        id=scan_id,
        item=item,
        waste_type=waste_type,
        recommendation=recommendation,
        action=action,
        created_at=created_at,
    )


def list_scans(db_config: dict, limit: int = DEFAULT_LIMIT, offset: int = 0) -> List[Scan]:
    init_db(db_config)
    with get_connection(db_config) as connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT id, item, waste_type, recommendation, action, created_at
            FROM scans
            ORDER BY id DESC
            LIMIT %s OFFSET %s
            """,
            (limit, offset),
        )
        rows = cursor.fetchall()
        cursor.close()

    return [
        Scan(
            id=int(row["id"]),
            item=row["item"],
            waste_type=row["waste_type"],
            recommendation=row["recommendation"],
            action=row["action"],
            created_at=row["created_at"],
        )
        for row in rows
    ]


def get_scan(db_config: dict, scan_id: int) -> Optional[Scan]:
    init_db(db_config)
    with get_connection(db_config) as connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT id, item, waste_type, recommendation, action, created_at
            FROM scans
            WHERE id = %s
            """,
            (scan_id,),
        )
        row = cursor.fetchone()
        cursor.close()

    if not row:
        return None

    return Scan(
        id=int(row["id"]),
        item=row["item"],
        waste_type=row["waste_type"],
        recommendation=row["recommendation"],
        action=row["action"],
        created_at=row["created_at"],
    )
