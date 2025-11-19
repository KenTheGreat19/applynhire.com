/* Deprecated: main job logic moved to site/script.js
   If you are developing, use site/script.js instead.
   Sample/demo job data - In production, this would come from an API.
*/
const jobsData = [
  // Example job entries — replace or load from your API when ready
  {
    id: 1,
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Remote",
    postedAt: "2025-11-15",
    description: "Build responsive UIs with HTML, CSS and JavaScript.",
    applyUrl: "https://acme.example/jobs/1"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Beta Systems",
    location: "New York, NY",
    postedAt: "2025-11-10",
    description: "Design and maintain scalable backend services.",
    applyUrl: "https://beta.example/jobs/2"
  }
];

// Backwards-compatible alias used by some older pages/scripts
const demoJobs = jobsData;

// Expose to the global scope for pages that expect window.jobsData or window.demoJobs
if (typeof window !== "undefined") {
  window.jobsData = jobsData;
  window.demoJobs = demoJobs;
}

// If this file is loaded as a module, provide named exports (optional)
if (typeof exports !== "undefined") {
  try { exports.jobsData = jobsData; exports.demoJobs = demoJobs; } catch (e) { /* ignore */ }
}
    {
        id: 1,
        title: "Customer Experience Associate I - Healthcare Savings Non Voice",
        company: "ANH Recruitment Manpower",
        type: "Agency",
        rating: 5.0,
        reviews: 1,
        workMode: "On-site",
        location: "Manila, Capital District, Metro Manila, Philippines",
        jobType: "Full Time",
        salary: "$10K-$10K",
        description: "Through our dedicated associates, Conduent delivers mission-critical services and solutions on behalf of Fortune 100 com...",
        postedTime: "2 days ago",
        views: 18,
        applications: 0,
        trending: true
    },
    {
        id: 2,
        title: "Supervisor, Customer Experience",
        company: "ANH Recruitment Manpower",
        type: "Agency",
        rating: 5.0,
        reviews: 1,
        workMode: "On-site",
        location: "Batangas City, Batangas, Calabarzon, 4200, Philippines",
        jobType: "Full Time",
        salary: "$10K-$10K",
        description: "Through our dedicated associates, Conduent delivers mission-critical services and solutions on behalf of Fortune 100 com...",
        postedTime: "2 days ago",
        views: 12,
        applications: 0,
        trending: true
    }
];

/* Merged application script
   Combined from website_design_1.0 + main + website_sign-in/sign-up_1.0 branch fragments.
   Responsibilities: categories, theme management, job state, map init & helpers, rendering + filtering.
*/

/* ==================== CATEGORIES ==================== */
const categories = [
  { name: "Customer Service", icon: "❤️", count: 2 },
  { name: "Technology", icon: "💻", count: 0 },
  { name: "Healthcare", icon: "🏥", count: 0 },
  { name: "Sales", icon: "💰", count: 0 },
  { name: "Marketing", icon: "📱", count: 0 },
  { name: "Finance", icon: "📊", count: 0 }
];

/* ==================== THEME MANAGEMENT ==================== */
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeIcon(savedTheme);
  } catch (e) {
    console.warn('Failed to initialize theme', e);
  }
}

function toggleTheme() {
  const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${next}-theme`);
  try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  updateThemeIcon(next);
}

/* ==================== JOB STATE & DOM ELEMENTS ==================== */
// Ensure jobsData exists (may be provided in a separate file or on window)
const jobsData = (typeof window !== 'undefined' && Array.isArray(window.jobsData)) ? window.jobsData : [];

// Filtered state
let filteredJobs = Array.from(jobsData);

// DOM element references (defensive)
const searchInput = typeof document !== 'undefined' ? document.getElementById('searchInput') : null;
const locationFilter = typeof document !== 'undefined' ? document.getElementById('locationFilter') : null;
const typeFilter = typeof document !== 'undefined' ? document.getElementById('typeFilter') : null;
const categoryFilter = typeof document !== 'undefined' ? document.getElementById('categoryFilter') : null;
const jobsList = typeof document !== 'undefined' ? document.getElementById('jobsList') : null;
const resultsCount = typeof document !== 'undefined' ? document.getElementById('resultsCount') : null;
const clearFilters = typeof document !== 'undefined' ? document.getElementById('clearFilters') : null;
const noResults = typeof document !== 'undefined' ? document.getElementById('noResults') : null;
const loading = typeof document !== 'undefined' ? document.getElementById('loading') : null;
const modal = typeof document !== 'undefined' ? document.getElementById('jobModal') : null;
const closeModal = typeof document !== 'undefined' ? (document.getElementsByClassName('close')[0] || null) : null;

function isElement(el) { return el !== null && el !== undefined; }

/* ==================== MAP INITIALIZATION & HELPERS ==================== */

function initMap() {
  const mapContainer = document.getElementById('jobMap');
  if (!mapContainer) {
    console.info('Map container not found; skipping map initialization.');
    return;
  }

  // If Leaflet isn't available, try dynamically loading it from a CDN as a fallback
  if (typeof L === 'undefined') {
    console.warn('Leaflet not detected. Attempting to load from CDN...');
    const jsCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    const cssCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
    // Load CSS if not present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssCdn;
      document.head.appendChild(link);
    }

    // Try loading Leaflet script
    loadScript(jsCdn, 7000)
      .then(() => {
        console.log('Leaflet loaded dynamically.');
        renderLeafletMap(mapContainer);
      })
      .catch(err => {
        console.error('Failed to load Leaflet dynamically:', err);
        mapContainer.innerHTML = '<p style="text-align:center;padding:1rem;">Map failed to load. Please refresh the page and check network connectivity.</p>';
      });
    return;
  }

  renderLeafletMap(mapContainer);
}

// Utility to dynamically load a script with a timeout
function loadScript(src, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    // Prevent duplicate loads
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script failed to load: ' + src));
    document.head.appendChild(script);

    if (timeoutMs) {
      setTimeout(() => reject(new Error('Script load timeout: ' + src)), timeoutMs);
    }
  });
}

function renderLeafletMap(container) {
  container.innerHTML = '';

  const mapCanvas = document.createElement('div');
  mapCanvas.style.height = '100%';
  mapCanvas.style.width = '100%';
  mapCanvas.className = 'leaflet-map-wrapper';
  container.appendChild(mapCanvas);

  const map = L.map(mapCanvas, {
    zoomControl: true,
    worldCopyJump: true
  }).setView([25, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const jobsByLocation = groupJobsByLocation(jobsData);
  const locationCoords = getLocationCoordinates();
  const bounds = [];

  Object.entries(jobsByLocation).forEach(([location, jobs]) => {
    const coords = locationCoords[location];
    if (!coords) {
      console.warn(`Missing coordinates for location: ${location}`);
      return;
    }

    const markerOptions = location === 'Remote' ? {
      icon: L.divIcon({
        className: 'remote-icon',
        html: '<span>R</span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    } : {};

    const marker = L.marker(coords, markerOptions).addTo(map);
    marker.bindPopup(createPopupContent(location, jobs));
    marker.on('popupopen', (event) => attachPopupFilter(event, location));
    marker.on('click', () => filterJobsByLocation(location));

    bounds.push(coords);
  });

  if (bounds.length > 0) {
    try { map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 }); } catch (e) { /* ignore */ }
  }

  map.once('load', () => map.invalidateSize());

  appendMapLegend(container);

  // Expose map on container and window so other code can access it
  try { container._leafletMap = map; window._currentLeafletMap = map; } catch (e) { /* ignore */ }
}

function groupJobsByLocation(jobs) {
  return (jobs || []).reduce((acc, job) => {
    const location = job.location || 'Remote';
    if (!acc[location]) acc[location] = [];
    acc[location].push(job);
    return acc;
  }, {});
}

function getLocationCoordinates() {
  return {
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Berlin': [52.52, 13.405],
    'Remote': [0, 0]
  };
}

function createPopupContent(location, jobs) {
  const limitedJobs = (jobs || []).slice(0, 4);
  const remaining = (jobs || []).length - limitedJobs.length;
  const jobItems = limitedJobs.map(job => `<li>${escapeHtml(job.title)} &mdash; ${escapeHtml(job.company)}</li>`).join('');

  return `
    <div class="map-popup">
      <strong>${escapeHtml(location)}</strong><br/>
      ${(jobs || []).length} job${((jobs || []).length !== 1 ? 's' : '')}
      <ul>${jobItems}</ul>
      ${remaining > 0 ? `<em>+${remaining} more</em>` : ''}
      <button type="button" class="map-popup-action">View roles</button>
    </div>
  `;
}

function attachPopupFilter(event, location) {
  const popupEl = event.popup && event.popup.getElement && event.popup.getElement();
  if (!popupEl) return;
  const actionBtn = popupEl.querySelector('.map-popup-action');
  if (!actionBtn) return;

  actionBtn.onclick = (btnEvent) => {
    btnEvent.preventDefault();
    filterJobsByLocation(location);
    try { event.popup.close(); } catch (e) { /* ignore */ }
  };
}

function appendMapLegend(container) {
  // Keep the UI minimal: do not append a heavy legend. Only show fullscreen control.
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'map-fullscreen-btn';
  fullscreenBtn.setAttribute('aria-label', 'Toggle full screen');
  fullscreenBtn.setAttribute('title', 'Toggle full screen');
  fullscreenBtn.innerHTML = '<span class="icon">⛶</span><span class="label">Full Screen</span>';

  fullscreenBtn.addEventListener('click', () => {
    const mapSection = container.closest('.map-section');
    if (!mapSection) return;
    toggleMapFullscreen(mapSection);
  });

  const existingBtn = container.querySelector('.map-fullscreen-btn');
  if (existingBtn) existingBtn.remove();
  container.appendChild(fullscreenBtn);
}

function toggleMapFullscreen(section) {
  const container = section.querySelector('.map-container');
  if (!container) return;
  const map = container._leafletMap || window._currentLeafletMap;
  const btn = section.querySelector('.map-fullscreen-btn');

  // Cross-browser native fullscreen support detection
  const canUseNativeFullscreen = !!( (section.requestFullscreen || section.webkitRequestFullscreen || section.msRequestFullscreen) && (document.fullscreenEnabled || document.webkitIsFullScreen === true || document.msFullscreenElement) );

  const isCurrentlyFullscreen = document.fullscreenElement === section || section.classList.contains('fullscreen');

  if (canUseNativeFullscreen) {
    if (!isCurrentlyFullscreen) {
      section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
      requestFullscreenCompat(section).catch(err => {
        console.warn('Native fullscreen request failed, falling back to overlay fullscreen.', err);
        enterOverlayFullscreen(section, btn);
      });
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreenCompat().catch(err => {
          console.warn('Error exiting fullscreen, toggling overlay fallback instead.', err);
          exitOverlayFullscreen(section, btn);
        });
      } else {
        exitOverlayFullscreen(section, btn);
      }
    }
  } else {
    const ENTERED = section.classList.toggle('fullscreen');
    if (ENTERED) enterOverlayFullscreen(section, btn); else exitOverlayFullscreen(section, btn);
  }
}

/* Fullscreen helpers */
function requestFullscreenCompat(element) {
  if (element.requestFullscreen) return element.requestFullscreen();
  if (element.webkitRequestFullscreen) return new Promise((resolve, reject) => { try { element.webkitRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (element.msRequestFullscreen) return new Promise((resolve, reject) => { try { element.msRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Fullscreen API is not supported on this element'));
}

function exitFullscreenCompat() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return new Promise((resolve, reject) => { try { document.webkitExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (document.msExitFullscreen) return new Promise((resolve, reject) => { try { document.msExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Exit fullscreen is not supported on this document'));
}

function enterOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.add('fullscreen');
  document.body.classList.add('map-fullscreen-active');
  section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Exit Full Screen';
    btn.setAttribute('aria-pressed', 'true');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on enterOverlayFullscreen', e); } }, 200);
}

function exitOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.remove('fullscreen');
  document.body.classList.remove('map-fullscreen-active');
  document.body.style.overflow = '';
  if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Full Screen';
    btn.setAttribute('aria-pressed', 'false');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on exitOverlayFullscreen', e); } }, 200);
}

/* Fullscreen key handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) { /* ignore */ }
      return;
    }
    const active = document.querySelector('.map-section.fullscreen');
    if (active) toggleMapFullscreen(active);
  }
});

/* Handle native fullscreen changes to update UI */
function _handleFullscreenChange() {
  const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (fsElem && fsElem.classList && fsElem.classList.contains('map-section')) {
    fsElem.classList.add('fullscreen');
    document.body.classList.add('map-fullscreen-active');
    const btn = fsElem.querySelector('.map-fullscreen-btn');
    if (btn) {
      const label = btn.querySelector('.label');
      if (label) label.textContent = 'Exit Full Screen';
      btn.setAttribute('aria-pressed', 'true');
    }
    const container = fsElem.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange enter', e); } }, 200);
  } else {
    const active = document.querySelector('.map-section.fullscreen');
    if (active) {
      active.classList.remove('fullscreen');
      if (active._previousScroll != null) window.scrollTo(0, active._previousScroll);
    }
    document.body.classList.remove('map-fullscreen-active');
    document.body.style.overflow = '';
    if (active) {
      const btnActive = active.querySelector('.map-fullscreen-btn');
      if (btnActive) btnActive.setAttribute('aria-pressed', 'false');
    }
    const container = document.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange exit', e); } }, 200);
  }
}

document.addEventListener('fullscreenchange', _handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', _handleFullscreenChange);
document.addEventListener('msfullscreenchange', _handleFullscreenChange);

/* ==================== FILTER / NAVIGATION HELPERS ==================== */

function filterJobsByLocation(location) {
  // If locationFilter input exists, set it and call filterJobs(), otherwise perform a simple local filter.
  if (!locationFilter) {
    filteredJobs = (location === 'Remote')
      ? jobsData.filter(j => ((j.location || '').toLowerCase() === 'remote'))
      : jobsData.filter(j => ((j.location || '').toLowerCase().includes(location.toLowerCase())));
    renderJobsIfPossible(filteredJobs);
    scrollToJobsSection();
    return;
  }

  let filterValue = '';
  switch (location) {
    case 'Remote': filterValue = 'remote'; break;
    case 'New York': filterValue = 'new-york'; break;
    case 'San Francisco': filterValue = 'san-francisco'; break;
    case 'London': filterValue = 'london'; break;
    case 'Berlin': filterValue = 'berlin'; break;
    default: filterValue = location.toLowerCase().replace(/\s+/g, '-');
  }

  locationFilter.value = filterValue;

  // Prefer an existing filterJobs() implementation; otherwise do local filter/render
  if (typeof filterJobs === 'function') {
    try { filterJobs(); } catch (e) { console.warn('filterJobs() threw an error', e); localFilterAndRender(); }
  } else {
    localFilterAndRender();
  }

  scrollToJobsSection();
}

function localFilterAndRender() {
  const locVal = locationFilter ? locationFilter.value : '';
  if (!locVal) {
    filteredJobs = Array.from(jobsData);
  } else {
    filteredJobs = jobsData.filter(j => {
      const loc = (j.location || '').toLowerCase().replace(/\s+/g, '-');
      return loc.includes(locVal.toLowerCase());
    });
  }
  renderJobsIfPossible(filteredJobs);
}

function renderJobsIfPossible(list) {
  // Call renderJobs(list) if provided by app; otherwise render simple cards into #jobsList
  if (typeof renderJobs === 'function') {
    try { renderJobs(list); return; } catch (e) { console.warn('renderJobs() threw an error', e); }
  }

  if (!jobsList) return;

  jobsList.innerHTML = '';
  (list || []).forEach(job => {
    const card = createJobCard(job);
    jobsList.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = String((list || []).length);
  if (noResults) noResults.style.display = (list || []).length === 0 ? 'block' : 'none';
}

// Render jobs to the page (from website_sign-in/sign-up_1.0)
function renderJobs(jobs) {
  if (!isElement(jobsList)) return;
  jobsList.innerHTML = '';

  if (!isElement(noResults) || !isElement(resultsCount)) {
    // If any of these elements are missing, keep things safe
    jobs.forEach(job => jobsList.appendChild(createJobCard(job)));
    return;
  }

  if (jobs.length === 0) {
    noResults.style.display = 'block';
    jobsList.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    jobsList.style.display = 'grid';

    jobs.forEach(job => {
      const jobCard = createJobCard(job);
      jobsList.appendChild(jobCard);
    });
  }

  // Update results count
  resultsCount.textContent = jobs.length;
}

function createJobCard(job) {
  const card = document.createElement('article');
  card.className = 'job-card';
  card.innerHTML = `
    <h3>${escapeHtml(job.title)}</h3>
    <p class="company">${escapeHtml(job.company)}</p>
    <p class="location">${escapeHtml(job.location || 'Remote')}</p>
    <p class="description">${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  return card;
}

function scrollToJobsSection() {
  const jobsSection = document.querySelector('.jobs-section');
  if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== UTILITIES ==================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

/* ==================== EVENT LISTENERS ==================== */

function attachEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); });
  }

  // Simple view toggle (if present)
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');

  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active'); listViewBtn.classList.remove('active');
      mapContainer.removeAttribute('hidden'); listContainer.setAttribute('hidden', '');
      // invalidate map size
      try { const map = mapContainer._leafletMap || window._currentLeafletMap; if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) {}
    });
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active'); mapViewBtn.classList.remove('active');
      listContainer.removeAttribute('hidden'); mapContainer.setAttribute('hidden', '');
    });
  }
}

