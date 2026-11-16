/**
 * RozgarPK - Initial Jobs Dataset
 * Covers jobs across all provinces and territories of Pakistan:
 * - Islamabad (ICT)
 * - Punjab (Lahore, Rawalpindi, Faisalabad, Multan, Sialkot, etc.)
 * - Sindh (Karachi, Hyderabad, Sukkur, Larkana)
 * - Khyber Pakhtunkhwa (Peshawar, Abbottabad, Mardan, Swat)
 * - Balochistan (Quetta, Gwadar, Turbat)
 * - Azad Jammu & Kashmir (Muzaffarabad, Mirpur)
 * - Gilgit-Baltistan (Gilgit, Skardu)
 */

const INITIAL_JOBS = [
  {
    id: "job-001",
    title: "Assistant Director (BS-17)",
    company: "Federal Public Service Commission (FPSC)",
    city: "Islamabad",
    province: "Islamabad",
    sector: "Government",
    type: "Full Time",
    qualification: "Master",
    postedDate: "2026-11-16",
    deadline: "2026-12-05",
    description: "Applications are invited from Pakistani citizens for the post of Assistant Director. Quota applies for Punjab, Sindh (Rural/Urban), KPK, and Balochistan. Age limit: 22-30 years with general 5 years relaxation.",
    applyLink: "https://online.fpsc.gov.pk",
    isNew: true
  },
  {
    id: "job-002",
    title: "Senior Full Stack Software Engineer",
    company: "Systems Limited",
    city: "Lahore",
    province: "Punjab",
    sector: "IT & Software",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-16",
    deadline: "2026-11-30",
    description: "Seeking an experienced full-stack developer skilled in React, Node.js, and cloud deployments. Hybrid work mode available from Lahore or Karachi campus.",
    applyLink: "https://systemsltd.com/careers",
    isNew: true
  },
  {
    id: "job-003",
    title: "Branch Operations Officer",
    company: "Habib Bank Limited (HBL)",
    city: "Karachi",
    province: "Sindh",
    sector: "Banking & Finance",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-15",
    deadline: "2026-12-10",
    description: "Responsible for managing day-to-day retail banking operations, customer account opening, verification, and compliance with State Bank of Pakistan regulations.",
    applyLink: "https://hbl.com/careers",
    isNew: true
  },
  {
    id: "job-004",
    title: "Medical Officer & Resident Doctor",
    company: "Hayatabad Medical Complex",
    city: "Peshawar",
    province: "Khyber Pakhtunkhwa",
    sector: "Healthcare",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-15",
    deadline: "2026-12-02",
    description: "MBBS degree recognized by PMDC with completed 1-year house job. Positions available across Emergency, General Medicine, and Pediatrics departments.",
    applyLink: "https://hmckp.gov.pk/careers",
    isNew: false
  },
  {
    id: "job-005",
    title: "Civil & Port Operations Engineer",
    company: "Gwadar Port Authority",
    city: "Gwadar",
    province: "Balochistan",
    sector: "Engineering",
    type: "Contract / Project",
    qualification: "Graduation",
    postedDate: "2026-11-14",
    deadline: "2026-12-15",
    description: "B.Sc Civil Engineering registered with PEC. Preference will be given to candidates with local Balochistan domicile. Lucrative package with furnished family accommodation.",
    applyLink: "https://gwadarport.gov.pk/jobs",
    isNew: false
  },
  {
    id: "job-006",
    title: "Database Administrator & Data Analyst",
    company: "NADRA Headquarters",
    city: "Islamabad",
    province: "Islamabad",
    sector: "Government",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-14",
    deadline: "2026-11-28",
    description: "National Database & Registration Authority invites qualified candidates for database management, query optimization, and biometric records processing pipelines.",
    applyLink: "https://careers.nadra.gov.pk",
    isNew: false
  },
  {
    id: "job-007",
    title: "Lecturer in English & Computer Science",
    company: "Karakoram International University (KIU)",
    city: "Gilgit",
    province: "Gilgit-Baltistan",
    sector: "Education / Academic",
    type: "Full Time",
    qualification: "Master",
    postedDate: "2026-11-13",
    deadline: "2026-12-08",
    description: "Candidates holding an MS / MPhil degree in relevant disciplines from HEC recognized institutions. Applicants from Gilgit-Baltistan are encouraged to apply.",
    applyLink: "https://kiu.edu.pk/jobs",
    isNew: false
  },
  {
    id: "job-008",
    title: "Junior Electrical Engineer (BS-17)",
    company: "WAPDA / Neelum Jhelum Project",
    city: "Muzaffarabad",
    province: "Azad Kashmir",
    sector: "Government",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-12",
    deadline: "2026-11-29",
    description: "Water and Power Development Authority is hiring engineers for hydro power generation facilities. AJK domicile quota reserved according to federal rules.",
    applyLink: "https://wapda.gov.pk/careers",
    isNew: false
  },
  {
    id: "job-009",
    title: "Sub-Inspector / Assistant Sub-Inspector (ASI)",
    company: "Punjab Police Department",
    city: "Lahore",
    province: "Punjab",
    sector: "Government",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-11",
    deadline: "2026-12-01",
    description: "Induction through Punjab Public Service Commission (PPSC). Minimum physical standards: Height 5'7\" for male, 5'2\" for female. Punjab domicile required.",
    applyLink: "https://ppsc.gop.pk",
    isNew: false
  },
  {
    id: "job-010",
    title: "Territory Sales Officer",
    company: "Engro Fertilizers",
    city: "Multan",
    province: "Punjab",
    sector: "Private",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-10",
    deadline: "2026-11-25",
    description: "Responsible for managing distribution networks and farmer outreach across Southern Punjab belt. B.Sc Agriculture / BBA preferred.",
    applyLink: "https://engro.com/careers",
    isNew: false
  },
  {
    id: "job-011",
    title: "Staff Nurse (BS-16)",
    company: "Liaquat University Hospital",
    city: "Hyderabad",
    province: "Sindh",
    sector: "Healthcare",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-09",
    deadline: "2026-11-26",
    description: "B.Sc Nursing (4 years) or General Nursing diploma with PNC valid license. Both Male & Female candidates holding Sindh domicile are eligible.",
    applyLink: "https://spsc.gov.pk",
    isNew: false
  },
  {
    id: "job-012",
    title: "Assistant Accounts Officer",
    company: "Balochistan High Court",
    city: "Quetta",
    province: "Balochistan",
    sector: "Government",
    type: "Full Time",
    qualification: "Graduation",
    postedDate: "2026-11-08",
    deadline: "2026-11-24",
    description: "B.Com / BBA (Finance) from recognized university. Complete knowledge of government accounting codes, payroll, and audit documentation required.",
    applyLink: "https://bhc.gov.pk/recruitment",
    isNew: false
  }
];

// Helper functions for storage
const STORAGE_KEY = "rozgar_pk_jobs_v1";

function getStoredJobs() {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (!localData) {
    // Seed with initial realistic jobs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  }
  try {
    return JSON.parse(localData);
  } catch (e) {
    return INITIAL_JOBS;
  }
}

function saveJobToStorage(newJob) {
  const currentJobs = getStoredJobs();
  currentJobs.unshift(newJob);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentJobs));
  return currentJobs;
}
