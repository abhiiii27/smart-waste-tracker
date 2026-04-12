const progressBlock = document.querySelector("[data-progress]");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const progressMessage = document.getElementById("progress-message");
const streakCard = document.querySelector("[data-streak]");
const streakMessage = document.getElementById("streak-message");

function initProgress() {
  if (!progressBlock || !progressFill || !progressText) return;
  const value = Number(progressBlock.dataset.progress || "0");
  const clamped = Math.max(0, Math.min(100, value));
  progressFill.style.width = `${clamped}%`;
  progressText.textContent = `${clamped}% Completed`;
  if (progressMessage) {
    progressMessage.textContent = clamped >= 100
      ? "Congratulations! You unlocked the Eco Hero Badge."
      : "Keep going to reach your monthly goal.";
  }
}

function initStreak() {
  if (!streakCard || !streakMessage) return;
  const days = Number(streakCard.dataset.streak || "0");
  streakMessage.textContent = days >= 30
    ? "Green Champion Streak Achieved!"
    : "Stay consistent to unlock streak rewards.";
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
  initProgress();
  initStreak();
});