/* ==================== INITIALIZATION ==================== */

function init() {
  initializeTheme();
  // Render jobs initially if available
  try { renderJobsIfPossible(jobsData); } catch (e) { console.warn('Initial job render failed', e); }
  attachEventListeners();
  // Initialize the world map after small delay to let layout settle
  setTimeout(initMap, 100);
}

/* Auto-run init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
  try {
    if (loading) loading.style.display = 'block';
    if (jobsList) jobsList.style.display = 'none';

    // Example API call (replace with your actual API endpoint)
    // const response = await fetch('https://api.example.com/jobs');
    // const data = await response.json();
    // window.jobsData = data;

    if (loading) loading.style.display = 'none';
    renderJobs(window.jobsData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (loading) loading.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}

// Uncomment to use API integration
// fetchJobsFromAPI();

console.log('✅ Website initialized successfully!');
console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');
        });
      } else {
        exitOverlayFullscreen(section, btn);
      }
    }
/* Merged application script
   Combined from website_design_1.0 + main + website_sign-in/sign-up_1.0 branch fragments.
   Responsibilities: categories, theme management, job state, map init & helpers, rendering + filtering.
*/

/* ==================== CATEGORIES ==================== */
const categories = [
  { name: "Customer Service", icon: "❤️", count: 2 },
  { name: "Technology", icon: "💻", count: 0 },
  { name: "Healthcare", icon: "🏥", count: 0 },
  { name: "Sales", icon: "💰", count: 0 },
  { name: "Marketing", icon: "📱", count: 0 },
  { name: "Finance", icon: "📊", count: 0 }
];

/* ==================== THEME MANAGEMENT ==================== */
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeIcon(savedTheme);
  } catch (e) {
    console.warn('Failed to initialize theme', e);
  }
}

