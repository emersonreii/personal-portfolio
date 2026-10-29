const CONFIG = {
  email: "rimnacerddine078@gmail.com",
  github: "https://github.com/emersonreii"
};

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const $ = (id) => document.getElementById(id);

const stage = $("stage");
const wrap = $("wrap");

const KEYS = [
  ["P", "PROJECTS", "#f5b3a0", "#c9553a", "Selected Projects", 73, 0, "work"],
  ["O", "ABOUT RIM", "#d3b8f0", "#6a3fa0", "About Rim", 219, 0, "about"],
  ["R", "THE METHOD", "#b5dcae", "#4a8a42", "How I Work", 365, 0, "process"],
  ["T", "TOOLKIT", "#f7d68a", "#c08a1e", "Technical Toolkit", 511, 0, "approach"],
  ["F", "FIND ME", "#a9c8f0", "#3a6fb5", "Open GitHub", 0, 139, "github"],
  ["O", "ABOUT ME", "#e8b3e8", "#9a3fa0", "About Me", 146, 139, "about"],
  ["L", "THE PROCESS", "#ffbf8f", "#d9611a", "The Process", 292, 139, "process"],
  ["I", "MY APPROACH", "#c9c3f5", "#5a52b5", "My Approach", 438, 139, "approach"],
  ["O", "CONTACT", "#d4e68a", "#7a9a2d", "Contact Rim", 584, 139, "mail"]
];

function createKey(keyData) {
  const [letter, label, faceColor, baseColor, ariaLabel, x, y, action] = keyData;
  const top = y + 80;

  const attributes = `
    class="key"
    style="
      left:${x}px;
      top:${top}px;
      --face:color-mix(in srgb,${faceColor} 45%,#0b0712);
      --base:color-mix(in srgb,${baseColor} 45%,#0b0712)
    "
    aria-label="${ariaLabel}"
    data-letter="${letter}"
  `;

  const content = `
    <i class="face">
      <b>${letter}</b>
      <small>${label}</small>
    </i>
  `;

  if (action === "mail") {
    return `<a ${attributes} data-mail href="#contact">${content}</a>`;
  }

  if (action === "github") {
    return `<a ${attributes} href="${CONFIG.github}" target="_blank" rel="noreferrer">${content}</a>`;
  }

  return `<button ${attributes} type="button" data-dialog="${action}">${content}</button>`;
}

stage.innerHTML = `
  <div class="machine">
    <span class="rv" style="left:16px;top:16px"></span>
    <span class="rv" style="right:16px;top:16px"></span>
    <span class="rv" style="left:16px;bottom:22px"></span>
  </div>

  <div class="tape" id="tape" aria-hidden="true"></div>

  <div class="slot" aria-hidden="true">
    DATA / ANALYTICS
  </div>

  <a
    class="key enter"
    data-mail
    href="#contact"
    aria-label="Start a conversation"
    data-letter="↵"
    style="
      --face:color-mix(in srgb,#ffd85e 45%,#0b0712);
      --base:color-mix(in srgb,#d9a000 45%,#0b0712)
    "
  >
    <i class="face">
      <em>✉</em>
      <b>↵</b>
      <small>START A CONVERSATION</small>
    </i>
  </a>

  ${KEYS.map(createKey).join("")}
`;



const projects = [
  {
    title: "Owens Job Grimoire",
    meta: "Python · Automation · Data collection",
    description: "A job-board monitor for junior Data Analyst, BI, and Data Engineer roles. It scores listings, extracts salary and contact details, sends phone notifications through ntfy, and maintains a browsable HTML summary.",
    url: "https://github.com/emersonreii/owens-grimoire"
  },
  {
    title: "Sound Clustering Mood Playlists",
    meta: "GitHub project · Exploratory analytics",
    description: "An exploration of sound clustering and mood-based playlist organization. Visit the repository to inspect the implementation and latest work.",
    url: "https://github.com/emersonreii/sound-clustering-mood-playlists"
  },
  {
    title: "Celestial Oracle Analytics",
    meta: "Data and modeling workspace",
    description: "A developing analytics project organized around data, models, images, and scripts. Visit the repository for the latest implementation.",
    url: "https://github.com/emersonreii/celestial-oracle-analytics"
  }
];

const projectMarkup = projects.map((project) => `
  <article class="project">
    <h3>${project.title}</h3>
    <small>${project.meta}</small>
    <p>${project.description}</p>
    <a href="${project.url}" target="_blank" rel="noreferrer">View on GitHub ↗</a>
  </article>
`).join("");

