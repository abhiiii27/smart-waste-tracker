const wasteInput = document.getElementById("waste-input");
const wastePreview = document.getElementById("waste-preview");
const scanBtn = document.getElementById("scan-btn");

const resultType = document.getElementById("result-type");
const resultTag = document.getElementById("result-tag");
const resultReco = document.getElementById("result-reco");
const resultAction = document.getElementById("result-action");
const guideTitle = document.getElementById("guide-title");
const guideSteps = document.getElementById("guide-steps");
const reuseGrid = document.getElementById("reuse-grid");

let lastFileName = "";

const wasteGuides = {
  recyclable: {
    label: "Recyclable (Plastic / Paper)",
    tag: "Recyclable",
    className: "recyclable",
    recommendation: "Do not throw it in mixed garbage.",
    action: "Place this item in the Dry Waste / Recycling Bin.",
    title: "Good News! This waste can be recycled.",
    steps: [
      "Put it in the recycling bin",
      "Give it to a scrap collector",
      "Reuse it for DIY crafts"
    ],
    reuse: [
      "Plastic Bottle → Plant Pot",
      "Paper Waste → DIY Paper Bags",
      "Cardboard → Storage Organizer"
    ]
  },
  organic: {
    label: "Organic Waste (Food / Vegetable)",
    tag: "Safe",
    className: "safe",
    recommendation: "Use this waste for composting.",
    action: "Collect organic waste separately and turn it into fertilizer.",
    title: "Detected Waste Type: Organic Waste",
    steps: [
      "Collect organic waste separately",
      "Add it to a compost bin",
      "Turn it into organic fertilizer"
    ],
    reuse: [
      "Vegetable Waste → Compost",
      "Fruit Peels → Natural Fertilizer",
      "Leaves → Mulch"
    ]
  },
  hazardous: {
    label: "Hazardous Waste (Glass / Battery / Metal)",
    tag: "Danger",
    className: "danger",
    recommendation: "Do not mix with regular waste.",
    action: "Dispose in a hazardous waste container or special recycling center.",
    title: "Warning! Hazardous Waste Detected.",
    steps: [
      "Wear gloves or handle carefully",
      "Keep in a separate container",
      "Drop at a hazardous waste collection point"
    ],
    reuse: [
      "Glass Bottle → Decorative Lamp",
      "Metal Can → Tool Holder",
      "Battery → E-waste drop-off"
    ]
  },
  nonrecyclable: {
    label: "Non-Recyclable Waste",
    tag: "General",
    className: "danger",
    recommendation: "Dispose in the general waste bin.",
    action: "Avoid mixing with recyclables for better sorting.",
    title: "Detected Waste Type: Non-Recyclable Waste",
    steps: [
      "Place in general waste bin",
      "Reduce the use of such materials",
      "Look for reusable alternatives"
    ],
    reuse: [
      "Switch to reusable containers",
      "Avoid single-use items",
      "Choose recyclable packaging"
    ]
  }
};

function classifyWaste(name) {
  const lower = name.toLowerCase();
  if (lower.includes("glass") || lower.includes("battery") || lower.includes("metal") || lower.includes("blade")) {
    return "hazardous";
  }
  if (lower.includes("food") || lower.includes("vegetable") || lower.includes("organic")) {
    return "organic";
  }
  if (lower.includes("plastic") || lower.includes("paper") || lower.includes("bottle") || lower.includes("cardboard")) {
    return "recyclable";
  }
  return "nonrecyclable";
}

function updateUI(typeKey) {
  const data = wasteGuides[typeKey];
  if (!data) return;

  resultType.textContent = data.label;
  resultTag.textContent = data.tag;
  resultTag.className = `status-tag ${data.className}`;
  resultReco.textContent = data.recommendation;
  resultAction.textContent = data.action;
  guideTitle.textContent = data.title;
  guideSteps.innerHTML = data.steps.map((step) => `<li>${step}</li>`).join("");
  reuseGrid.innerHTML = data.reuse.map((idea) => `<article class="mini-card">${idea}</article>`).join("");
}

async function saveScan(typeKey) {
  const data = wasteGuides[typeKey];
  if (!data) return;

  const payload = {
    item: lastFileName || data.label,
    waste_type: data.tag,
    recommendation: data.recommendation,
    action: data.action
  };

  try {
    await fetch("/api/scans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (_) {
    // Ignore errors (demo-friendly). The UI still works without DB connectivity.
  }
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

if (scanBtn) {
  scanBtn.addEventListener("click", async () => {
    const typeKey = classifyWaste(lastFileName || "unknown");
    updateUI(typeKey);
    await saveScan(typeKey);
  });
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
  updateUI("recyclable");
});