function toggleTheme() {
  const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${next}-theme`);
  try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  updateThemeIcon(next);
}

/* ==================== JOB STATE & DOM ELEMENTS ==================== */
// Ensure jobsData exists (may be provided in a separate file or on window)
const jobsData = (typeof window !== 'undefined' && Array.isArray(window.jobsData)) ? window.jobsData : [];

// Filtered state
let filteredJobs = Array.from(jobsData);

// DOM element references (defensive)
const searchInput = typeof document !== 'undefined' ? document.getElementById('searchInput') : null;
const locationFilter = typeof document !== 'undefined' ? document.getElementById('locationFilter') : null;
const typeFilter = typeof document !== 'undefined' ? document.getElementById('typeFilter') : null;
const categoryFilter = typeof document !== 'undefined' ? document.getElementById('categoryFilter') : null;
const jobsList = typeof document !== 'undefined' ? document.getElementById('jobsList') : null;
const resultsCount = typeof document !== 'undefined' ? document.getElementById('resultsCount') : null;
const clearFilters = typeof document !== 'undefined' ? document.getElementById('clearFilters') : null;
const noResults = typeof document !== 'undefined' ? document.getElementById('noResults') : null;
const loading = typeof document !== 'undefined' ? document.getElementById('loading') : null;
const modal = typeof document !== 'undefined' ? document.getElementById('jobModal') : null;
const closeModal = typeof document !== 'undefined' ? (document.getElementsByClassName('close')[0] || null) : null;

function isElement(el) { return el !== null && el !== undefined; }

/* ==================== MAP INITIALIZATION & HELPERS ==================== */

function initMap() {
  const mapContainer = document.getElementById('jobMap');
  if (!mapContainer) {
    console.info('Map container not found; skipping map initialization.');
    return;
  }

  // If Leaflet isn't available, try dynamically loading it from a CDN as a fallback
  if (typeof L === 'undefined') {
    console.warn('Leaflet not detected. Attempting to load from CDN...');
    const jsCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    const cssCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
    // Load CSS if not present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssCdn;
      document.head.appendChild(link);
    }

    // Try loading Leaflet script
    loadScript(jsCdn, 7000)
      .then(() => {
        console.log('Leaflet loaded dynamically.');
        renderLeafletMap(mapContainer);
      })
      .catch(err => {
        console.error('Failed to load Leaflet dynamically:', err);
        mapContainer.innerHTML = '<p style="text-align:center;padding:1rem;">Map failed to load. Please refresh the page and check network connectivity.</p>';
      });
    return;
  }

  renderLeafletMap(mapContainer);
}

// Utility to dynamically load a script with a timeout
function loadScript(src, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    // Prevent duplicate loads
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script failed to load: ' + src));
    document.head.appendChild(script);

    if (timeoutMs) {
      setTimeout(() => reject(new Error('Script load timeout: ' + src)), timeoutMs);
    }
  });
}

function renderLeafletMap(container) {
  container.innerHTML = '';

  const mapCanvas = document.createElement('div');
  mapCanvas.style.height = '100%';
  mapCanvas.style.width = '100%';
  mapCanvas.className = 'leaflet-map-wrapper';
  container.appendChild(mapCanvas);

  const map = L.map(mapCanvas, {
    zoomControl: true,
    worldCopyJump: true
  }).setView([25, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const jobsByLocation = groupJobsByLocation(jobsData);
  const locationCoords = getLocationCoordinates();
  const bounds = [];

  Object.entries(jobsByLocation).forEach(([location, jobs]) => {
    const coords = locationCoords[location];
    if (!coords) {
      console.warn(`Missing coordinates for location: ${location}`);
      return;
    }

    const markerOptions = location === 'Remote' ? {
      icon: L.divIcon({
        className: 'remote-icon',
        html: '<span>R</span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    } : {};

    const marker = L.marker(coords, markerOptions).addTo(map);
    marker.bindPopup(createPopupContent(location, jobs));
    marker.on('popupopen', (event) => attachPopupFilter(event, location));
    marker.on('click', () => filterJobsByLocation(location));

    bounds.push(coords);
  });

  if (bounds.length > 0) {
    try { map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 }); } catch (e) { /* ignore */ }
  }

  map.once('load', () => map.invalidateSize());

  appendMapLegend(container);

  // Expose map on container and window so other code can access it
  try { container._leafletMap = map; window._currentLeafletMap = map; } catch (e) { /* ignore */ }
}

function groupJobsByLocation(jobs) {
  return (jobs || []).reduce((acc, job) => {
    const location = job.location || 'Remote';
    if (!acc[location]) acc[location] = [];
    acc[location].push(job);
    return acc;
  }, {});
}

function getLocationCoordinates() {
  return {
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Berlin': [52.52, 13.405],
    'Remote': [0, 0]
  };
}

function createPopupContent(location, jobs) {
  const limitedJobs = (jobs || []).slice(0, 4);
  const remaining = (jobs || []).length - limitedJobs.length;
  const jobItems = limitedJobs.map(job => `<li>${escapeHtml(job.title)} &mdash; ${escapeHtml(job.company)}</li>`).join('');

  return `
    <div class="map-popup">
      <strong>${escapeHtml(location)}</strong><br/>
      ${(jobs || []).length} job${((jobs || []).length !== 1 ? 's' : '')}
      <ul>${jobItems}</ul>
      ${remaining > 0 ? `<em>+${remaining} more</em>` : ''}
      <button type="button" class="map-popup-action">View roles</button>
    </div>
  `;
}

function attachPopupFilter(event, location) {
  const popupEl = event.popup && event.popup.getElement && event.popup.getElement();
  if (!popupEl) return;
  const actionBtn = popupEl.querySelector('.map-popup-action');
  if (!actionBtn) return;

  actionBtn.onclick = (btnEvent) => {
    btnEvent.preventDefault();
    filterJobsByLocation(location);
    try { event.popup.close(); } catch (e) { /* ignore */ }
  };
}

function appendMapLegend(container) {
  // Keep the UI minimal: do not append a heavy legend. Only show fullscreen control.
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'map-fullscreen-btn';
  fullscreenBtn.setAttribute('aria-label', 'Toggle full screen');
  fullscreenBtn.setAttribute('title', 'Toggle full screen');
  fullscreenBtn.innerHTML = '<span class="icon">⛶</span><span class="label">Full Screen</span>';

  fullscreenBtn.addEventListener('click', () => {
    const mapSection = container.closest('.map-section');
    if (!mapSection) return;
    toggleMapFullscreen(mapSection);
  });

  const existingBtn = container.querySelector('.map-fullscreen-btn');
  if (existingBtn) existingBtn.remove();
  container.appendChild(fullscreenBtn);
}

function toggleMapFullscreen(section) {
  const container = section.querySelector('.map-container');
  if (!container) return;
  const map = container._leafletMap || window._currentLeafletMap;
  const btn = section.querySelector('.map-fullscreen-btn');

  // Cross-browser native fullscreen support detection
  const canUseNativeFullscreen = !!( (section.requestFullscreen || section.webkitRequestFullscreen || section.msRequestFullscreen) && (document.fullscreenEnabled || document.webkitIsFullScreen === true || document.msFullscreenElement) );

  const isCurrentlyFullscreen = document.fullscreenElement === section || section.classList.contains('fullscreen');

  if (canUseNativeFullscreen) {
    if (!isCurrentlyFullscreen) {
      section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
      requestFullscreenCompat(section).catch(err => {
        console.warn('Native fullscreen request failed, falling back to overlay fullscreen.', err);
        enterOverlayFullscreen(section, btn);
      });
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreenCompat().catch(err => {
          console.warn('Error exiting fullscreen, toggling overlay fallback instead.', err);
          exitOverlayFullscreen(section, btn);
        });
      } else {
        exitOverlayFullscreen(section, btn);
      }
    }
  } else {
    const ENTERED = section.classList.toggle('fullscreen');
    if (ENTERED) enterOverlayFullscreen(section, btn); else exitOverlayFullscreen(section, btn);
  }
}

/* Fullscreen helpers */
function requestFullscreenCompat(element) {
  if (element.requestFullscreen) return element.requestFullscreen();
  if (element.webkitRequestFullscreen) return new Promise((resolve, reject) => { try { element.webkitRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (element.msRequestFullscreen) return new Promise((resolve, reject) => { try { element.msRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Fullscreen API is not supported on this element'));
}

function exitFullscreenCompat() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return new Promise((resolve, reject) => { try { document.webkitExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (document.msExitFullscreen) return new Promise((resolve, reject) => { try { document.msExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Exit fullscreen is not supported on this document'));
}

function enterOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.add('fullscreen');
  document.body.classList.add('map-fullscreen-active');
  section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Exit Full Screen';
    btn.setAttribute('aria-pressed', 'true');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on enterOverlayFullscreen', e); } }, 200);
}

function exitOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.remove('fullscreen');
  document.body.classList.remove('map-fullscreen-active');
  document.body.style.overflow = '';
  if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Full Screen';
    btn.setAttribute('aria-pressed', 'false');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on exitOverlayFullscreen', e); } }, 200);
}

/* Fullscreen key handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) { /* ignore */ }
      return;
    }
    const active = document.querySelector('.map-section.fullscreen');
    if (active) toggleMapFullscreen(active);
  }
});

/* Handle native fullscreen changes to update UI */
function _handleFullscreenChange() {
  const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (fsElem && fsElem.classList && fsElem.classList.contains('map-section')) {
    fsElem.classList.add('fullscreen');
    document.body.classList.add('map-fullscreen-active');
    const btn = fsElem.querySelector('.map-fullscreen-btn');
    if (btn) {
      const label = btn.querySelector('.label');
      if (label) label.textContent = 'Exit Full Screen';
      btn.setAttribute('aria-pressed', 'true');
    }
    const container = fsElem.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange enter', e); } }, 200);
  } else {
    const active = document.querySelector('.map-section.fullscreen');
    if (active) {
      active.classList.remove('fullscreen');
      if (active._previousScroll != null) window.scrollTo(0, active._previousScroll);
    }
    document.body.classList.remove('map-fullscreen-active');
    document.body.style.overflow = '';
    if (active) {
      const btnActive = active.querySelector('.map-fullscreen-btn');
      if (btnActive) btnActive.setAttribute('aria-pressed', 'false');
    }
    const container = document.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange exit', e); } }, 200);
  }
}

document.addEventListener('fullscreenchange', _handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', _handleFullscreenChange);
document.addEventListener('msfullscreenchange', _handleFullscreenChange);

/* ==================== FILTER / NAVIGATION HELPERS ==================== */

function filterJobsByLocation(location) {
  // If locationFilter input exists, set it and call filterJobs(), otherwise perform a simple local filter.
  if (!locationFilter) {
    filteredJobs = (location === 'Remote')
      ? jobsData.filter(j => ((j.location || '').toLowerCase() === 'remote'))
      : jobsData.filter(j => ((j.location || '').toLowerCase().includes(location.toLowerCase())));
    renderJobsIfPossible(filteredJobs);
    scrollToJobsSection();
    return;
  }

  let filterValue = '';
  switch (location) {
    case 'Remote': filterValue = 'remote'; break;
    case 'New York': filterValue = 'new-york'; break;
    case 'San Francisco': filterValue = 'san-francisco'; break;
    case 'London': filterValue = 'london'; break;
    case 'Berlin': filterValue = 'berlin'; break;
    default: filterValue = location.toLowerCase().replace(/\s+/g, '-');
  }

  locationFilter.value = filterValue;

  // Prefer an existing filterJobs() implementation; otherwise do local filter/render
  if (typeof filterJobs === 'function') {
    try { filterJobs(); } catch (e) { console.warn('filterJobs() threw an error', e); localFilterAndRender(); }
  } else {
    localFilterAndRender();
  }

  scrollToJobsSection();
}

function localFilterAndRender() {
  const locVal = locationFilter ? locationFilter.value : '';
  if (!locVal) {
    filteredJobs = Array.from(jobsData);
  } else {
    filteredJobs = jobsData.filter(j => {
      const loc = (j.location || '').toLowerCase().replace(/\s+/g, '-');
      return loc.includes(locVal.toLowerCase());
    });
  }
  renderJobsIfPossible(filteredJobs);
}

function renderJobsIfPossible(list) {
  // Call renderJobs(list) if provided by app; otherwise render simple cards into #jobsList
  if (typeof renderJobs === 'function') {
    try { renderJobs(list); return; } catch (e) { console.warn('renderJobs() threw an error', e); }
  }

  if (!jobsList) return;

  jobsList.innerHTML = '';
  (list || []).forEach(job => {
    const card = createJobCard(job);
    jobsList.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = String((list || []).length);
  if (noResults) noResults.style.display = (list || []).length === 0 ? 'block' : 'none';
}

// Render jobs to the page (from website_sign-in/sign-up_1.0)
function renderJobs(jobs) {
  if (!isElement(jobsList)) return;
  jobsList.innerHTML = '';

  if (!isElement(noResults) || !isElement(resultsCount)) {
    // If any of these elements are missing, keep things safe
    jobs.forEach(job => jobsList.appendChild(createJobCard(job)));
    return;
  }

  if (jobs.length === 0) {
    noResults.style.display = 'block';
    jobsList.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    jobsList.style.display = 'grid';

    jobs.forEach(job => {
      const jobCard = createJobCard(job);
      jobsList.appendChild(jobCard);
    });
  }

  // Update results count (merged from website_sign-in/sign-up_1.0)
  resultsCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;
}

function createJobCard(job) {
  const card = document.createElement('article');
  card.className = 'job-card';
  card.innerHTML = `
    <h3>${escapeHtml(job.title)}</h3>
    <p class="company">${escapeHtml(job.company)}</p>
    <p class="location">${escapeHtml(job.location || 'Remote')}</p>
    <p class="description">${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  return card;
}

function scrollToJobsSection() {
  const jobsSection = document.querySelector('.jobs-section');
  if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== UTILITIES ==================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

/* ==================== EVENT LISTENERS ==================== */

function attachEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); });
  }

  // Simple view toggle (if present)
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');

  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active'); listViewBtn.classList.remove('active');
      mapContainer.removeAttribute('hidden'); listContainer.setAttribute('hidden', '');
      // invalidate map size
      try { const map = mapContainer._leafletMap || window._currentLeafletMap; if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) {}
    });
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active'); mapViewBtn.classList.remove('active');
      listContainer.removeAttribute('hidden'); mapContainer.setAttribute('hidden', '');
    });
  }
}

