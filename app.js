import { questionsData, leaderboardTag } from "./data.js";

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
const howToPlayModal = document.querySelector(".how-to-play-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmQuitBtn = document.querySelector(".confirm-quit-btn");
const nextQuizBtn = document.querySelector(".next-quiz");
const question = document.querySelector(".question");
const answerBtn = document.querySelectorAll(".answer-btn");
const currentQuestionDisplay = document.querySelector(".current-question");
const scoreDisplay = document.querySelector(".current-score");
const totalScoreDisplay = document.querySelector(".total-score");
const timeLeftDisplay = document.querySelector(".time-left");
const progressContainer = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress-fill");

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

const leaderboard = JSON.parse(localStorage.getItem("userScore")) || [];

let randomQuestion;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemain = 15;

function loadLeaderBoard() {
  const scoreListContainer = document.querySelector(".score-list");
  scoreListContainer.innerHTML = "";
  if (leaderboard.length !== 0) {
    document.querySelector(".empty-board").classList.add("hidden");
    leaderboard.map((item, index) => {
      const scoreListItem = document.createElement("li");
      const positionElemnet = document.createElement("p");
      const scoreElement = document.createElement("p");
      const { tag, position } = leaderboardTag[index];

      positionElemnet.innerHTML = `<i class="fa-solid fa-medal"></i>${position}<span>${tag}</span> `;
      scoreElement.innerHTML = `<span>${item}</span> / 10`;

      scoreListContainer.appendChild(scoreListItem);

      scoreListItem.appendChild(positionElemnet);
      scoreListItem.appendChild(scoreElement);
    });
  } else {
    document.querySelector(".empty-board").classList.remove("hidden");
  }
}

loadLeaderBoard();

function startGame() {
  startContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  const randomNumber = Math.floor(Math.random() * 3);
  randomQuestion = questionsData[randomNumber];
  score = 0;
  scoreDisplay.textContent = score;
}

document.querySelector(".play-again-btn").addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  startGame();
  loadQuestion();
});

startQuizButton.addEventListener("click", () => {
  startGame();
  loadQuestion();
});

function progressCalculation(count, runs) {
  const newWidth = ((runs - count) / runs) * 100;

  progress.style.width = `${newWidth}%`;

  if (count > 5) {
    progressContainer.classList.add("medium");
  }

  if (count > 10) {
    progressContainer.classList.add("low");
  }
}

// apply shake effect to answers buttons

function shake(correctAnswer) {
  answerBtn.forEach((btn, index) => {
    btn.disabled = true;
    btn.classList.add("shake");
    setTimeout(() => {
      btn.classList.remove("shake");
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    }, 500);
  });
}

// countdown function

function startTimer() {
  const q = randomQuestion[currentQuestionIndex];

  let count = 1;
  timeLeftDisplay.textContent = `${timeRemain}s`;
  timer = setInterval(() => {
    if (timeRemain <= 1) {
      clearInterval(timer);
      shake(q.correctAnswer);
      nextQuizBtn.disabled = false;
    }

    timeRemain--;
    count++;
    timeLeftDisplay.textContent = `${timeRemain}s`;
    progressCalculation(count, 15);
  }, 1000);
}

// load or next question

function loadQuestion() {
  resetQuestion();
  startTimer();
  currentQuestionDisplay.textContent = currentQuestionIndex + 1;
  const q = randomQuestion[currentQuestionIndex];
  question.textContent = q.question;

  answerBtn.forEach((btn, index) => {
    btn.textContent = q.answers[index];
    btn.onclick = () => {
      checkAnswer(btn, q.answers[index], q.correctAnswer);
    };
  });
}

function checkAnswer(btn, selected, correctAnswer) {
  clearInterval(timer);
  if (selected === correctAnswer) {
    btn.classList.add("correct");
    score++;
    scoreDisplay.textContent = score;
  } else {
    btn.classList.add("wrong");
    shake(correctAnswer);
  }

  nextQuizBtn.disabled = false;
}

function resetQuestion() {
  progressContainer.classList.remove("low", "medium");
  progress.style.width = "100%";
  clearInterval(timer);
  timeRemain = 15;
  answerBtn.forEach((btn) => {
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });
  nextQuizBtn.disabled = true;
}

quitQuizButton.addEventListener("click", () => {
  quitModal.showModal();
  quitModal.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
  quitModal.classList.remove("show");

  setTimeout(() => {
    quitModal.close();
  }, 300);
});

confirmQuitBtn.addEventListener("click", () => {
  startContainer.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  quitModal.close();
});

document.querySelector(".how-to-btn").addEventListener("click", () => {
  howToPlayModal.showModal();
  howToPlayModal.classList.add("show");
});

document
  .querySelector(".how-to-play-close-btn")
  .addEventListener("click", () => {
    setTimeout(() => {
      howToPlayModal.close();
    }, 300);
    howToPlayModal.classList.remove("show");
  });

let relaunchConfetti;

nextQuizBtn.addEventListener("click", () => {
  // launchConfetti();
  // relaunchConfetti = setInterval(() => {
  //   launchConfetti();
  // }, 5000);

  currentQuestionIndex++;
  if (currentQuestionIndex < randomQuestion.length) {
    loadQuestion();
  } else {
    currentQuestionIndex = 0;
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    if (leaderboard.length > 3) {
      leaderboard.pop();
    }

    localStorage.setItem("userScore", JSON.stringify(leaderboard));
    totalScoreDisplay.textContent = score;
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    celebration();
  }
});

const canvas = document.querySelector(".confetti-canvas");
const confetti = window.confetti.create(canvas, { resize: true });

// Launch confetti when result screen loads

function launchConfetti() {
  confetti({
    particleCount: 300,
    spread: 150,
    origin: { y: 0.6 },
  });
}

function celebration() {
  let duration = 3 * 1000; // 3 seconds
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

document.querySelector(".back-to-start-btn").addEventListener("click", () => {
  startContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  loadLeaderBoard();
});
