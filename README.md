# Smart Waste Segregation & Recycling Tracker

A lightweight Python HTTP server that serves a multi-page static web UI for a smart waste segregation and recycling tracker, plus a minimal SQLite-backed API for scan history.

## Features

- Multi-page responsive UI (dashboard, scan, urban, rural)
- Static asset serving via a simple Python server
- SQLite-backed scan history API
- Optional unit tests for the data layer

## Tech Stack

- Python 3 (standard library)
- SQLite (built-in)
- HTML/CSS/JavaScript

## Installation

1. Ensure Python 3 is installed.
2. No external dependencies are required.

## Run

```bash
python app.py
```

Open `http://localhost:8000` in your browser.

## API

Basic JSON endpoints (SQLite-backed):

- `GET /api/health`
- `GET /api/scans`
- `GET /api/scans/{id}`
- `POST /api/scans`
- `GET /api/history` (alias for scans)

Example request:

```bash
curl -X POST http://localhost:8000/api/scans \
  -H "Content-Type: application/json" \
  -d "{\"item\":\"Plastic Bottle\",\"waste_type\":\"Recyclable\",\"recommendation\":\"Rinse and recycle\",\"action\":\"Place in recycling bin\"}"
```

## Tests (Optional)

```bash
python -m unittest
```

## Project Structure

```
root/
  app.py
  backend/
  data/
  tests/
  src/
    index.html
    dashboard.html
    participation.html
    rural.html
    scan.html
    urban.html
  assets/
    css/
    js/
    images/
  .gitignore
  README.md
  requirements.txt
  LICENSE
```