/* ==================== INITIALIZATION ==================== */

function init() {
  initializeTheme();
  // Render jobs initially if available
  try { renderJobsIfPossible(jobsData); } catch (e) { console.warn('Initial job render failed', e); }
  attachEventListeners();
  // Initialize the world map after small delay to let layout settle
  setTimeout(initMap, 100);
}

/* Auto-run init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
  try {
    if (loading) loading.style.display = 'block';
    if (jobsList) jobsList.style.display = 'none';

    // Example API call (replace with your actual API endpoint)
    // const response = await fetch('https://api.example.com/jobs');
    // const data = await response.json();
    // window.jobsData = data;

    if (loading) loading.style.display = 'none';
    renderJobs(window.jobsData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (loading) loading.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}

// Uncomment to use API integration
// fetchJobsFromAPI();

console.log('✅ Website initialized successfully!');
console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');
}

function enterOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.add('fullscreen');
  document.body.classList.add('map-fullscreen-active');
  section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Exit Full Screen';
    btn.setAttribute('aria-pressed', 'true');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on enterOverlayFullscreen', e); } }, 200);
}

function exitOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.remove('fullscreen');
  document.body.classList.remove('map-fullscreen-active');
  document.body.style.overflow = '';
  if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Full Screen';
    btn.setAttribute('aria-pressed', 'false');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on exitOverlayFullscreen', e); } }, 200);
}

/* Fullscreen key handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) { /* ignore */ }
      return;
    }
    const active = document.querySelector('.map-section.fullscreen');
    if (active) toggleMapFullscreen(active);
  }
});

/* Handle native fullscreen changes to update UI */
function _handleFullscreenChange() {
  const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (fsElem && fsElem.classList && fsElem.classList.contains('map-section')) {
    fsElem.classList.add('fullscreen');
    document.body.classList.add('map-fullscreen-active');
    const btn = fsElem.querySelector('.map-fullscreen-btn');
    if (btn) {
      const label = btn.querySelector('.label');
      if (label) label.textContent = 'Exit Full Screen';
      btn.setAttribute('aria-pressed', 'true');
    }
    const container = fsElem.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange enter', e); } }, 200);
  } else {
    const active = document.querySelector('.map-section.fullscreen');
    if (active) {
      active.classList.remove('fullscreen');
      if (active._previousScroll != null) window.scrollTo(0, active._previousScroll);
    }
    document.body.classList.remove('map-fullscreen-active');
    document.body.style.overflow = '';
    if (active) {
      const btnActive = active.querySelector('.map-fullscreen-btn');
      if (btnActive) btnActive.setAttribute('aria-pressed', 'false');
    }
    const container = document.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange exit', e); } }, 200);
  }
}

document.addEventListener('fullscreenchange', _handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', _handleFullscreenChange);
document.addEventListener('msfullscreenchange', _handleFullscreenChange);

/* ==================== FILTER / NAVIGATION HELPERS ==================== */

function filterJobsByLocation(location) {
  // If locationFilter input exists, set it and call filterJobs(), otherwise perform a simple local filter.
  if (!locationFilter) {
    filteredJobs = (location === 'Remote')
      ? jobsData.filter(j => ((j.location || '').toLowerCase() === 'remote'))
      : jobsData.filter(j => ((j.location || '').toLowerCase().includes(location.toLowerCase())));
    renderJobsIfPossible(filteredJobs);
    scrollToJobsSection();
    return;
  }

  let filterValue = '';
  switch (location) {
    case 'Remote': filterValue = 'remote'; break;
    case 'New York': filterValue = 'new-york'; break;
    case 'San Francisco': filterValue = 'san-francisco'; break;
    case 'London': filterValue = 'london'; break;
    case 'Berlin': filterValue = 'berlin'; break;
    default: filterValue = location.toLowerCase().replace(/\s+/g, '-');
  }

  locationFilter.value = filterValue;

  // Prefer an existing filterJobs() implementation; otherwise do local filter/render
  if (typeof filterJobs === 'function') {
    try { filterJobs(); } catch (e) { console.warn('filterJobs() threw an error', e); localFilterAndRender(); }
  } else {
    localFilterAndRender();
  }

  scrollToJobsSection();
}

function localFilterAndRender() {
  const locVal = locationFilter ? locationFilter.value : '';
  if (!locVal) {
    filteredJobs = Array.from(jobsData);
  } else {
    filteredJobs = jobsData.filter(j => {
      const loc = (j.location || '').toLowerCase().replace(/\s+/g, '-');
      return loc.includes(locVal.toLowerCase());
    });
  }
  renderJobsIfPossible(filteredJobs);
}

function renderJobsIfPossible(list) {
  // Call renderJobs(list) if provided by app; otherwise render simple cards into #jobsList
  if (typeof renderJobs === 'function') {
    try { renderJobs(list); return; } catch (e) { console.warn('renderJobs() threw an error', e); }
  }

  if (!jobsList) return;

  jobsList.innerHTML = '';
  (list || []).forEach(job => {
    const card = document.createElement('article');
    card.className = 'job-card';
    card.innerHTML = `<h3>${escapeHtml(job.title)}</h3>
                      <p class="company">${escapeHtml(job.company)}</p>
                      <p class="location">${escapeHtml(job.location || '')}</p>`;
    jobsList.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = String((list || []).length);
  if (noResults) noResults.style.display = (list || []).length === 0 ? 'block' : 'none';
}

function scrollToJobsSection() {
  const jobsSection = document.querySelector('.jobs-section');
  if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== UTILITIES ==================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

/* ==================== EVENT LISTENERS ==================== */

function attachEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); });
  }

  // Simple view toggle (if present)
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');

  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active'); listViewBtn.classList.remove('active');
      mapContainer.removeAttribute('hidden'); listContainer.setAttribute('hidden', '');
      // invalidate map size
      try { const map = mapContainer._leafletMap || window._currentLeafletMap; if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) {}
    });
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active'); mapViewBtn.classList.remove('active');
      listContainer.removeAttribute('hidden'); mapContainer.setAttribute('hidden', '');
    });
  }
}

/* ==================== INITIALIZATION ==================== */

function init() {
  initializeTheme();
  // Render jobs initially if available
  try { renderJobsIfPossible(jobsData); } catch (e) { console.warn('Initial job render failed', e); }
  attachEventListeners();
  // Initialize the world map after small delay to let layout settle
  setTimeout(initMap, 100);
}

/* Auto-run init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.className = `${newTheme}-theme`;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ==================== LANGUAGE MANAGEMENT ====================
const languageData = {
    en: { flag: "🇬🇧", name: "English" },
    es: { flag: "🇪🇸", name: "Español" },
    fr: { flag: "🇫🇷", name: "Français" },
    de: { flag: "🇩🇪", name: "Deutsch" }
};

function initializeLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguageDisplay(savedLang);
}

function updateLanguageDisplay(lang) {
    const langBtn = document.getElementById('langBtn');
    if (langBtn && languageData[lang]) {
        langBtn.querySelector('.flag-icon').textContent = languageData[lang].flag;
    }
}

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function selectLanguage(lang) {
    localStorage.setItem('language', lang);
    updateLanguageDisplay(lang);
    toggleLanguageDropdown();
    // Here you would typically trigger translation of the page content
    console.log(`Language changed to: ${languageData[lang].name}`);
}

// ==================== PROMO BANNER ====================
function initializePromoBanner() {
    const banner = document.getElementById('promoBanner');
    const closeBtn = document.getElementById('closeBanner');
    const bannerClosed = localStorage.getItem('promoBannerClosed');
    
    if (bannerClosed === 'true') {
        banner.classList.add('hidden');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            localStorage.setItem('promoBannerClosed', 'true');
        });
    }
}

/* Merged application script
   Combined from website_design_1.0 + main + website_sign-in/sign-up_1.0 branch fragments.
   Responsibilities: categories, theme management, job state, map init & helpers, rendering + filtering.
*/

/* ==================== CATEGORIES ==================== */
const categories = [
  { name: "Customer Service", icon: "❤️", count: 2 },
  { name: "Technology", icon: "💻", count: 0 },
  { name: "Healthcare", icon: "🏥", count: 0 },
  { name: "Sales", icon: "💰", count: 0 },
  { name: "Marketing", icon: "📱", count: 0 },
  { name: "Finance", icon: "📊", count: 0 }
];

/* ==================== THEME MANAGEMENT ==================== */
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeIcon(savedTheme);
  } catch (e) {
    console.warn('Failed to initialize theme', e);
  }
}

