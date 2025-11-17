"""
Simple helper to import demo jobs from `site/script.js` into the backend using the admin import endpoint.

Usage:
    Set ADMIN_SECRET and API_BASE in environment, or pass as args, then run:
    python import_demo.py

This is a small convenience script for development only.
"""
import os
import re
import json
import requests
from pathlib import Path

API_BASE = os.environ.get('API_BASE', 'http://127.0.0.1:8000')
ADMIN_SECRET = os.environ.get('ADMIN_SECRET', 'admin-secret')

def extract_jobs_from_script(script_path: Path):
    text = script_path.read_text(encoding='utf-8')
    # Find the jobs array definition `const jobsData = [`
    m = re.search(r"const\s+jobsData\s*=\s*\[", text)
    if not m:
        raise RuntimeError('Could not find jobsData in script.js')
    start = m.end() - 1  # position of '['
    # find matching closing bracket
    depth = 0
    end = None
    for i in range(start, len(text)):
        ch = text[i]
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i
                break
    if end is None:
        raise RuntimeError('Could not determine end of jobs array')
    arr_text = text[start:end+1]
    # Convert JS array to JSON - we assume it already uses double quotes and is well-formed
    try:
        data = json.loads(arr_text)
        return data
    except Exception as e:
        # As a fallback attempt some replacements (single quotes) - not bulletproof
        replaced = arr_text.replace("'", '"')
        return json.loads(replaced)

def import_jobs(jobs):
    url = f"{API_BASE}/api/import-demo-jobs"
    headers = {'Content-Type': 'application/json', 'X-Admin-Secret': ADMIN_SECRET}
    r = requests.post(url, json=jobs, headers=headers)
    r.raise_for_status()
    return r.json()

def main():
    base = Path(__file__).resolve().parent.parent
    script_path = base / 'site' / 'script.js'
    if not script_path.exists():
        print('script.js not found at', script_path)
        return
    jobs = extract_jobs_from_script(script_path)
    print(f'Found {len(jobs)} demo jobs; importing...')
    res = import_jobs(jobs)
    print('Imported:', res)

if __name__ == '__main__':
    main()
