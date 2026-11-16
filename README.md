# RozgarPK - Pakistan Daily Jobs Portal 🇵🇰

A clean, minimalist, responsive, and user-friendly web portal designed to publish and discover daily job opportunities from every corner of Pakistan (Islamabad, Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Gilgit-Baltistan, and Azad Jammu & Kashmir).

---

## 📁 Complete Folder & File Structure

```text
new jobs/
│
├── index.html              # Main website homepage (structure, search, filters, modals, blank news section)
├── README.md               # Documentation and setup instructions
│
├── css/
│   └── styles.css          # Clean, modern, minimalist, responsive styling & CSS variables
│
└── js/
    ├── app.js              # Application core logic (search, multi-criteria filtering, modal popups, responsive navigation)
    └── jobs-data.js        # Dynamic jobs database covering Pakistan regions & localStorage sync
```

---

## ✨ Features Included

1. **Nationwide Coverage (Every Corner of Pakistan)**:
   - Covers **Federal Capital (Islamabad)**
   - **Punjab**: Lahore, Rawalpindi, Faisalabad, Multan, Sialkot, Gujranwala
   - **Sindh**: Karachi, Hyderabad, Sukkur, Larkana
   - **Khyber Pakhtunkhwa (KPK)**: Peshawar, Abbottabad, Mardan, Swat
   - **Balochistan**: Quetta, Gwadar, Turbat
   - **Gilgit-Baltistan (GB)**: Gilgit, Skardu
   - **Azad Jammu & Kashmir (AJK)**: Muzaffarabad, Mirpur

2. **Instant Search & Real-Time Filtering**:
   - Filter by **City / Region / Province**
   - Filter by **Sector** (Government / Public, IT & Software, Banking & Finance, Healthcare, Education, Engineering)
   - Filter by **Minimum Qualification** (Matric, Intermediate, Bachelor's, Master's, PhD)
   - Filter by **Job Type** (Full Time, Contract, Part Time, Internship)
   - Quick one-click tags: FPSC, PPSC, NTS, WAPDA, NADRA, Banking, Remote

3. **Live "Post a Job" System**:
   - Built-in interactive modal where any recruiter or organization can post a new vacancy.
   - Newly added jobs instantly appear at the top of the feed with a **"NEW TODAY"** indicator and persist in local storage.

4. **Detailed Job Inspection & Application**:
   - Clean popup modal showcasing key duties, department, quota requirements, and last date to apply.
   - Direct link to official application URLs or recruitment email addresses.

5. **Blank News Section**:
   - The News section has been created with proper layout and structure but **kept blank** as requested, ready for future news feeds or official gazette announcements.

6. **Fully Responsive & Clean Minimalist UI**:
   - Designed with accessible typography, crisp Pakistan green branding (`#046a38`), card shadows, mobile navigation menu, and fast loading performance without bloated external frameworks.

---

## 🚀 How to Run the Website

1. Simply double-click on `index.html` to open it in any web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
2. Alternatively, you can use VS Code's **Live Server** extension or run a simple local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.
