/* ============================================================
   Godin Dan Estella — Portfolio
   External JavaScript (script.js)
   Interactions:
   1. Welcome message (alert)
   2. Dark / Light mode toggle
   3. Show / Hide "Read More" information
   4. Back-to-top button
   5. Current date & time (live)
   6. Alert when clicking a project button
   7. Typing animation in hero
   8. Mobile hamburger navigation
   9. Active nav link highlighting
   10. Scroll reveal animations
   ============================================================ */

// ---------- 1. Welcome message ----------
window.addEventListener("load", function () {
  setTimeout(function () {
    alert("👋 Welcome to my portfolio!\n\nHello and Welcome! 🎉\nI'm Godin Dan Estella — feel free to explore and get to know me better!");
  }, 600);
});

// ---------- 2. Dark / Light mode ----------
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme (if any)
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- 3. Show / Hide "Read More" ----------
const readMoreBtn = document.getElementById("readMoreBtn");
const moreInfo = document.getElementById("moreInfo");

readMoreBtn.addEventListener("click", function () {
  moreInfo.classList.toggle("show");
  const expanded = moreInfo.classList.contains("show");
  readMoreBtn.textContent = expanded ? "Show Less ▲" : "Read More ▼";
});

// ---------- 5. Current date & time (live) ----------
const dateTimeEl = document.getElementById("dateTime");

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  dateTimeEl.textContent = now.toLocaleDateString("en-US", options);
}
updateDateTime();
setInterval(updateDateTime, 1000); // update every second

// ---------- 6. Alert when clicking a project button ----------
const projectButtons = document.querySelectorAll(".project-btn");

projectButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const projectName = btn.getAttribute("data-project");
    // Replace "" with your project link later, e.g.:
    // window.open("https://your-link-here.com", "_blank");
    alert("🔗 Opening project: " + projectName + "\n\n(Paste your project link in script.js to make this button go to your project!)");
  });
});

// ---------- 7. Typing animation ----------
const typedEl = document.getElementById("typed");
const words = ["IT Student 💻", "Web Developer 🌐", "Problem Solver 🧩", "Tech Explorer ⚡", "Lifelong Learner 📚"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = words[wordIndex];

  if (deleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let speed = deleting ? 45 : 90;

  if (!deleting && charIndex === current.length + 1) {
    speed = 1600; // pause at full word
    deleting = true;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

// ---------- 8. Mobile hamburger menu ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});


// Same-tab page switching
const portfolioPages = Array.from(document.querySelectorAll('main > section[id], body > section[id]'));
function showPortfolioPage() {
  const requested = window.location.hash.slice(1) || 'home';
  const selected = portfolioPages.some(page => page.id === requested) ? requested : 'home';
  portfolioPages.forEach(page => {
    const active = page.id === selected;
    page.hidden = !active;
    if (active) page.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    const active = link.getAttribute('href') === '#' + selected;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.removeAttribute('target');
  link.addEventListener('click', event => {
    const target = link.getAttribute('href').slice(1);
    if (!portfolioPages.some(page => page.id === target)) return;
    event.preventDefault();
    if (window.location.hash !== '#' + target) history.pushState(null, '', '#' + target);
    showPortfolioPage();
  });
});
window.addEventListener('popstate', showPortfolioPage);
window.addEventListener('hashchange', showPortfolioPage);
showPortfolioPage();
