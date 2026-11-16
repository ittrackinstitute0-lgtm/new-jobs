/**
 * RozgarPK - Application Core Logic
 * Handles filtering, search, dynamic rendering, post-job modal, and UI responsiveness.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- State ---
  let allJobs = getStoredJobs();
  let displayedJobs = [];
  let visibleCount = 6;
  const itemsPerPage = 6;

  // --- DOM Elements ---
  const jobsContainer = document.getElementById("jobsContainer");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const paginationWrapper = document.getElementById("paginationWrapper");

  // Filter inputs
  const searchInput = document.getElementById("searchInput");
  const locationFilter = document.getElementById("locationFilter");
  const sectorFilter = document.getElementById("sectorFilter");
  const qualificationFilter = document.getElementById("qualificationFilter");
  const sortBySelect = document.getElementById("sortBy");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const clearAllFiltersBtn = document.getElementById("clearAllFiltersBtn");
  const typeCheckboxes = document.querySelectorAll('input[name="jobType"]');
  const regionChips = document.querySelectorAll(".region-chip");
  const quickTags = document.querySelectorAll(".tag-pill");

  // Modals
  const postJobModal = document.getElementById("postJobModal");
  const openPostModalBtn = document.getElementById("openPostJobModalBtn");
  const sidePostJobBtn = document.getElementById("sidePostJobBtn");
  const closePostModalBtn = document.getElementById("closePostModalBtn");
  const cancelPostModalBtn = document.getElementById("cancelPostModalBtn");
  const postJobForm = document.getElementById("postJobForm");

  const jobDetailModal = document.getElementById("jobDetailModal");
  const closeDetailModalBtn = document.getElementById("closeDetailModalBtn");
  const modalJobTitle = document.getElementById("modalJobTitle");
  const modalJobContent = document.getElementById("modalJobContent");

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  // Dates & Footers
  const currentDateEl = document.getElementById("currentDate");
  const currentYearEl = document.getElementById("currentYear");

  // --- Initial Setup ---
  initDates();
  applyFilters();

  // --- Date Initialization ---
  function initDates() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    if (currentDateEl) {
      currentDateEl.textContent = now.toLocaleDateString('en-US', options);
    }
    if (currentYearEl) {
      currentYearEl.textContent = now.getFullYear();
    }
  }

  // --- Filter & Search Engine ---
  function applyFilters() {
    const query = (searchInput.value || "").trim().toLowerCase();
    const selectedLocation = locationFilter.value;
    const selectedSector = sectorFilter.value;
    const selectedQualification = qualificationFilter.value;
    const sortBy = sortBySelect.value;

    // Selected job types from checkboxes
    const checkedTypes = Array.from(typeCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    // Active Region Chip
    const activeChip = document.querySelector(".region-chip.active");
    const activeRegion = activeChip ? activeChip.getAttribute("data-region") : "all";

    // Filtering process
    displayedJobs = allJobs.filter(job => {
      // 1. Text Search query matching title, company, city or tags
      if (query) {
        const titleMatch = job.title.toLowerCase().includes(query);
        const compMatch = job.company.toLowerCase().includes(query);
        const cityMatch = job.city.toLowerCase().includes(query);
        const descMatch = job.description.toLowerCase().includes(query);
        if (!titleMatch && !compMatch && !cityMatch && !descMatch) {
          return false;
        }
      }

      // 2. Dropdown Location filter
      if (selectedLocation !== "all") {
        const matchesCity = job.city.toLowerCase() === selectedLocation.toLowerCase();
        const matchesProvince = job.province.toLowerCase() === selectedLocation.toLowerCase();
        if (!matchesCity && !matchesProvince) return false;
      }

      // 3. Region Chip filter
      if (activeRegion !== "all") {
        const chipLoc = activeRegion.toLowerCase();
        const matchesChipProv = job.province.toLowerCase().includes(chipLoc);
        const matchesChipCity = job.city.toLowerCase().includes(chipLoc);
        if (!matchesChipProv && !matchesChipCity) return false;
      }

      // 4. Sector filter
      if (selectedSector !== "all" && job.sector !== selectedSector) {
        return false;
      }

      // 5. Qualification filter
      if (selectedQualification !== "all" && job.qualification !== selectedQualification) {
        return false;
      }

      // 6. Job Type Checkboxes
      if (checkedTypes.length > 0 && !checkedTypes.includes(job.type)) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "deadline") {
      displayedJobs.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else {
      // newest first
      displayedJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    visibleCount = itemsPerPage;
    renderJobs();
  }

  // --- Render Job Cards ---
  function renderJobs() {
    jobsContainer.innerHTML = "";

    const totalCount = displayedJobs.length;
    resultsCount.textContent = `Showing ${Math.min(visibleCount, totalCount)} of ${totalCount} positions`;

    if (totalCount === 0) {
      emptyState.style.display = "block";
      paginationWrapper.style.display = "none";
      return;
    }

    emptyState.style.display = "none";

    const slice = displayedJobs.slice(0, visibleCount);

    slice.forEach(job => {
      const card = createJobCardElement(job);
      jobsContainer.appendChild(card);
    });

    // Handle pagination / Load More button
    if (visibleCount >= totalCount) {
      paginationWrapper.style.display = "none";
    } else {
      paginationWrapper.style.display = "block";
    }
  }

  // Build individual job card HTML
  function createJobCardElement(job) {
    const card = document.createElement("div");
    card.className = `job-card ${job.isNew ? 'is-new' : ''}`;

    // Formatting date
    const formattedDeadline = formatHumanDate(job.deadline);
    const formattedPosted = formatHumanDate(job.postedDate);

    // Initial icon or sector icon
    const sectorIcon = getSectorEmoji(job.sector);

    card.innerHTML = `
      <div class="job-card-header">
        <div class="company-avatar">${sectorIcon}</div>
        <div class="job-meta-top">
          <h3 class="job-title">${escapeHTML(job.title)}</h3>
          <div class="job-company">🏢 ${escapeHTML(job.company)}</div>
        </div>
      </div>

      <div class="job-tags">
        <span class="badge badge-location">📍 ${escapeHTML(job.city)}, ${escapeHTML(job.province)}</span>
        <span class="badge ${job.sector === 'Government' ? 'badge-govt' : 'badge-sector'}">${escapeHTML(job.sector)}</span>
        <span class="badge badge-type">🕒 ${escapeHTML(job.type)}</span>
        <span class="badge">🎓 ${escapeHTML(job.qualification)}</span>
      </div>

      <div class="job-card-footer">
        <div class="job-info-row">
          <span class="job-info-item">📅 Posted: ${formattedPosted}</span>
          <span class="job-info-item" style="color: #b45309; font-weight: 600;">⏳ Deadline: ${formattedDeadline}</span>
        </div>
        <div class="job-actions">
          <button class="btn-view" data-job-id="${job.id}">View Details & Apply</button>
        </div>
      </div>
    `;

    // Click handler for details
    const viewBtn = card.querySelector(".btn-view");
    viewBtn.addEventListener("click", () => openJobDetailModal(job));

    return card;
  }

  // Sector emoji generator
  function getSectorEmoji(sector) {
    switch (sector) {
      case "Government": return "🏛️";
      case "Banking & Finance": return "🏦";
      case "IT & Software": return "💻";
      case "Healthcare": return "🏥";
      case "Education / Academic": return "📚";
      case "Engineering": return "⚙️";
      case "Armed Forces / Police": return "🛡️";
      default: return "💼";
    }
  }

  // Date Formatter helper
  function formatHumanDate(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  // Simple HTML Escaper
  function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // --- Modal: Job Detail View ---
  function openJobDetailModal(job) {
    modalJobTitle.textContent = job.title;

    const formattedDeadline = formatHumanDate(job.deadline);
    const formattedPosted = formatHumanDate(job.postedDate);

    // If applyLink is email vs URL
    const isEmail = job.applyLink.includes("@") && !job.applyLink.startsWith("http");
    const applyHref = isEmail ? `mailto:${job.applyLink}` : (job.applyLink.startsWith("http") ? job.applyLink : `https://${job.applyLink}`);

    modalJobContent.innerHTML = `
      <div class="detail-meta-box">
        <div class="detail-item">
          <span class="detail-label">Department / Organization</span>
          <span class="detail-value">${escapeHTML(job.company)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location</span>
          <span class="detail-value">${escapeHTML(job.city)}, ${escapeHTML(job.province)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Sector</span>
          <span class="detail-value">${escapeHTML(job.sector)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Employment Type</span>
          <span class="detail-value">${escapeHTML(job.type)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Minimum Education</span>
          <span class="detail-value">${escapeHTML(job.qualification)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Last Date to Apply</span>
          <span class="detail-value" style="color: #b91c1c;">${formattedDeadline}</span>
        </div>
      </div>

      <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: #1e293b;">Job Description & Requirements</h4>
      <div class="detail-desc">${escapeHTML(job.description)}</div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn btn-outline" id="shareJobBtn">Share Job 🔗</button>
        <a href="${applyHref}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Apply Now ↗</a>
      </div>
    `;

    jobDetailModal.classList.add("active");
    jobDetailModal.setAttribute("aria-hidden", "false");

    // Copy/Share link button
    const shareJobBtn = document.getElementById("shareJobBtn");
    if (shareJobBtn) {
      shareJobBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href);
        shareJobBtn.textContent = "Link Copied! ✓";
        setTimeout(() => { shareJobBtn.textContent = "Share Job 🔗"; }, 2000);
      });
    }
  }

  // --- Modal Controls: Post Job ---
  function openPostModal() {
    postJobModal.classList.add("active");
    postJobModal.setAttribute("aria-hidden", "false");
  }

  function closeAllModals() {
    postJobModal.classList.remove("active");
    postJobModal.setAttribute("aria-hidden", "true");
    jobDetailModal.classList.remove("active");
    jobDetailModal.setAttribute("aria-hidden", "true");
  }

  // Form Submit: Post Job
  postJobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todayStr = new Date().toISOString().split("T")[0];

    const newJob = {
      id: "job-" + Date.now(),
      title: document.getElementById("jobTitle").value.trim(),
      company: document.getElementById("companyName").value.trim(),
      city: document.getElementById("jobCity").value.trim(),
      province: document.getElementById("jobProvince").value,
      sector: document.getElementById("jobSector").value,
      type: document.getElementById("jobTypeSelect").value,
      qualification: document.getElementById("jobQualification").value,
      postedDate: todayStr,
      deadline: document.getElementById("jobDeadline").value,
      description: document.getElementById("jobDescription").value.trim(),
      applyLink: document.getElementById("applyLink").value.trim(),
      isNew: true
    };

    // Save into localStorage and update runtime array
    allJobs = saveJobToStorage(newJob);

    postJobForm.reset();
    closeAllModals();

    // Reset filters and show newest immediately at top
    searchInput.value = "";
    locationFilter.value = "all";
    sectorFilter.value = "all";
    qualificationFilter.value = "all";
    regionChips.forEach(chip => chip.classList.toggle("active", chip.dataset.region === "all"));

    applyFilters();

    // Scroll to jobs section smoothly
    const jobsSec = document.getElementById("jobs-section");
    if (jobsSec) jobsSec.scrollIntoView({ behavior: 'smooth' });
  });

  // --- Event Listeners ---

  // Search input events (instant as user types or button click)
  searchInput.addEventListener("input", applyFilters);
  searchSubmitBtn.addEventListener("click", applyFilters);
  locationFilter.addEventListener("change", applyFilters);
  sectorFilter.addEventListener("change", applyFilters);
  qualificationFilter.addEventListener("change", applyFilters);
  sortBySelect.addEventListener("change", applyFilters);

  typeCheckboxes.forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  // Region chips
  regionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      regionChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilters();
    });
  });

  // Quick tag search buttons
  quickTags.forEach(tag => {
    tag.addEventListener("click", () => {
      const query = tag.getAttribute("data-query");
      searchInput.value = query;
      applyFilters();
    });
  });

  // Footer quick links
  document.querySelectorAll(".quick-region-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const region = link.getAttribute("data-region");
      locationFilter.value = region;
      applyFilters();
      window.scrollTo({ top: document.getElementById("jobs-section").offsetTop - 60, behavior: 'smooth' });
    });
  });

  document.querySelectorAll(".quick-sector-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sector = link.getAttribute("data-sector");
      sectorFilter.value = sector;
      applyFilters();
      window.scrollTo({ top: document.getElementById("jobs-section").offsetTop - 60, behavior: 'smooth' });
    });
  });

  // Reset filter buttons
  function resetAllFilters() {
    searchInput.value = "";
    locationFilter.value = "all";
    sectorFilter.value = "all";
    qualificationFilter.value = "all";
    sortBySelect.value = "newest";
    typeCheckboxes.forEach(cb => cb.checked = true);
    regionChips.forEach(c => c.classList.toggle("active", c.dataset.region === "all"));
    applyFilters();
  }

  resetFiltersBtn.addEventListener("click", resetAllFilters);
  clearAllFiltersBtn.addEventListener("click", resetAllFilters);

  // Load more pagination button
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += itemsPerPage;
    renderJobs();
  });

  // Modal open/close listeners
  if (openPostModalBtn) openPostModalBtn.addEventListener("click", openPostModal);
  if (sidePostJobBtn) sidePostJobBtn.addEventListener("click", openPostModal);
  if (closePostModalBtn) closePostModalBtn.addEventListener("click", closeAllModals);
  if (cancelPostModalBtn) cancelPostModalBtn.addEventListener("click", closeAllModals);
  if (closeDetailModalBtn) closeDetailModalBtn.addEventListener("click", closeAllModals);

  // Close modals when clicking backdrop
  [postJobModal, jobDetailModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Mobile navigation hamburger toggle
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
});
