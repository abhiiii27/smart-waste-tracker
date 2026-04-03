const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".tab-section");
const toast = document.getElementById("toast");

function setActiveTab(tab) {
  sections.forEach((section) => {
    section.classList.toggle("active", section.dataset.tab === tab);
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.tab === tab;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.link) {
      window.location.href = item.dataset.link;
      return;
    }
    if (!item.dataset.tab) return;
    setActiveTab(item.dataset.tab);
  });
});

const quickCards = document.querySelectorAll(".quick-card");
quickCards.forEach((card) => {
  card.addEventListener("click", () => {
    const action = card.dataset.action;
    if (action === "scan") {
      setActiveTab("photo");
      return;
    }
    if (action === "reminder") {
      document.getElementById("reminder-panel")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (action === "guide") {
      document.getElementById("recycling-guide")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (action === "report") {
      document.getElementById("garbage-report")?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const photoInput = document.getElementById("photo-input");
const photoPreview = document.getElementById("photo-preview");
const analyzeBtn = document.getElementById("analyze-btn");
const resultText = document.getElementById("result-text");
const resultTag = document.getElementById("result-tag");
const photoAlert = document.getElementById("photo-alert");
const homeHazard = document.getElementById("hazard-alert");

let lastFileName = "";

if (photoInput && photoPreview) {
  photoInput.addEventListener("change", () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    lastFileName = file.name.toLowerCase();
    const url = URL.createObjectURL(file);
    photoPreview.innerHTML = `<img src="${url}" alt="Uploaded waste" />`;
  });
}

const hazardKeywords = ["glass", "blade", "battery", "metal", "scrap"];
const recycleKeywords = ["plastic", "paper", "bottle", "can"];
const safeKeywords = ["organic", "food", "vegetable", "leaf"];

function classifyWaste(fileName) {
  if (hazardKeywords.some((k) => fileName.includes(k))) {
    return { type: "Hazardous (Glass/Metal)", level: "danger" };
  }
  if (recycleKeywords.some((k) => fileName.includes(k))) {
    return { type: "Recyclable (Plastic/Paper)", level: "recyclable" };
  }
  if (safeKeywords.some((k) => fileName.includes(k))) {
    return { type: "Organic Waste", level: "safe" };
  }
  const random = [
    { type: "Recyclable (Plastic)", level: "recyclable" },
    { type: "Organic Waste", level: "safe" },
    { type: "Hazardous (Battery)", level: "danger" }
  ];
  return random[Math.floor(Math.random() * random.length)];
}

if (analyzeBtn) {
  analyzeBtn.addEventListener("click", () => {
    const classification = classifyWaste(lastFileName || "unknown");
    resultText.textContent = classification.type;
    resultTag.textContent = classification.level === "danger"
      ? "Dangerous Waste"
      : classification.level === "recyclable"
      ? "Recyclable Waste"
      : "Safe Waste";

    resultTag.className = `status-tag ${classification.level}`;

    const isDanger = classification.level === "danger";
    if (photoAlert) {
      photoAlert.style.display = isDanger ? "block" : "none";
    }
    if (homeHazard) {
      homeHazard.style.display = isDanger ? "block" : "none";
    }

    if (isDanger) {
      showToast("Hazardous waste detected. Handle with care.");
    }
  });
}

const reportForm = document.getElementById("urban-report");
if (reportForm) {
  reportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    reportForm.reset();
    showToast("Report submitted. Thank you for keeping the city clean.");
  });
}

const addReminderBtn = document.getElementById("add-reminder");
const reminderList = document.getElementById("reminder-list");
const reminderTime = document.getElementById("reminder-time");
const reminderText = document.getElementById("reminder-text");
const reminderKey = "smart_waste_reminders";

function loadReminders() {
  if (!reminderList) return;
  const stored = JSON.parse(localStorage.getItem(reminderKey) || "[]");
  reminderList.innerHTML = "";
  stored.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.time}</span><span>${item.text}</span>`;
    reminderList.appendChild(li);
  });
}

function saveReminder(time, text) {
  const stored = JSON.parse(localStorage.getItem(reminderKey) || "[]");
  stored.push({ time, text });
  localStorage.setItem(reminderKey, JSON.stringify(stored));
  loadReminders();
}

if (addReminderBtn) {
  addReminderBtn.addEventListener("click", () => {
    const time = reminderTime.value || "";
    const text = reminderText.value.trim();
    if (!time || !text) {
      showToast("Add a time and reminder text.");
      return;
    }
    saveReminder(time, text);
    reminderTime.value = "";
    reminderText.value = "";
  });
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((card) => {
    const stat = card.querySelector(".stat");
    if (!stat) return;
    const target = Number(stat.dataset.target || "0");
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = target >= 1000 ? current.toLocaleString() : current;
    }, 18);
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function initCharts() {
  if (typeof Chart === "undefined") return;

  const weeklyCtx = document.getElementById("weekly-chart");
  if (weeklyCtx) {
    new Chart(weeklyCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Waste Scanned",
            data: [3, 4, 5, 2, 6, 4, 5],
            borderColor: "#1f8a5f",
            backgroundColor: "rgba(31, 138, 95, 0.2)",
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  const urbanPie = document.getElementById("urban-pie");
  if (urbanPie) {
    new Chart(urbanPie, {
      type: "doughnut",
      data: {
        labels: ["Plastic", "Organic", "Other"],
        datasets: [
          {
            data: [38, 42, 20],
            backgroundColor: ["#7bcf9e", "#1f8a5f", "#dfece6"]
          }
        ]
      },
      options: { plugins: { legend: { position: "bottom" } } }
    });
  }

  const urbanBar = document.getElementById("urban-bar");
  if (urbanBar) {
    new Chart(urbanBar, {
      type: "bar",
      data: {
        labels: ["Plastic", "Organic", "Recycling"],
        datasets: [
          {
            data: [38, 42, 64],
            backgroundColor: ["#1f8a5f", "#7bcf9e", "#0e3b2f"]
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadReminders();
  animateCounters();
  initCharts();
  if (window.location.hash) {
    const tab = window.location.hash.replace("#", "");
    if (tab) {
      setActiveTab(tab);
    }
  }
});