function toggleTheme() {
  const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${next}-theme`);
  try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  updateThemeIcon(next);
}

/* ==================== JOB STATE & DOM ELEMENTS ==================== */
// Ensure jobsData exists (may be provided in a separate file or on window)
const jobsData = (typeof window !== 'undefined' && Array.isArray(window.jobsData)) ? window.jobsData : [];

// Filtered state
let filteredJobs = Array.from(jobsData);

// DOM element references (defensive)
const searchInput = typeof document !== 'undefined' ? document.getElementById('searchInput') : null;
const locationFilter = typeof document !== 'undefined' ? document.getElementById('locationFilter') : null;
const typeFilter = typeof document !== 'undefined' ? document.getElementById('typeFilter') : null;
const categoryFilter = typeof document !== 'undefined' ? document.getElementById('categoryFilter') : null;
const jobsList = typeof document !== 'undefined' ? document.getElementById('jobsList') : null;
const resultsCount = typeof document !== 'undefined' ? document.getElementById('resultsCount') : null;
const clearFilters = typeof document !== 'undefined' ? document.getElementById('clearFilters') : null;
const noResults = typeof document !== 'undefined' ? document.getElementById('noResults') : null;
const loading = typeof document !== 'undefined' ? document.getElementById('loading') : null;
const modal = typeof document !== 'undefined' ? document.getElementById('jobModal') : null;
const closeModal = typeof document !== 'undefined' ? (document.getElementsByClassName('close')[0] || null) : null;

function isElement(el) { return el !== null && el !== undefined; }

/* ==================== MAP INITIALIZATION & HELPERS ==================== */

function initMap() {
  const mapContainer = document.getElementById('jobMap');
  if (!mapContainer) {
    console.info('Map container not found; skipping map initialization.');
    return;
  }

  // If Leaflet isn't available, try dynamically loading it from a CDN as a fallback
  if (typeof L === 'undefined') {
    console.warn('Leaflet not detected. Attempting to load from CDN...');
    const jsCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    const cssCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
    // Load CSS if not present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssCdn;
      document.head.appendChild(link);
    }

    // Try loading Leaflet script
    loadScript(jsCdn, 7000)
      .then(() => {
        console.log('Leaflet loaded dynamically.');
        renderLeafletMap(mapContainer);
      })
      .catch(err => {
        console.error('Failed to load Leaflet dynamically:', err);
        mapContainer.innerHTML = '<p style="text-align:center;padding:1rem;">Map failed to load. Please refresh the page and check network connectivity.</p>';
      });
    return;
  }

  renderLeafletMap(mapContainer);
}

// Utility to dynamically load a script with a timeout
function loadScript(src, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    // Prevent duplicate loads
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script failed to load: ' + src));
    document.head.appendChild(script);

    if (timeoutMs) {
      setTimeout(() => reject(new Error('Script load timeout: ' + src)), timeoutMs);
    }
  });
}

function renderLeafletMap(container) {
  container.innerHTML = '';

  const mapCanvas = document.createElement('div');
  mapCanvas.style.height = '100%';
  mapCanvas.style.width = '100%';
  mapCanvas.className = 'leaflet-map-wrapper';
  container.appendChild(mapCanvas);

  const map = L.map(mapCanvas, {
    zoomControl: true,
    worldCopyJump: true
  }).setView([25, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const jobsByLocation = groupJobsByLocation(jobsData);
  const locationCoords = getLocationCoordinates();
  const bounds = [];

  Object.entries(jobsByLocation).forEach(([location, jobs]) => {
    const coords = locationCoords[location];
    if (!coords) {
      console.warn(`Missing coordinates for location: ${location}`);
      return;
    }

    const markerOptions = location === 'Remote' ? {
      icon: L.divIcon({
        className: 'remote-icon',
        html: '<span>R</span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    } : {};

    const marker = L.marker(coords, markerOptions).addTo(map);
    marker.bindPopup(createPopupContent(location, jobs));
    marker.on('popupopen', (event) => attachPopupFilter(event, location));
    marker.on('click', () => filterJobsByLocation(location));

    bounds.push(coords);
  });

  if (bounds.length > 0) {
    try { map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 }); } catch (e) { /* ignore */ }
  }

  map.once('load', () => map.invalidateSize());

  appendMapLegend(container);

  // Expose map on container and window so other code can access it
  try { container._leafletMap = map; window._currentLeafletMap = map; } catch (e) { /* ignore */ }
}

function groupJobsByLocation(jobs) {
  return (jobs || []).reduce((acc, job) => {
    const location = job.location || 'Remote';
    if (!acc[location]) acc[location] = [];
    acc[location].push(job);
    return acc;
  }, {});
}

function getLocationCoordinates() {
  return {
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Berlin': [52.52, 13.405],
    'Remote': [0, 0]
  };
}

function createPopupContent(location, jobs) {
  const limitedJobs = (jobs || []).slice(0, 4);
  const remaining = (jobs || []).length - limitedJobs.length;
  const jobItems = limitedJobs.map(job => `<li>${escapeHtml(job.title)} &mdash; ${escapeHtml(job.company)}</li>`).join('');

  return `
    <div class="map-popup">
      <strong>${escapeHtml(location)}</strong><br/>
      ${(jobs || []).length} job${((jobs || []).length !== 1 ? 's' : '')}
      <ul>${jobItems}</ul>
      ${remaining > 0 ? `<em>+${remaining} more</em>` : ''}
      <button type="button" class="map-popup-action">View roles</button>
    </div>
  `;
}

function attachPopupFilter(event, location) {
  const popupEl = event.popup && event.popup.getElement && event.popup.getElement();
  if (!popupEl) return;
  const actionBtn = popupEl.querySelector('.map-popup-action');
  if (!actionBtn) return;

  actionBtn.onclick = (btnEvent) => {
    btnEvent.preventDefault();
    filterJobsByLocation(location);
    try { event.popup.close(); } catch (e) { /* ignore */ }
  };
}

function appendMapLegend(container) {
  // Keep the UI minimal: do not append a heavy legend. Only show fullscreen control.
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'map-fullscreen-btn';
  fullscreenBtn.setAttribute('aria-label', 'Toggle full screen');
  fullscreenBtn.setAttribute('title', 'Toggle full screen');
  fullscreenBtn.innerHTML = '<span class="icon">⛶</span><span class="label">Full Screen</span>';

  fullscreenBtn.addEventListener('click', () => {
    const mapSection = container.closest('.map-section');
    if (!mapSection) return;
    toggleMapFullscreen(mapSection);
  });

  const existingBtn = container.querySelector('.map-fullscreen-btn');
  if (existingBtn) existingBtn.remove();
  container.appendChild(fullscreenBtn);
}

function toggleMapFullscreen(section) {
  const container = section.querySelector('.map-container');
  if (!container) return;
  const map = container._leafletMap || window._currentLeafletMap;
  const btn = section.querySelector('.map-fullscreen-btn');

  // Cross-browser native fullscreen support detection
  const canUseNativeFullscreen = !!( (section.requestFullscreen || section.webkitRequestFullscreen || section.msRequestFullscreen) && (document.fullscreenEnabled || document.webkitIsFullScreen === true || document.msFullscreenElement) );

  const isCurrentlyFullscreen = document.fullscreenElement === section || section.classList.contains('fullscreen');

  if (canUseNativeFullscreen) {
    if (!isCurrentlyFullscreen) {
      section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
      requestFullscreenCompat(section).catch(err => {
        console.warn('Native fullscreen request failed, falling back to overlay fullscreen.', err);
        enterOverlayFullscreen(section, btn);
      });
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreenCompat().catch(err => {
          console.warn('Error exiting fullscreen, toggling overlay fallback instead.', err);
          exitOverlayFullscreen(section, btn);
        });
      } else {
        exitOverlayFullscreen(section, btn);
      }
    }
  } else {
    const ENTERED = section.classList.toggle('fullscreen');
    if (ENTERED) enterOverlayFullscreen(section, btn); else exitOverlayFullscreen(section, btn);
  }
}

/* Fullscreen helpers */
function requestFullscreenCompat(element) {
  if (element.requestFullscreen) return element.requestFullscreen();
  if (element.webkitRequestFullscreen) return new Promise((resolve, reject) => { try { element.webkitRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (element.msRequestFullscreen) return new Promise((resolve, reject) => { try { element.msRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Fullscreen API is not supported on this element'));
}

function exitFullscreenCompat() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return new Promise((resolve, reject) => { try { document.webkitExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (document.msExitFullscreen) return new Promise((resolve, reject) => { try { document.msExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Exit fullscreen is not supported on this document'));
}

function enterOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.add('fullscreen');
  document.body.classList.add('map-fullscreen-active');
  section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Exit Full Screen';
    btn.setAttribute('aria-pressed', 'true');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on enterOverlayFullscreen', e); } }, 200);
}

function exitOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.remove('fullscreen');
  document.body.classList.remove('map-fullscreen-active');
  document.body.style.overflow = '';
  if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Full Screen';
    btn.setAttribute('aria-pressed', 'false');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on exitOverlayFullscreen', e); } }, 200);
}

/* Fullscreen key handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) { /* ignore */ }
      return;
    }
    const active = document.querySelector('.map-section.fullscreen');
    if (active) toggleMapFullscreen(active);
  }
});

/* Handle native fullscreen changes to update UI */
function _handleFullscreenChange() {
  const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (fsElem && fsElem.classList && fsElem.classList.contains('map-section')) {
    fsElem.classList.add('fullscreen');
    document.body.classList.add('map-fullscreen-active');
    const btn = fsElem.querySelector('.map-fullscreen-btn');
    if (btn) {
      const label = btn.querySelector('.label');
      if (label) label.textContent = 'Exit Full Screen';
      btn.setAttribute('aria-pressed', 'true');
    }
    const container = fsElem.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange enter', e); } }, 200);
  } else {
    const active = document.querySelector('.map-section.fullscreen');
    if (active) {
      active.classList.remove('fullscreen');
      if (active._previousScroll != null) window.scrollTo(0, active._previousScroll);
    }
    document.body.classList.remove('map-fullscreen-active');
    document.body.style.overflow = '';
    if (active) {
      const btnActive = active.querySelector('.map-fullscreen-btn');
      if (btnActive) btnActive.setAttribute('aria-pressed', 'false');
    }
    const container = document.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange exit', e); } }, 200);
  }
}

document.addEventListener('fullscreenchange', _handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', _handleFullscreenChange);
document.addEventListener('msfullscreenchange', _handleFullscreenChange);

/* ==================== VIEW TOGGLE (MAP/LIST) ==================== */
function initializeViewToggle() {
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');

  // Add event listeners for view toggle (from main branch)
  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      mapContainer.removeAttribute('hidden');
      listContainer.setAttribute('hidden', '');
      // Invalidate map size
      try { const map = mapContainer._leafletMap || window._currentLeafletMap; if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) {}
    });
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      mapViewBtn.classList.remove('active');
      listContainer.removeAttribute('hidden');
      mapContainer.setAttribute('hidden', '');
    });
  }
}

/* ==================== FILTER / NAVIGATION HELPERS ==================== */

function filterJobsByLocation(location) {
  // If locationFilter input exists, set it and call filterJobs(), otherwise perform a simple local filter.
  if (!locationFilter) {
    filteredJobs = (location === 'Remote')
      ? jobsData.filter(j => ((j.location || '').toLowerCase() === 'remote'))
      : jobsData.filter(j => ((j.location || '').toLowerCase().includes(location.toLowerCase())));
    renderJobsIfPossible(filteredJobs);
    scrollToJobsSection();
    return;
  }

  let filterValue = '';
  switch (location) {
    case 'Remote': filterValue = 'remote'; break;
    case 'New York': filterValue = 'new-york'; break;
    case 'San Francisco': filterValue = 'san-francisco'; break;
    case 'London': filterValue = 'london'; break;
    case 'Berlin': filterValue = 'berlin'; break;
    default: filterValue = location.toLowerCase().replace(/\s+/g, '-');
  }

  locationFilter.value = filterValue;

  // Prefer an existing filterJobs() implementation; otherwise do local filter/render
  if (typeof filterJobs === 'function') {
    try { filterJobs(); } catch (e) { console.warn('filterJobs() threw an error', e); localFilterAndRender(); }
  } else {
    localFilterAndRender();
  }

  scrollToJobsSection();
}

function localFilterAndRender() {
  const locVal = locationFilter ? locationFilter.value : '';
  if (!locVal) {
    filteredJobs = Array.from(jobsData);
  } else {
    filteredJobs = jobsData.filter(j => {
      const loc = (j.location || '').toLowerCase().replace(/\s+/g, '-');
      return loc.includes(locVal.toLowerCase());
    });
  }
  renderJobsIfPossible(filteredJobs);
}

function renderJobsIfPossible(list) {
  // Call renderJobs(list) if provided by app; otherwise render simple cards into #jobsList
  if (typeof renderJobs === 'function') {
    try { renderJobs(list); return; } catch (e) { console.warn('renderJobs() threw an error', e); }
  }

  if (!jobsList) return;

  jobsList.innerHTML = '';
  (list || []).forEach(job => {
    const card = createJobCard(job);
    jobsList.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = String((list || []).length);
  if (noResults) noResults.style.display = (list || []).length === 0 ? 'block' : 'none';
}

// Render jobs to the page (from website_sign-in/sign-up_1.0)
function renderJobs(jobs) {
  if (!isElement(jobsList)) return;
  jobsList.innerHTML = '';

  if (!isElement(noResults) || !isElement(resultsCount)) {
    // If any of these elements are missing, keep things safe
    jobs.forEach(job => jobsList.appendChild(createJobCard(job)));
    return;
  }

  if (jobs.length === 0) {
    noResults.style.display = 'block';
    jobsList.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    jobsList.style.display = 'grid';

    jobs.forEach(job => {
      const jobCard = createJobCard(job);
      jobsList.appendChild(jobCard);
    });
  }

  // Update results count (merged from website_sign-in/sign-up_1.0)
  resultsCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;
}

function createJobCard(job) {
  const card = document.createElement('article');
  card.className = 'job-card';
  card.innerHTML = `
    <h3>${escapeHtml(job.title)}</h3>
    <p class="company">${escapeHtml(job.company)}</p>
    <p class="location">${escapeHtml(job.location || 'Remote')}</p>
    <p class="description">${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  // Add click handler for modal (if modal is available)
  card.addEventListener('click', () => showJobDetail(job));
  return card;
}

// Show job detail in modal (from website_sign-in/sign-up_1.0)
function showJobDetail(job) {
  if (!isElement(modal) || !isElement(document.getElementById('jobDetail'))) return;
  const jobDetail = document.getElementById('jobDetail');
  jobDetail.innerHTML = `
    <h2>${escapeHtml(job.title)}</h2>
    <p><strong>Company:</strong> ${escapeHtml(job.company)}</p>
    <p><strong>Location:</strong> ${escapeHtml(job.location || 'Remote')}</p>
    <p><strong>Description:</strong> ${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  modal.style.display = 'block';

  // Close modal functionality
  if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
  }
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
}

function scrollToJobsSection() {
  const jobsSection = document.querySelector('.jobs-section');
  if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== UTILITIES ==================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

/* ==================== EVENT LISTENERS ==================== */

function attachEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); });
  }

  // View toggle initialization
  initializeViewToggle();
}

/* ==================== INITIALIZATION ==================== */

function init() {
  initializeTheme();
  // Render jobs initially if available
  try { renderJobsIfPossible(jobsData); } catch (e) { console.warn('Initial job render failed', e); }
  attachEventListeners();
  // Initialize the world map after small delay to let layout settle
  setTimeout(initMap, 100);
}

/* Auto-run init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
  try {
    if (loading) loading.style.display = 'block';
    if (jobsList) jobsList.style.display = 'none';

    // Example API call (replace with your actual API endpoint)
    // const response = await fetch('https://api.example.com/jobs');
    // const data = await response.json();
    // window.jobsData = data;

    if (loading) loading.style.display = 'none';
    renderJobs(window.jobsData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (loading) loading.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}

// Uncomment to use API integration
// fetchJobsFromAPI();

console.log('✅ Website initialized successfully!');
console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');
    
    if (mapViewBtn && listViewBtn) {
        mapViewBtn.addEventListener('click', () => {
            mapViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            mapContainer.style.display = 'flex';
            listContainer.style.display = 'none';
        });
        
        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            mapViewBtn.classList.remove('active');
            mapContainer.style.display = 'none';
            listContainer.style.display = 'block';
        });
    }
}

// ==================== JOB RENDERING ====================
function renderJobCard(job) {
    return `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    ${job.trending ? '<div class="job-card-badge">📈 Trending Jobs</div>' : ''}
                </div>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">
                <span>${job.company}</span>
                <span class="company-badge">${job.type}</span>
                <span>⭐ ${job.rating} (${job.reviews})</span>
            </div>
            <div class="job-meta">
                <div class="job-meta-item">
                    <i class="fas fa-map-pin"></i>
                    <span>${job.workMode}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
            </div>
            <div class="job-meta">
                <span class="job-type-badge">${job.jobType}</span>
                <span class="job-salary">${job.salary}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-stats">
                <div class="job-stat">
                    <i class="fas fa-clock"></i>
                    <span>${job.postedTime}</span>
                </div>
                <div class="job-stat">
                    <i class="fas fa-eye"></i>
                    <span>${job.views} views</span>
                </div>
                <div class="job-stat">
                    <i class="fas fa-user"></i>
                    <span>${job.applications} applications</span>
                </div>
            </div>
            <div class="job-actions">
                <button class="job-btn job-btn-primary" onclick="applyToJob(${job.id})">View Details</button>
                <button class="job-btn job-btn-secondary" onclick="likeJob(${job.id})">
                    <i class="far fa-heart"></i>
                    <span class="like-count">0</span>
                    Like
                </button>
            </div>
        </div>
    `;
}

function renderCategoryCard(category) {
    return `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-icon">${category.icon}</div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-count">${category.count} jobs</p>
        </div>
    `;
}

function loadJobs() {
    // Load trending jobs
    const trendingJobsList = document.getElementById('trendingJobsList');
    if (trendingJobsList) {
        const trendingJobs = demoJobs.filter(job => job.trending);
        trendingJobsList.innerHTML = trendingJobs.map(job => renderJobCard(job)).join('');
    }
    
    // Load search results
    const searchJobsList = document.getElementById('searchJobsList');
    if (searchJobsList) {
        searchJobsList.innerHTML = demoJobs.map(job => renderJobCard(job)).join('');
    }
    
    // Update search results count
    const searchResultsCount = document.getElementById('searchResultsCount');
    if (searchResultsCount) {
        searchResultsCount.textContent = demoJobs.length;
    }
}

function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(category => renderCategoryCard(category)).join('');
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function performSearch() {
    const jobTitle = document.getElementById('jobTitleInput')?.value || '';
    const location = document.getElementById('locationInput')?.value || '';
    const jobType = document.getElementById('jobTypeSelect')?.value || '';
    const minSalary = document.getElementById('minSalaryInput')?.value || '';
    
// Merged filtering logic from website_design_1.0 and main branches
// Supports jobTitle, location, jobType, minSalary (from website_design_1.0) and searchTerm, type, category (from main)

function filterJobs() {
    console.log('Searching with:', { jobTitle: searchInput ? searchInput.value : '', location: locationFilter ? locationFilter.value : '', jobType: typeFilter ? typeFilter.value : '', minSalary: /* minSalary input if present */ '', searchTerm: searchInput ? searchInput.value : '' });

    // Use jobsData (or demoJobs as fallback)
    const jobs = window.jobsData || demoJobs || [];

    // Filter jobs based on combined criteria
    filteredJobs = jobs.filter(job => {
        // From website_design_1.0
        const jobTitle = searchInput ? searchInput.value : '';
        const location = locationFilter ? locationFilter.value : '';
        const jobType = typeFilter ? typeFilter.value : '';
        // Assume minSalary is from another filter, e.g., a slider or input
        const minSalary = 0; // Placeholder; implement as needed

        const matchesTitle = !jobTitle || job.title.toLowerCase().includes(jobTitle.toLowerCase());
        const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase()) || (location && job.location.toLowerCase().replace(/\s+/g, '-') === location);
        const matchesType = !jobType || (job.jobType && job.jobType.toLowerCase() === jobType.toLowerCase()) || (job.type && job.type === jobType);
        const matchesSalary = !minSalary || (job.salary && job.salary >= minSalary);

        // From main
        const searchTerm = jobTitle; // Assuming searchTerm is jobTitle
        const type = jobType;
        const category = categoryFilter ? categoryFilter.value : '';

        const matchesSearch = !searchTerm || job.title.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm) ||
                            (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

        const matchesCategory = !category || job.category === category;

        // Combine all matches
        return matchesTitle && matchesLocation && matchesType && matchesSalary && matchesSearch && matchesCategory;
    });

    // Render the filtered jobs
    renderJobs(filteredJobs);
}
        
        return matchesTitle && matchesLocation && matchesType;
    });
    
    // Update search results
    const searchJobsList = document.getElementById('searchJobsList');
    if (searchJobsList) {
        if (filteredJobs.length > 0) {
            searchJobsList.innerHTML = filteredJobs.map(job => renderJobCard(job)).join('');
        } else {
            searchJobsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No jobs found matching your criteria.</p>';
        }
    }
    
    // Update count
    const searchResultsCount = document.getElementById('searchResultsCount');
    if (searchResultsCount) {
        searchResultsCount.textContent = filteredJobs.length;
    }
    
    // Switch to list view to show results
    document.getElementById('listViewBtn')?.click();
}

function clearFilters() {
    document.getElementById('jobTitleInput').value = '';
    document.getElementById('locationInput').value = '';
    document.getElementById('jobTypeSelect').value = '';
    document.getElementById('minSalaryInput').value = '';
    
    // Reload all jobs
    loadJobs();
}

// ==================== JOB ACTIONS ====================
function applyToJob(jobId) {
    const job = demoJobs.find(j => j.id === jobId);
    if (job) {
        alert(`Applying to: ${job.title}\n\nThis would redirect to the application page.`);
        // In a real app, redirect to application page or open modal
    }
}

function likeJob(jobId) {
    console.log(`Liked job ID: ${jobId}`);
    // In a real app, this would save to backend and update UI
    alert('Job saved to your favorites!');
}

/* Merged application script
   Combined from website_design_1.0 + main + website_sign-in/sign-up_1.0 branch fragments.
   Responsibilities: categories, theme management, job state, map init & helpers, rendering + filtering.
*/

/* ==================== CATEGORIES ==================== */
const categories = [
  { name: "Customer Service", icon: "❤️", count: 2 },
  { name: "Technology", icon: "💻", count: 0 },
  { name: "Healthcare", icon: "🏥", count: 0 },
  { name: "Sales", icon: "💰", count: 0 },
  { name: "Marketing", icon: "📱", count: 0 },
  { name: "Finance", icon: "📊", count: 0 }
];

/* ==================== THEME MANAGEMENT ==================== */
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeIcon(savedTheme);
  } catch (e) {
    console.warn('Failed to initialize theme', e);
  }
}

function toggleTheme() {
  const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${next}-theme`);
  try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  updateThemeIcon(next);
}

