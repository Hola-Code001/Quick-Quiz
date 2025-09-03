const themeBtn = document.querySelector(".theme-btn");
const body = document.body;
const indicator = document.querySelector(".indicator"); // Updated selector
const lightFillIcon = document.querySelector(".light-fill-icon");
const lightStrokeIcon = document.querySelector(".light-line-icon");
const darkFillIcon = document.querySelector(".dark-fill-icon");
const darkStrokeIcon = document.querySelector(".dark-line-icon");
const footer = document.querySelector(".footer");
const startContainer = document.querySelector("#start-container");
const questionContainer = document.querySelector("#question-container");
const resultContainer = document.querySelector("#result-container");
const startQuizButton = document.querySelector(".start-quiz-btn");
const quitQuizButton = document.querySelector(".quit-quiz-btn");
const quitModal = document.querySelector(".quit-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmQuitBtn = document.querySelector(".confirm-quit-btn");
const nextQuizBtn = document.querySelector(".next-quiz");

themeBtn.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    indicator.classList.add("indicator-dark");
    lightStrokeIcon.classList.remove("hidden");
    darkFillIcon.classList.remove("hidden");
    lightFillIcon.classList.add("hidden");
    darkStrokeIcon.classList.add("hidden");
    footer.textContent = "Lights out, game on.";
  } else {
    body.setAttribute("data-theme", "light");
    indicator.classList.remove("indicator-dark");
    lightStrokeIcon.classList.add("hidden");
    darkFillIcon.classList.add("hidden");
    lightFillIcon.classList.remove("hidden");
    darkStrokeIcon.classList.remove("hidden");
    footer.textContent = "Switch to dark mode — your eyes will thank you.";
  }
});

startQuizButton.addEventListener("click", () => {
  startContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
});

quitQuizButton.addEventListener("click", () => {
  quitModal.showModal();
});

cancelBtn.addEventListener("click", () => {
  quitModal.close();
});

confirmQuitBtn.addEventListener("click", () => {
  startContainer.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  quitModal.close();
});

nextQuizBtn.addEventListener("click", () => {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  celebration();
  // launchConfetti();
});

const canvas = document.querySelector(".confetti-canvas");
const confetti = window.confetti.create(canvas, { resize: true });

// Launch confetti when result screen loads

function launchConfetti() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
  });
}

function celebration() {
  let duration = 4 * 1000; // 4 seconds
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
