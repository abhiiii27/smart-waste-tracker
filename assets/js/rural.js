const wasteInput = document.getElementById("waste-input");
const wastePreview = document.getElementById("waste-preview");
const scanBtn = document.getElementById("scan-btn");
const chooseBtn = document.getElementById("choose-btn");

const resultName = document.getElementById("result-name");
const resultType = document.getElementById("result-type");
const resultUse = document.getElementById("result-use");
const resultSteps = document.getElementById("result-steps");
const resultMarket = document.getElementById("result-market");

let lastFileName = "";

const outputs = {
  "Cotton Stalk": {
    type: "Agricultural Waste",
    use: "Biomass Fuel",
    steps: ["Dry cotton stalks", "Chop into pieces", "Compress into briquettes", "Store in dry area"],
    market: ["Factories", "Organic farms"]
  },
  "Cow Dung": {
    type: "Organic Waste",
    use: "Biogas Production",
    steps: ["Mix dung with water", "Fill biogas tank", "Wait 20-30 days", "Collect methane gas"],
    market: ["Local farmers", "Temples", "Organic fertilizer shops"]
  },
  "Rice Husk": {
    type: "Agricultural Waste",
    use: "Mushroom Farming",
    steps: ["Sterilize rice husk", "Add mushroom spawn", "Maintain humidity", "Harvest after 20 days"],
    market: ["Local vegetable market", "Hotels", "Biomass industries"]
  },
  "Banana Stem": {
    type: "Agricultural Waste",
    use: "Banana Fiber",
    steps: ["Cut stem into strips", "Extract fibers", "Wash and dry", "Spin into rope"],
    market: ["Textile industry", "Handicraft market"]
  }
};

function renderOutput(name) {
  const data = outputs[name];
  if (!data) return;
  resultName.textContent = name;
  resultType.textContent = data.type;
  resultUse.textContent = data.use;
  resultSteps.innerHTML = `<h4>Steps</h4><ol>${data.steps.map((s) => `<li>${s}</li>`).join("")}</ol>`;
  resultMarket.innerHTML = `<h4>Market</h4><ul>${data.market.map((m) => `<li>${m}</li>`).join("")}</ul>`;
}

function classifyWaste(name) {
  const lower = name.toLowerCase();
  if (lower.includes("cotton")) return "Cotton Stalk";
  if (lower.includes("dung") || lower.includes("cow")) return "Cow Dung";
  if (lower.includes("rice") || lower.includes("husk")) return "Rice Husk";
  if (lower.includes("banana") || lower.includes("stem")) return "Banana Stem";
  const options = Object.keys(outputs);
  return options[Math.floor(Math.random() * options.length)];
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

if (chooseBtn && wasteInput) {
  chooseBtn.addEventListener("click", () => {
    wasteInput.click();
  });
}

if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    const wasteName = classifyWaste(lastFileName || "unknown");
    renderOutput(wasteName);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderOutput("Rice Husk");
});
