"use strict";

// Sunny Times: reveal aligned paragraphs on column click
const sunnyPanel = document.getElementById("sunnyPanel");
const sunnyText  = document.getElementById("sunnyText");

const showSunny = () => {
  sunnyText.innerHTML = `
    <p>Here comes the sun</p>
    <p class="indent-1">Sun</p>
    <p class="indent-2">Sun</p>
    <p class="indent-3">Sun</p>
    <p>Here it comes</p>
  `;
};

sunnyPanel.addEventListener("click", () => showSunny());
sunnyPanel.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showSunny(); }
});


/* ===== Select a Color ===== */
const colorPicker = document.getElementById("colorPicker");
const colorPara   = document.getElementById("colorPara");
const colorCode   = document.getElementById("colorCode");

const applyColor = (hex) => {
  colorPara.style.color = hex;
  colorCode.textContent = hex.toLowerCase();
};

colorPicker.addEventListener("input", (e) => applyColor(e.target.value));
applyColor(colorPicker.value); // initialize on load

/* ===== Image Change (button + image click/keyboard) ===== */
const weatherImg = document.getElementById("weatherImg");
const sunBtn     = document.getElementById("sunBtn");

const becomeSunny = () => {
  const sunnySrc = weatherImg.dataset.sunny;   // reads the data-sunny attribute
  if (sunnySrc && weatherImg.getAttribute("src") !== sunnySrc) {
    weatherImg.setAttribute("src", sunnySrc);
    // Optional UX polish:
    // sunBtn.textContent = "Sunny!";
    // sunBtn.disabled = true;
  }
};

sunBtn.addEventListener("click", () => becomeSunny());
weatherImg.addEventListener("click", () => becomeSunny());
weatherImg.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); becomeSunny(); }
});
