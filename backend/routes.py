import json
from urllib.parse import parse_qs, urlparse

from .services import create_scan, get_scan, list_scans


def _json_response(payload: dict) -> tuple[int, bytes, dict]:
    body = json.dumps(payload).encode("utf-8")
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": str(len(body)),
    }
    return 200, body, headers


def _error_response(status: int, message: str) -> tuple[int, bytes, dict]:
    body = json.dumps({"error": message}).encode("utf-8")
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": str(len(body)),
    }
    return status, body, headers


def handle_get(db_config: dict, path: str) -> tuple[int, bytes, dict]:
    parsed = urlparse(path)
    if parsed.path == "/api/health":
        return _json_response({"status": "ok"})

    if parsed.path in ("/api/scans", "/api/history"):
        params = parse_qs(parsed.query)
        limit = int(params.get("limit", ["100"])[0])
        offset = int(params.get("offset", ["0"])[0])
        scans = [scan.to_dict() for scan in list_scans(db_config, limit=limit, offset=offset)]
        return _json_response({"items": scans})

    if parsed.path.startswith("/api/scans/"):
        try:
            scan_id = int(parsed.path.split("/")[-1])
        except ValueError:
            return _error_response(400, "Invalid scan id")

        scan = get_scan(db_config, scan_id)
        if not scan:
            return _error_response(404, "Scan not found")
        return _json_response(scan.to_dict())

    return _error_response(404, "Not found")


def handle_post(db_config: dict, path: str, body: bytes) -> tuple[int, bytes, dict]:
    if path != "/api/scans":
        return _error_response(404, "Not found")

    try:
        payload = json.loads(body.decode("utf-8")) if body else {}
    except json.JSONDecodeError:
        return _error_response(400, "Invalid JSON")

    scan = create_scan(db_config, payload)
    response = scan.to_dict()
    response["status"] = "created"
    return _json_response(response)
