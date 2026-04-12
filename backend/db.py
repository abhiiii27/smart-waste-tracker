from typing import Any, Dict, Tuple

import mysql.connector

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS scans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item TEXT NOT NULL,
    waste_type TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    password_hash VARCHAR(512) NOT NULL,
    created_at VARCHAR(64) NOT NULL,
    UNIQUE KEY uniq_users_email (email)
);
"""


def _connect_server(config: Dict[str, Any]) -> mysql.connector.MySQLConnection:
    return mysql.connector.connect(
        host=config["host"],
        port=int(config["port"]),
        user=config["user"],
        password=config["password"],
    )


def get_connection(config: Dict[str, Any]) -> mysql.connector.MySQLConnection:
    return mysql.connector.connect(
        host=config["host"],
        port=int(config["port"]),
        user=config["user"],
        password=config["password"],
        database=config["database"],
    )


def init_db(config: Dict[str, Any]) -> None:
    database = config["database"]
    with _connect_server(config) as connection:
        cursor = connection.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{database}`")
        cursor.close()
        connection.commit()

    with get_connection(config) as connection:
        cursor = connection.cursor()
        for statement in [s.strip() for s in SCHEMA_SQL.split(";") if s.strip()]:
            cursor.execute(statement)
        cursor.close()
        connection.commit()


def check_connection(config: Dict[str, Any]) -> Tuple[bool, str]:
    try:
        init_db(config)
        with get_connection(config) as connection:
            cursor = connection.cursor()
            cursor.execute("SELECT 1")
            cursor.fetchone()
            cursor.close()
        return True, "connected"
    except mysql.connector.Error as exc:
        return False, str(exc)
