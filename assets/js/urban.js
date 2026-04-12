const wasteInput = document.getElementById("waste-input");
const wastePreview = document.getElementById("waste-preview");
const analyzeBtn = document.getElementById("analyze-btn");
const resultText = document.getElementById("result-text");
const resultTag = document.getElementById("result-tag");
const ideaGrid = document.getElementById("idea-grid");
const diyGrid = document.getElementById("diy-grid");
const businessGrid = document.getElementById("business-grid");
const toast = document.getElementById("toast");

let lastFileName = "";

const ideaMap = {
  "Waste Paper": [
    {
      title: "Paper Bags",
      desc: "Waste paper can be recycled into eco-friendly paper bags for stores and cafes."
    },
    {
      title: "Eco-Friendly Packaging",
      desc: "Create packaging fillers and wraps using shredded paper pulp."
    },
    {
      title: "Egg Trays / Fruit Trays",
      desc: "Mold paper pulp into trays for eggs and fresh produce."
    }
  ],
  "Plastic Bottle": [
    {
      title: "Plastic Bottle Planters",
      desc: "Cut bottles into self-watering planters for balconies."
    },
    {
      title: "Eco Bricks",
      desc: "Stuff clean plastic bottles with wrappers to make eco bricks."
    },
    {
      title: "Vertical Gardens",
      desc: "Create hanging gardens using reused bottles and rope."
    }
  ],
  "Coconut Shell": [
    {
      title: "Coconut Shell Bowls",
      desc: "Polish shells into stylish bowls and serveware."
    },
    {
      title: "Biodegradable Plant Pots",
      desc: "Blend shell fiber into compostable plant pots."
    },
    {
      title: "Fuel Briquettes",
      desc: "Convert shells into charcoal briquettes for cooking."
    }
  ],
  "Metal Scrap": [
    {
      title: "DIY Tool Racks",
      desc: "Repurpose scrap into workshop storage and racks."
    },
    {
      title: "Urban Art Installations",
      desc: "Use metal pieces for public art and sculptures."
    },
    {
      title: "Furniture Frames",
      desc: "Weld scrap into tables, stools, and shelves."
    }
  ]
};

const diyMap = {
  "Waste Paper": [
    {
      title: "Paper Bag Making Guide",
      steps: [
        "Cut paper into rectangles",
        "Fold and glue edges",
        "Attach handles and dry"
      ]
    },
    {
      title: "Recycled Greeting Cards",
      steps: [
        "Create paper pulp",
        "Press into sheets",
        "Cut, decorate, and dry"
      ]
    }
  ],
  "Plastic Bottle": [
    {
      title: "Plastic Bottle Planters",
      steps: [
        "Cut bottle sideways",
        "Add drainage holes",
        "Paint and plant"
      ]
    }
  ],
  "Coconut Shell": [
    {
      title: "Coconut Shell Bowls",
      steps: [
        "Clean shell",
        "Sand edges smooth",
        "Apply natural oil finish"
      ]
    }
  ],
  "Metal Scrap": [
    {
      title: "Metal Organizer",
      steps: [
        "Sort metal pieces",
        "Weld into frame",
        "Paint and mount"
      ]
    }
  ]
};

const businessIdeas = {
  "Waste Paper": [
    "Handmade notebooks",
    "Greeting cards",
    "Eco packaging"
  ],
  "Coconut Shell": [
    "Bowls and cups",
    "Jewelry and crafts",
    "Coconut fiber mats"
  ],
  "Plastic Bottle": [
    "Vertical gardens",
    "Eco bricks",
    "DIY lamps"
  ],
  "Metal Scrap": [
    "Decor items",
    "Furniture frames",
    "Hardware accessories"
  ]
};

const hazardKeywords = ["glass", "blade", "battery", "metal", "scrap"];
const recycleKeywords = ["plastic", "bottle", "paper", "card"];
const coconutKeywords = ["coconut", "husk", "shell"];

function classifyWaste(name) {
  if (hazardKeywords.some((k) => name.includes(k))) {
    return { type: "Metal Scrap", level: "danger" };
  }
  if (coconutKeywords.some((k) => name.includes(k))) {
    return { type: "Coconut Shell", level: "safe" };
  }
  if (recycleKeywords.some((k) => name.includes(k))) {
    return name.includes("paper") ? { type: "Waste Paper", level: "recyclable" } : { type: "Plastic Bottle", level: "recyclable" };
  }
  const options = ["Waste Paper", "Plastic Bottle", "Coconut Shell", "Metal Scrap"];
  return { type: options[Math.floor(Math.random() * options.length)], level: "recyclable" };
}

function renderIdeas(type) {
  if (!ideaGrid || !diyGrid || !businessGrid) return;

  const ideas = ideaMap[type] || [];
  const diys = diyMap[type] || [];
  const business = businessIdeas[type] || [];

  ideaGrid.innerHTML = ideas.map((idea) => `
    <article class="mini-card">
      <h4>${idea.title}</h4>
      <p>${idea.desc}</p>
    </article>
  `).join("");

  diyGrid.innerHTML = diys.map((diy) => `
    <article class="mini-card">
      <h4>${diy.title}</h4>
      <ol class="simple-list">
        ${diy.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </article>
  `).join("");

  businessGrid.innerHTML = business.map((item) => `
    <article class="mini-card">
      <h4>${item}</h4>
      <p>Sell locally or online to generate income.</p>
    </article>
  `).join("");
}

if (wasteInput && wastePreview) {
  wasteInput.addEventListener("change", () => {
    const file = wasteInput.files && wasteInput.files[0];
    if (!file) return;
    lastFileName = file.name.toLowerCase();
    const url = URL.createObjectURL(file);
    wastePreview.innerHTML = `<img src="${url}" alt="Uploaded waste" />`;
  });
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

    renderIdeas(classification.type);
    showToast("Ideas updated for " + classification.type);
  });
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((card) => {
    const stat = card.querySelector(".stat");
    if (!stat) return;
    const target = Number(stat.dataset.target || "0");
    let current = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = current;
    }, 18);
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2000);
}

window.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("ecosort_user");
  if (raw) {
    try {
      const user = JSON.parse(raw);
      const fullName = String(user.full_name || "").trim();
      const name = fullName || String(user.email || "").trim();
      if (name) {
        const shortName = name.split(" ")[0] || name;
        document.querySelectorAll(".profile-chip").forEach((chip) => {
          chip.textContent = shortName;
        });
      }
    } catch (_) {
      // Ignore malformed stored user.
    }
  }
  renderIdeas("Waste Paper");
  animateCounters();
});
