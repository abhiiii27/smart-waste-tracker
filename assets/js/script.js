const iconContainer = document.getElementById("bg-icons");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const registerForm = document.getElementById("register-form");
const registerError = document.getElementById("register-error");

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

async function postJson(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data && data.error ? String(data.error) : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (loginError) {
      loginError.textContent = "";
    }

    try {
      const result = await postJson("/api/login", { email, password });
      localStorage.setItem("ecosort_user", JSON.stringify(result.user || {}));
      window.location.href = "dashboard.html";
    } catch (error) {
      if (loginError) {
        loginError.textContent = error && error.message ? error.message : "Invalid email or password";
      }
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const fullName = String(formData.get("full_name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (!registerError) return;

    registerError.classList.remove("success-message");

    if (!fullName || !email || !phone) {
      registerError.textContent = "Please fill all required fields";
      return;
    }

    if (password.length < 6) {
      registerError.textContent = "Password must be at least 6 characters";
      return;
    }

    if (password !== confirmPassword) {
      registerError.textContent = "Passwords do not match";
      return;
    }

    try {
      await postJson("/api/register", {
        full_name: fullName,
        email,
        phone,
        password,
        confirm_password: confirmPassword
      });

      registerError.classList.add("success-message");
      registerError.textContent = "Registration successful. Please login.";
      registerForm.reset();
      window.setTimeout(() => {
        window.location.href = "/index.html";
      }, 800);
    } catch (error) {
      registerError.textContent = error && error.message ? error.message : "Registration failed";
    }
  });
}

