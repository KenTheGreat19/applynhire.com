# Backend API (FastAPI)

This backend provides simple authentication endpoints for the Project 1.1 frontend.

Quickstart
1. Create a virtual environment and install requirements:
```powershell
python -m venv .venv; .\.venv\Scripts\Activate; pip install -r requirements.txt
```
2. Export environment variable for JWT secret and run uvicorn:
```powershell
$env:JWT_SECRET='ReplaceWithYourSecret'; uvicorn app:app --reload --host 0.0.0.0 --port 8000
```
3. Visit http://127.0.0.1:8000/docs to see API docs.

Example requests (curl):

```powershell
# Create an account
curl -X POST "http://127.0.0.1:8000/api/signup" -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","password":"pass123","role":"applicant"}'

# Sign in
curl -X POST "http://127.0.0.1:8000/api/signin" -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"pass123","role":"applicant"}'

# Get profile (replace <token>)
curl -X GET "http://127.0.0.1:8000/api/profile" -H "Authorization: Bearer <token>"
```

Jobs API
```powershell
# List jobs
curl -X GET "http://127.0.0.1:8000/api/jobs"

# Create a job (employer account required)
curl -X POST "http://127.0.0.1:8000/api/jobs" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"New Job","company":"Acme","location":"Remote","type":"full-time","category":"technology","salary":"$80k - $90k","posted":"1 day ago","description":"Test","requirements":[],"responsibilities":[],"tags":[]} '

# Apply for job
curl -X POST "http://127.0.0.1:8000/api/jobs/1/apply" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"job_id":1,"name":"Applicant","email":"applicant@example.com","cover_letter":"I am interested"}'
```

Notes
- This backend uses SQLite to persist users under `./backend/db.sqlite`.
- CORS is enabled to allow requests from your static frontend.

Security: This is a minimal example; for production use, secure secrets properly and consider HTTPS and other hardening.
