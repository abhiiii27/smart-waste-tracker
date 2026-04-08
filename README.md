# ECOSORT

## Smart Waste Segregation & Recycling Tracker

A lightweight Python HTTP server that serves a multi-page static web UI for a smart waste segregation and recycling tracker, plus a minimal MySQL-backed API for scan history.

## Features

- Multi-page responsive UI (dashboard, scan, urban, rural)
- Static asset serving via a simple Python server
- MySQL-backed scan history API
- Optional unit tests for the data layer

## Tech Stack

- Python 3 (standard library)
- MySQL
- HTML/CSS/JavaScript

## Installation

1. Ensure Python 3 is installed.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Database Setup (MySQL)

1. Open MySQL:

```bash
mysql -u root -p
```

2. Create the database (note the backticks because the name has a space):

```sql
CREATE DATABASE IF NOT EXISTS `ECOSORT DB`;
```

The app will create the `scans` table automatically on startup.

## Configure DB Credentials

Update the MySQL settings in `app.py` (or set environment variables as shown below):

```
DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "database": "ECOSORT DB",
    "user": "root",
    "password": "YOUR_PASSWORD",
}
```

Recommended (more secure): set environment variables instead of hardcoding:

```bash
setx ECOSORT_DB_HOST "127.0.0.1"
setx ECOSORT_DB_PORT "3306"
setx ECOSORT_DB_NAME "ECOSORT DB"
setx ECOSORT_DB_USER "root"
setx ECOSORT_DB_PASSWORD "your_password"
```

## Run

```bash
python app.py
```

Open `http://localhost:8000` in your browser.

## API

Basic JSON endpoints (MySQL-backed):

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
