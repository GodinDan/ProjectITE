
// ---------- 1. Custom welcome popup ----------
window.addEventListener('load', function () {
  const welcomeSessionKey = 'gdePortfolioWelcomeShown';
  try {
    if (sessionStorage.getItem(welcomeSessionKey) === 'yes') return;
  } catch (error) { /* Still allow the popup if browser storage is unavailable. */ }
  setTimeout(function () {
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
      .welcome-dialog { box-sizing: border-box; width: min(460px, calc(100% - 32px)); max-height: calc(100dvh - 32px); overflow-y: auto; margin: auto; padding: 30px; border: 1px solid var(--border, #ddd); border-radius: 20px; background: var(--card, #fff); color: var(--text, #1e293b); box-shadow: 0 24px 80px rgba(0,0,0,.25); font-family: Poppins, sans-serif; }
      .welcome-dialog::backdrop { background: rgba(11,17,32,.55); backdrop-filter: blur(5px); }
      .welcome-dialog h2 { margin: 0 0 14px; font-size: 24px; line-height: 1.35; }
      .welcome-dialog p { margin: 0 0 24px; color: var(--text-muted, #64748b); line-height: 1.7; }
      .welcome-dialog button { font: inherit; }
    `;
    document.head.appendChild(popupStyle);
    const dialog = document.createElement('dialog');
    dialog.className = 'welcome-dialog';
    dialog.setAttribute('aria-labelledby', 'welcome-title');
    dialog.setAttribute('aria-describedby', 'welcome-message');
    dialog.innerHTML = '<h2 id="welcome-title">Welcome to my portfolio!</h2><p id="welcome-message">Hello and welcome! I’m Godin Dan Estella — feel free to explore and get to know me better!</p><button type="button" class="btn btn-primary" autofocus>Let’s explore</button>';
    document.body.appendChild(dialog);
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', function () {
      document.body.style.overflow = previousOverflow;
      dialog.remove();
      popupStyle.remove();
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }, { once: true });
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    try {
      sessionStorage.setItem(welcomeSessionKey, 'yes');
    } catch (error) { /* Storage may be disabled by browser privacy settings. */ }
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
