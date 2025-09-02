const themeBtn = document.querySelector(".theme-btn");
const body = document.body;
const indicator = document.querySelector(".indicator"); // Updated selector
const lightFillIcon = document.querySelector(".light-fill-icon");
const lightStrokeIcon = document.querySelector(".light-line-icon");
const darkFillIcon = document.querySelector(".dark-fill-icon");
const darkStrokeIcon = document.querySelector(".dark-line-icon");
const footer = document.querySelector(".footer");

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