/* ==================== JOB STATE & DOM ELEMENTS ==================== */
// Ensure jobsData exists (may be provided in a separate file or on window)
const jobsData = (typeof window !== 'undefined' && Array.isArray(window.jobsData)) ? window.jobsData : [];

// Filtered state
let filteredJobs = Array.from(jobsData);

// DOM element references (defensive)
const searchInput = typeof document !== 'undefined' ? document.getElementById('searchInput') : null;
const locationFilter = typeof document !== 'undefined' ? document.getElementById('locationFilter') : null;
const typeFilter = typeof document !== 'undefined' ? document.getElementById('typeFilter') : null;
const categoryFilter = typeof document !== 'undefined' ? document.getElementById('categoryFilter') : null;
const jobsList = typeof document !== 'undefined' ? document.getElementById('jobsList') : null;
const resultsCount = typeof document !== 'undefined' ? document.getElementById('resultsCount') : null;
const clearFilters = typeof document !== 'undefined' ? document.getElementById('clearFilters') : null;
const noResults = typeof document !== 'undefined' ? document.getElementById('noResults') : null;
const loading = typeof document !== 'undefined' ? document.getElementById('loading') : null;
const modal = typeof document !== 'undefined' ? document.getElementById('jobModal') : null;
const closeModal = typeof document !== 'undefined' ? (document.getElementsByClassName('close')[0] || null) : null;

