const iconContainer = document.getElementById("bg-icons");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

const imageIcons = [
  "images/recycle.png",
  "images/bottle.png",
  "images/leaf.png",
  "images/vegetable.png"
];

function createIcon(index) {
  const icon = document.createElement("img");
  icon.className = `icon ${index % 3 === 0 ? "slow" : index % 3 === 1 ? "fast" : ""}`;
  icon.src = imageIcons[index % imageIcons.length];
  icon.alt = "";
  icon.style.left = `${Math.random() * 100}%`;
  icon.style.top = `${Math.random() * 100}%`;
  icon.style.animationDelay = `${Math.random() * 4}s`;
  return icon;
}

function populateIcons() {
  if (!iconContainer) return;
  const total = window.innerWidth < 720 ? 8 : 14;
  iconContainer.innerHTML = "";
  for (let i = 0; i < total; i += 1) {
    iconContainer.appendChild(createIcon(i));
  }
}

window.addEventListener("resize", populateIcons);
window.addEventListener("DOMContentLoaded", () => {
  populateIcons();
  document.body.classList.add("loaded");
});

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (email === "ABHII@gmail.com" && password === "123456") {
      window.location.href = "dashboard.html";
      return;
    }

    if (loginError) {
      loginError.textContent = "Invalid email or password";
    }
  });
}

