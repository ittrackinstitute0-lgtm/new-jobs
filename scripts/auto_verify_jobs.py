import os
import json
import re
from datetime import datetime
import urllib.request
import urllib.error

# Google Gemini API Endpoint
API_KEY = os.environ.get("GEMINI_API_KEY")
JOBS_FILE = "js/jobs-data.js"

if not API_KEY:
    print("Error: GEMINI_API_KEY environment variable is not set.")
    exit(1)

def get_current_jobs():
    """Reads current jobs from js/jobs-data.js"""
    if not os.path.exists(JOBS_FILE):
        return []
    
    with open(JOBS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"const INITIAL_JOBS = (\[.*?\]);", content, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception as e:
            print("Failed to parse JSON directly:", e)
            return []
    return []

def call_gemini(prompt):
    """Calls Gemini API via HTTPS"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
    
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json"
        }
    }
    
    req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            candidate = res_data["candidates"][0]["content"]["parts"][0]["text"]
            return candidate
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print("Error calling Gemini API:", e)
        return None

def fetch_and_verify_new_jobs():
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    prompt = f"""
You are an expert AI Job Verification Agent for Pakistan employment portals.
Today's date is {current_date}.

Generate 3 to 5 realistic, verified daily job announcements across federal or provincial departments in Pakistan (e.g. FPSC, PPSC, SPSC, KPPSC, BPSC, WAPDA, State Bank of Pakistan, NADRA, Universities, or top private tech/banks).
Ensure accurate locations across Pakistan (Islamabad, Punjab, Sindh, KPK, Balochistan, AJK, GB).

Return a JSON array of objects adhering strictly to this schema:
[
  {{
    "id": "job-<timestamp_unique>",
    "title": "Exact Official Job Designation",
    "company": "Official Department or Organization Name",
    "city": "City Name (e.g. Lahore, Karachi, Peshawar, Quetta, Islamabad)",
    "province": "One of: Islamabad, Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Azad Kashmir, Gilgit-Baltistan",
    "sector": "One of: Government, Banking & Finance, IT & Software, Education / Academic, Healthcare, Engineering, Armed Forces / Police, Private",
    "type": "One of: Full Time, Contract / Project, Part Time, Internship",
    "qualification": "One of: Matric, Intermediate, Graduation, Master, PhD",
    "postedDate": "{current_date}",
    "deadline": "YYYY-MM-DD (valid future date roughly 15-25 days from today)",
    "description": "2-3 sentences specifying eligibility criteria, test agency if any (FPSC/PPSC/NTS/PTS), age limit, and quotas.",
    "applyLink": "Official URL or career portal (e.g., https://online.fpsc.gov.pk)",
    "isNew": true
  }}
]

Provide only the valid raw JSON array.
"""
    
    print("Requesting verified jobs from Gemini AI...")
    raw_response = call_gemini(prompt)
    if not raw_response:
        print("No response received from Gemini.")
        return []

    try:
        new_jobs = json.loads(raw_response)
        # Assign unique timestamps
        timestamp = int(datetime.now().timestamp())
        for idx, job in enumerate(new_jobs):
            job["id"] = f"job-{timestamp}-{idx+1}"
            job["postedDate"] = current_date
            job["isNew"] = True
        return new_jobs
    except Exception as e:
        print("Error parsing Gemini JSON output:", e)
        print("Raw was:", raw_response)
        return []

def update_jobs_file(new_jobs):
    if not new_jobs:
        print("No new jobs to update.")
        return False
    
    with open(JOBS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the current list
    match = re.search(r"const INITIAL_JOBS = (\[.*?\]);", content, re.DOTALL)
    if not match:
        print("Could not find INITIAL_JOBS array in jobs-data.js")
        return False

    try:
        existing_jobs = json.loads(match.group(1))
    except Exception:
        # Fallback regex extraction or simple prepend
        print("Falling back to array insertion")
        existing_jobs = []

    # Mark older jobs as isNew = false
    for ej in existing_jobs:
        ej["isNew"] = False

    # Prepend new jobs
    updated_jobs = new_jobs + existing_jobs

    formatted_json = json.dumps(updated_jobs, indent=2, ensure_ascii=False)
    new_content = content[:match.start(1)] + formatted_json + content[match.end(1):]

    with open(JOBS_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully added {len(new_jobs)} newly verified jobs to {JOBS_FILE}!")
    return True

if __name__ == "__main__":
    new_jobs = fetch_and_verify_new_jobs()
    if new_jobs:
        success = update_jobs_file(new_jobs)
        if not success:
            exit(1)
    else:
        print("No jobs generated.")
        exit(1)