function isElement(el) { return el !== null && el !== undefined; }

/* ==================== MAP INITIALIZATION & HELPERS ==================== */

function initMap() {
  const mapContainer = document.getElementById('jobMap');
  if (!mapContainer) {
    console.info('Map container not found; skipping map initialization.');
    return;
  }

  // If Leaflet isn't available, try dynamically loading it from a CDN as a fallback
  if (typeof L === 'undefined') {
    console.warn('Leaflet not detected. Attempting to load from CDN...');
    const jsCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    const cssCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
    // Load CSS if not present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssCdn;
      document.head.appendChild(link);
    }

    // Try loading Leaflet script
    loadScript(jsCdn, 7000)
      .then(() => {
        console.log('Leaflet loaded dynamically.');
        renderLeafletMap(mapContainer);
      })
      .catch(err => {
        console.error('Failed to load Leaflet dynamically:', err);
        mapContainer.innerHTML = '<p style="text-align:center;padding:1rem;">Map failed to load. Please refresh the page and check network connectivity.</p>';
      });
    return;
  }

  renderLeafletMap(mapContainer);
}

// Utility to dynamically load a script with a timeout
function loadScript(src, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    // Prevent duplicate loads
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script failed to load: ' + src));
    document.head.appendChild(script);

    if (timeoutMs) {
      setTimeout(() => reject(new Error('Script load timeout: ' + src)), timeoutMs);
    }
  });
}

function renderLeafletMap(container) {
  container.innerHTML = '';

  const mapCanvas = document.createElement('div');
  mapCanvas.style.height = '100%';
  mapCanvas.style.width = '100%';
  mapCanvas.className = 'leaflet-map-wrapper';
  container.appendChild(mapCanvas);

  const map = L.map(mapCanvas, {
    zoomControl: true,
    worldCopyJump: true
  }).setView([25, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const jobsByLocation = groupJobsByLocation(jobsData);
  const locationCoords = getLocationCoordinates();
  const bounds = [];

  Object.entries(jobsByLocation).forEach(([location, jobs]) => {
    const coords = locationCoords[location];
    if (!coords) {
      console.warn(`Missing coordinates for location: ${location}`);
      return;
    }

    const markerOptions = location === 'Remote' ? {
      icon: L.divIcon({
        className: 'remote-icon',
        html: '<span>R</span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    } : {};

    const marker = L.marker(coords, markerOptions).addTo(map);
    marker.bindPopup(createPopupContent(location, jobs));
    marker.on('popupopen', (event) => attachPopupFilter(event, location));
    marker.on('click', () => filterJobsByLocation(location));

    bounds.push(coords);
  });

  if (bounds.length > 0) {
    try { map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 }); } catch (e) { /* ignore */ }
  }

  map.once('load', () => map.invalidateSize());

  appendMapLegend(container);

  // Expose map on container and window so other code can access it
  try { container._leafletMap = map; window._currentLeafletMap = map; } catch (e) { /* ignore */ }
}

function groupJobsByLocation(jobs) {
  return (jobs || []).reduce((acc, job) => {
    const location = job.location || 'Remote';
    if (!acc[location]) acc[location] = [];
    acc[location].push(job);
    return acc;
  }, {});
}

function getLocationCoordinates() {
  return {
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Berlin': [52.52, 13.405],
    'Remote': [0, 0]
  };
}

function createPopupContent(location, jobs) {
  const limitedJobs = (jobs || []).slice(0, 4);
  const remaining = (jobs || []).length - limitedJobs.length;
  const jobItems = limitedJobs.map(job => `<li>${escapeHtml(job.title)} &mdash; ${escapeHtml(job.company)}</li>`).join('');

  return `
    <div class="map-popup">
      <strong>${escapeHtml(location)}</strong><br/>
      ${(jobs || []).length} job${((jobs || []).length !== 1 ? 's' : '')}
      <ul>${jobItems}</ul>
      ${remaining > 0 ? `<em>+${remaining} more</em>` : ''}
      <button type="button" class="map-popup-action">View roles</button>
    </div>
  `;
}

function attachPopupFilter(event, location) {
  const popupEl = event.popup && event.popup.getElement && event.popup.getElement();
  if (!popupEl) return;
  const actionBtn = popupEl.querySelector('.map-popup-action');
  if (!actionBtn) return;

  actionBtn.onclick = (btnEvent) => {
    btnEvent.preventDefault();
    filterJobsByLocation(location);
    try { event.popup.close(); } catch (e) { /* ignore */ }
  };
}

function appendMapLegend(container) {
  // Keep the UI minimal: do not append a heavy legend. Only show fullscreen control.
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'map-fullscreen-btn';
  fullscreenBtn.setAttribute('aria-label', 'Toggle full screen');
  fullscreenBtn.setAttribute('title', 'Toggle full screen');
  fullscreenBtn.innerHTML = '<span class="icon">⛶</span><span class="label">Full Screen</span>';

  fullscreenBtn.addEventListener('click', () => {
    const mapSection = container.closest('.map-section');
    if (!mapSection) return;
    toggleMapFullscreen(mapSection);
  });

  const existingBtn = container.querySelector('.map-fullscreen-btn');
  if (existingBtn) existingBtn.remove();
  container.appendChild(fullscreenBtn);
}

function toggleMapFullscreen(section) {
  const container = section.querySelector('.map-container');
  if (!container) return;
  const map = container._leafletMap || window._currentLeafletMap;
  const btn = section.querySelector('.map-fullscreen-btn');

  // Cross-browser native fullscreen support detection
  const canUseNativeFullscreen = !!( (section.requestFullscreen || section.webkitRequestFullscreen || section.msRequestFullscreen) && (document.fullscreenEnabled || document.webkitIsFullScreen === true || document.msFullscreenElement) );

  const isCurrentlyFullscreen = document.fullscreenElement === section || section.classList.contains('fullscreen');

  if (canUseNativeFullscreen) {
    if (!isCurrentlyFullscreen) {
      section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
      requestFullscreenCompat(section).catch(err => {
        console.warn('Native fullscreen request failed, falling back to overlay fullscreen.', err);
        enterOverlayFullscreen(section, btn);
      });
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreenCompat().catch(err => {
          console.warn('Error exiting fullscreen, toggling overlay fallback instead.', err);
          exitOverlayFullscreen(section, btn);
        });
      } else {
        exitOverlayFullscreen(section, btn);
      }
    }
  } else {
    const ENTERED = section.classList.toggle('fullscreen');
    if (ENTERED) enterOverlayFullscreen(section, btn); else exitOverlayFullscreen(section, btn);
  }
}

/* Fullscreen helpers */
function requestFullscreenCompat(element) {
  if (element.requestFullscreen) return element.requestFullscreen();
  if (element.webkitRequestFullscreen) return new Promise((resolve, reject) => { try { element.webkitRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (element.msRequestFullscreen) return new Promise((resolve, reject) => { try { element.msRequestFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Fullscreen API is not supported on this element'));
}

function exitFullscreenCompat() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return new Promise((resolve, reject) => { try { document.webkitExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  if (document.msExitFullscreen) return new Promise((resolve, reject) => { try { document.msExitFullscreen(); resolve(); } catch (e) { reject(e); } });
  return Promise.reject(new Error('Exit fullscreen is not supported on this document'));
}

function enterOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.add('fullscreen');
  document.body.classList.add('map-fullscreen-active');
  section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Exit Full Screen';
    btn.setAttribute('aria-pressed', 'true');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on enterOverlayFullscreen', e); } }, 200);
}

function exitOverlayFullscreen(section, btn) {
  const container = section.querySelector('.map-container');
  section.classList.remove('fullscreen');
  document.body.classList.remove('map-fullscreen-active');
  document.body.style.overflow = '';
  if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
  if (btn) {
    const label = btn.querySelector('.label');
    if (label) label.textContent = 'Full Screen';
    btn.setAttribute('aria-pressed', 'false');
  }
  const map = container._leafletMap || window._currentLeafletMap;
  setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on exitOverlayFullscreen', e); } }, 200);
}

/* Fullscreen key handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) { /* ignore */ }
      return;
    }
    const active = document.querySelector('.map-section.fullscreen');
    if (active) toggleMapFullscreen(active);
  }
});

/* Handle native fullscreen changes to update UI */
function _handleFullscreenChange() {
  const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (fsElem && fsElem.classList && fsElem.classList.contains('map-section')) {
    fsElem.classList.add('fullscreen');
    document.body.classList.add('map-fullscreen-active');
    const btn = fsElem.querySelector('.map-fullscreen-btn');
    if (btn) {
      const label = btn.querySelector('.label');
      if (label) label.textContent = 'Exit Full Screen';
      btn.setAttribute('aria-pressed', 'true');
    }
    const container = fsElem.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange enter', e); } }, 200);
  } else {
    const active = document.querySelector('.map-section.fullscreen');
    if (active) {
      active.classList.remove('fullscreen');
      if (active._previousScroll != null) window.scrollTo(0, active._previousScroll);
    }
    document.body.classList.remove('map-fullscreen-active');
    document.body.style.overflow = '';
    if (active) {
      const btnActive = active.querySelector('.map-fullscreen-btn');
      if (btnActive) btnActive.setAttribute('aria-pressed', 'false');
    }
    const container = document.querySelector('.map-container');
    const map = container && (container._leafletMap || window._currentLeafletMap);
    setTimeout(() => { try { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) { console.warn('Error invalidating map size on fullscreenchange exit', e); } }, 200);
  }
}

document.addEventListener('fullscreenchange', _handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', _handleFullscreenChange);
document.addEventListener('msfullscreenchange', _handleFullscreenChange);

/* ==================== VIEW TOGGLE (MAP/LIST) ==================== */
function initializeViewToggle() {
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');

  // Add event listeners for view toggle (from main branch)
  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      mapContainer.removeAttribute('hidden');
      listContainer.setAttribute('hidden', '');
      // Invalidate map size
      try { const map = mapContainer._leafletMap || window._currentLeafletMap; if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); } catch (e) {}
    });
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      mapViewBtn.classList.remove('active');
      listContainer.removeAttribute('hidden');
      mapContainer.setAttribute('hidden', '');
    });
  }
}