const DIALOGS = {
  work: {
    title: "Selected Projects",
    content: `<div class="projects">${projectMarkup}</div>`
  },
  about: {
    title: "About Rim",
    content: `
      <p>I’m Nacerddine Rim, a MIAGE-trained computer engineer based in Rabat, Morocco. I work at the intersection of data engineering, analytics, and practical AI.</p>
      <p>My recent experience includes a Data Trust Agent at Delomid, with work across Airflow, Spark, dbt, anomaly detection, and data catalog enrichment.</p>
    `
  },
  process: {
    title: "How I Work",
    content: `
      <p>I start with the question behind the data, make the workflow understandable, then build the smallest reliable system that can answer it.</p>
      <p>My process combines analysis, modeling, automation, and clear communication.</p>
    `
  },
  approach: {
    title: "Technical Toolkit",
    content: `<p>Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Airflow, Spark, dbt, data warehousing, OLAP, machine learning, LLM agents, MySQL, SQLite, SQL Server, Django, Git, and GitHub.</p>`
  }
};

function renderDialogs() {
  const container = $("dialogs");
  if (!container) return;

  container.innerHTML = Object.entries(DIALOGS).map(([id, dialog]) => `
    <dialog id="dialog-${id}" aria-labelledby="dialog-title-${id}">
      <form method="dialog">
        <button class="seal-btn" type="submit" aria-label="Close dialog">Close</button>
      </form>
      <h2 id="dialog-title-${id}">${dialog.title}</h2>
      <div class="dialog-body">
        ${dialog.content}
        <a data-mail href="#contact">Email Rim ↗</a>
      </div>
    </dialog>
  `).join("");
}

renderDialogs();

document.querySelectorAll("[data-mail]").forEach((link) => {
  link.href = `mailto:${CONFIG.email}`;
  if (link.hasAttribute("data-show")) link.textContent = CONFIG.email;
});



let activeOpener = null;

document.addEventListener("click", (event) => {
  const dialogButton = event.target.closest("[data-dialog], [data-dlg]");

  if (dialogButton) {
    const dialogName = dialogButton.dataset.dialog || dialogButton.dataset.dlg;
    const dialog = document.getElementById(`dialog-${dialogName}`);

    if (dialog && !dialog.open) {
      activeOpener = dialogButton;
      dialog.showModal();
    }
  }

  const key = event.target.closest(".key");
  
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => {
    if (activeOpener) activeOpener.focus();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const keys = [...stage.querySelectorAll(".key")];
const animationOrder = [
  ...keys.filter((key) => !key.classList.contains("enter")),
  keys.find((key) => key.classList.contains("enter"))
].filter(Boolean);

let animationIndex = 0;
let animationTimer = null;
const animationHolds = new Set();

function releaseKeys() {
  keys.forEach((key) => key.classList.remove("auto"));
}

function isPaused() {
  const dialogOpen = [...document.querySelectorAll("dialog")].some((dialog) => dialog.open);
  return animationHolds.size > 0 || document.hidden || dialogOpen;
}

function animateKeys() {
  let delay = 340;

  if (!isPaused()) {
    releaseKeys();
    const currentKey = animationOrder[animationIndex];

    if (currentKey) {
      currentKey.classList.add("auto");
      window.setTimeout(() => currentKey.classList.remove("auto"), 220);
    }

    animationIndex = (animationIndex + 1) % animationOrder.length;
    if (animationIndex === 0) delay = 1600;
  } else {
    releaseKeys();
  }

  animationTimer = window.setTimeout(animateKeys, delay);
}

function fitStenotype() {
  if (!wrap || !stage) return;

  const scale = Math.min(1, wrap.clientWidth / 900);
  stage.style.setProperty("--s", scale);
  wrap.style.height = `${392 * scale + 18}px`;
}

window.addEventListener("resize", fitStenotype);
fitStenotype();

stage.addEventListener("mouseenter", () => {
  animationHolds.add("pointer");
  releaseKeys();
});

stage.addEventListener("mouseleave", () => animationHolds.delete("pointer"));

stage.addEventListener("focusin", () => {
  animationHolds.add("focus");
  releaseKeys();
});

stage.addEventListener("focusout", () => animationHolds.delete("focus"));

window.addEventListener("pagehide", () => {
  window.clearTimeout(animationTimer);
  
});

const track = $("track");

function setMarqueeDuration() {
  if (!track || !track.firstElementChild) return;
  const duration = track.firstElementChild.offsetWidth / 50;
  track.style.setProperty("--dur", `${duration}s`);
}

if (track && track.firstElementChild) {
  const resizeObserver = new ResizeObserver(setMarqueeDuration);
  resizeObserver.observe(track.firstElementChild);
}

setMarqueeDuration();


if (!reduceMotion) animateKeys();