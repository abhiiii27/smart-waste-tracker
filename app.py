import mimetypes
import os
import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

from backend.db import init_db
from backend.routes import handle_get, handle_post

PORT = 8000
ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "src"
ASSETS_ROOT = ROOT / "assets"
DB_CONFIG = {
    "host": os.getenv("ECOSORT_DB_HOST", "127.0.0.1"),
    "port": int(os.getenv("ECOSORT_DB_PORT", "3306")),
    "database": os.getenv("ECOSORT_DB_NAME", "ECOSORT DB"),
    "user": os.getenv("ECOSORT_DB_USER", "root"),
    "password": os.getenv("ECOSORT_DB_PASSWORD", ""),
}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/"):
            status, body, headers = handle_get(DB_CONFIG, self.path)
            self.send_response(status)
            for key, value in headers.items():
                self.send_header(key, value)
            self.end_headers()
            self.wfile.write(body)
            return

        if path in ("/", "/index.html"):
            return self._send_file(WEB_ROOT / "index.html")

        if path.startswith("/assets/"):
            return self._send_static(ASSETS_ROOT, path, "/assets/")

        if path.startswith("/images/"):
            return self._send_static(ASSETS_ROOT / "images", path, "/images/")

        # Serve other files (html pages) from the web root
        if path.startswith("/") and len(path) > 1:
            file_path = (WEB_ROOT / path.lstrip("/")).resolve()
            if WEB_ROOT not in file_path.parents and file_path != WEB_ROOT:
                return self._send_not_found()
            return self._send_file(file_path)

        return self._send_not_found()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if not path.startswith("/api/"):
            return self._send_not_found()

        content_length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(content_length) if content_length > 0 else b""
        status, response_body, headers = handle_post(DB_CONFIG, path, body)
        self.send_response(status)
        for key, value in headers.items():
            self.send_header(key, value)
        self.end_headers()
        self.wfile.write(response_body)

    def _send_static(self, base: Path, path: str, prefix: str):
        rel = path[len(prefix):]
        file_path = (base / rel).resolve()
        if base not in file_path.parents and file_path != base:
            return self._send_not_found()
        return self._send_file(file_path)

    def _send_file(self, file_path: Path):
        if not file_path.exists() or not file_path.is_file():
            return self._send_not_found()

        content_type, _ = mimetypes.guess_type(str(file_path))
        if not content_type:
            content_type = "application/octet-stream"

        if content_type.startswith("text/") and "charset=" not in content_type:
            content_type = f"{content_type}; charset=utf-8"
        elif content_type in ("application/javascript", "application/json") and "charset=" not in content_type:
            content_type = f"{content_type}; charset=utf-8"

        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _send_not_found(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"Not Found")

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    init_db(DB_CONFIG)
    server = HTTPServer(("", PORT), Handler)
    print(f"Serving on http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