/* ==================== FILTER / NAVIGATION HELPERS ==================== */

function filterByCategory(categoryName) {
  console.log(`Filtering by category: ${categoryName}`);
  alert(`Filtering jobs by ${categoryName} category.\n\nThis feature would show jobs in this category.`);
}

function filterJobsByLocation(location) {
  // If locationFilter input exists, set it and call filterJobs(), otherwise perform a simple local filter.
  if (!locationFilter) {
    filteredJobs = (location === 'Remote')
      ? jobsData.filter(j => ((j.location || '').toLowerCase() === 'remote'))
      : jobsData.filter(j => ((j.location || '').toLowerCase().includes(location.toLowerCase())));
    renderJobsIfPossible(filteredJobs);
    scrollToJobsSection();
    return;
  }

  let filterValue = '';
  switch (location) {
    case 'Remote': filterValue = 'remote'; break;
    case 'New York': filterValue = 'new-york'; break;
    case 'San Francisco': filterValue = 'san-francisco'; break;
    case 'London': filterValue = 'london'; break;
    case 'Berlin': filterValue = 'berlin'; break;
    default: filterValue = location.toLowerCase().replace(/\s+/g, '-');
  }

  locationFilter.value = filterValue;

  // Prefer an existing filterJobs() implementation; otherwise do local filter/render
  if (typeof filterJobs === 'function') {
    try { filterJobs(); } catch (e) { console.warn('filterJobs() threw an error', e); localFilterAndRender(); }
  } else {
    localFilterAndRender();
  }

  scrollToJobsSection();
}

function localFilterAndRender() {
  const locVal = locationFilter ? locationFilter.value : '';
  if (!locVal) {
    filteredJobs = Array.from(jobsData);
  } else {
    filteredJobs = jobsData.filter(j => {
      const loc = (j.location || '').toLowerCase().replace(/\s+/g, '-');
      return loc.includes(locVal.toLowerCase());
    });
  }
  renderJobsIfPossible(filteredJobs);
}

function renderJobsIfPossible(list) {
  // Call renderJobs(list) if provided by app; otherwise render simple cards into #jobsList
  if (typeof renderJobs === 'function') {
    try { renderJobs(list); return; } catch (e) { console.warn('renderJobs() threw an error', e); }
  }

  if (!jobsList) return;

  jobsList.innerHTML = '';
  (list || []).forEach(job => {
    const card = createJobCard(job);
    jobsList.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = String((list || []).length);
  if (noResults) noResults.style.display = (list || []).length === 0 ? 'block' : 'none';
}

// Render jobs to the page (from website_sign-in/sign-up_1.0)
function renderJobs(jobs) {
  if (!isElement(jobsList)) return;
  jobsList.innerHTML = '';

  if (!isElement(noResults) || !isElement(resultsCount)) {
    // If any of these elements are missing, keep things safe
    jobs.forEach(job => jobsList.appendChild(createJobCard(job)));
    return;
  }

  if (jobs.length === 0) {
    noResults.style.display = 'block';
    jobsList.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    jobsList.style.display = 'grid';

    jobs.forEach(job => {
      const jobCard = createJobCard(job);
      jobsList.appendChild(jobCard);
    });
  }

  // Update results count (merged from website_sign-in/sign-up_1.0)
  resultsCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;
}

function createJobCard(job) {
  const card = document.createElement('article');
  card.className = 'job-card';
  card.innerHTML = `
    <h3>${escapeHtml(job.title)}</h3>
    <p class="company">${escapeHtml(job.company)}</p>
    <p class="location">${escapeHtml(job.location || 'Remote')}</p>
    <p class="description">${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  // Add click handler for modal (if modal is available)
  card.addEventListener('click', () => showJobDetail(job));
  return card;
}

// Show job detail in modal (from website_sign-in/sign-up_1.0)
function showJobDetail(job) {
  if (!isElement(modal) || !isElement(document.getElementById('jobDetail'))) return;
  const jobDetail = document.getElementById('jobDetail');
  jobDetail.innerHTML = `
    <h2>${escapeHtml(job.title)}</h2>
    <p><strong>Company:</strong> ${escapeHtml(job.company)}</p>
    <p><strong>Location:</strong> ${escapeHtml(job.location || 'Remote')}</p>
    <p><strong>Description:</strong> ${escapeHtml(job.description || '')}</p>
    <a href="${job.applyUrl || '#'}" target="_blank" class="apply-btn">Apply Now</a>
  `;
  modal.style.display = 'block';

  // Close modal functionality
  if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
  }
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
}

function scrollToJobsSection() {
  const jobsSection = document.querySelector('.jobs-section');
  if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== LANGUAGE AND SEARCH HELPERS ==================== */

function toggleLanguageDropdown() {
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.classList.toggle('active');
  }
}

function selectLanguage(lang) {
  console.log(`Language selected: ${lang}`);
  // Implement language switching logic here
  alert(`Language switched to ${lang}.\n\nThis feature would change the site's language.`);
  // Close dropdown
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.classList.remove('active');
  }
}

function performSearch() {
  console.log('Performing search...');
  // Implement search logic here
  alert('Search feature would filter jobs based on title, location, and salary.');
}

function clearFilters() {
  console.log('Clearing filters...');
  // Implement clear filters logic here
  alert('Clearing all filters.');
}

/* ==================== UTILITIES ==================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

/* ==================== EVENT LISTENERS ==================== */

function attachEventListeners() {
  // Only attach listeners if the elements are present (from website_sign-in/sign-up_1.0)
  if (isElement(searchInput)) searchInput.addEventListener('input', () => { if (typeof filterJobs === 'function') filterJobs(); });
  if (isElement(locationFilter)) locationFilter.addEventListener('change', () => { if (typeof filterJobs === 'function') filterJobs(); });
  if (isElement(typeFilter)) typeFilter.addEventListener('change', () => { if (typeof filterJobs === 'function') filterJobs(); });
  if (isElement(categoryFilter)) categoryFilter.addEventListener('change', () => { if (typeof filterJobs === 'function') filterJobs(); });

  if (isElement(clearFilters)) clearFilters.addEventListener('click', clearAllFilters);

  // Modal close handlers (from website_sign-in/sign-up_1.0)
  if (isElement(closeModal) && isElement(modal)) {
    closeModal.onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(event) { if (event.target === modal) { modal.style.display = 'none'; } }
    document.addEventListener('keydown', function(event) { if (event.key === 'Escape' && modal.style.display === 'block') { modal.style.display = 'none'; } });
  }

  // Theme toggle (from main)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Language selector (from main)
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguageDropdown);
  }

  // Language options (from main)
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      selectLanguage(lang);
    });
  });

  // Close language dropdown when clicking outside (from main)
  document.addEventListener('click', function(event) {
    const langSelector = document.querySelector('.language-selector');
    if (langSelector && !langSelector.contains(event.target)) {
      document.getElementById('langDropdown')?.classList.remove('active');
    }
  });

  // Search button (from main)
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // Clear filters button (from main)
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }

  // Enter key on search inputs (from main)
  ['jobTitleInput', 'locationInput', 'minSalaryInput'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }
  });

  // View toggle initialization
  initializeViewToggle();
}

/* ==================== INITIALIZATION ==================== */

function init() {
  initializeTheme();
  // Render jobs initially if available
  try { renderJobsIfPossible(jobsData); } catch (e) { console.warn('Initial job render failed', e); }
  attachEventListeners();
  // Initialize the world map after small delay to let layout settle
  setTimeout(initMap, 100);
}

/* Auto-run init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
  try {
    if (loading) loading.style.display = 'block';
    if (jobsList) jobsList.style.display = 'none';

    // Example API call (replace with your actual API endpoint)
    // const response = await fetch('https://api.example.com/jobs');
    // const data = await response.json();
    // window.jobsData = data;

    if (loading) loading.style.display = 'none';
    renderJobs(window.jobsData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (loading) loading.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}

// Uncomment to use API integration
// fetchJobsFromAPI();

console.log('✅ Website initialized successfully!');
console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializePromoBanner();
    initializeViewToggle();
    initializeEventListeners();
    loadJobs();
    loadCategories();
    
// Merged initialization and optional API fetch from website_design_1.0 and main branches

// Optional loading simulation
function simulateLoading() {
    setTimeout(() => {
        if (loading) loading.style.display = 'none';
        init();
    }, 800);
}

// Start the application
// simulateLoading(); // Uncomment to show loading animation
init();

console.log('✅ Website initialized successfully!');
console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
    try {
        if (loading) loading.style.display = 'block';
        if (jobsList) jobsList.style.display = 'none';
        
        // Example API call (replace with your actual API endpoint)
        // const response = await fetch('https://api.example.com/jobs');
        // const data = await response.json();
        // window.jobsData = data;
        
        if (loading) loading.style.display = 'none';
        renderJobs(window.jobsData);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        if (loading) loading.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
    }
}

// Uncomment to use API integration
// fetchJobsFromAPI();
