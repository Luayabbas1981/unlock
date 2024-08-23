// Game elements
const hintCons = document.querySelectorAll(".hint");
const draft = document.querySelector(".draft");
const entrance = document.querySelector(".entrance");
const display = document.querySelector(".display");
const modalCon = document.querySelector(".modal-con");
const introduction = document.querySelector(".introduction");
// Game sounds
const pressBtn = document.querySelector(".btn-press");
const deleteBtn = document.querySelector(".delete-press");
// Game controls
const startBtn = document.querySelector(".start-btn");
// Game values
let numberLength = 3;
let rightNumberArray = [];
let rightNumber = null;
let hints = [];

startBtn.onclick = () => {
  const startBtnLetters = document.querySelectorAll(".start-btn div");
  startBtnLetters.forEach((letter) => {
    letter.style.animation = "none";
    setTimeout(() => {
      letter.style.animation = "show-letters 0.5s ease-in-out reverse forwards";
      setTimeout(() => {
        introduction.classList.add("d-none");
      }, 1000);
    }, 5);
  });
};

(function () {
  // Draft
  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.classList.add(
      "col-4",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "position-relative"
    );
    div.textContent = i;
    draft.appendChild(div);
  }
  // entrance
  for (let i = 1; i < 13; i++) {
    const div = document.createElement("div");
    const btn = document.createElement("div");
    btn.classList.add("entrance-btn");
    div.appendChild(btn);
    div.classList.add("col-4", "position-relative");

    if (i === 10) {
      btn.style.cssText = `background-color:#ffc903`;
      btn.classList.add("enter");
      btn.style.setProperty("--color", "#494848");
    } else if (i === 11) {
      btn.textContent = 0;
      btn.classList.add("entrance-num");
    } else if (i === 12) {
      btn.classList.add("delete");
      btn.style.setProperty("--color", "#494848");
    } else {
      btn.textContent = i;
      btn.classList.add("entrance-num");
    }
    entrance.appendChild(div);
  }
  hintCons.forEach((hint) => {
    for (let i = 0; i < numberLength; i++) {
      const div = document.createElement("div");
      div.classList.add("col-4", "d-flex", "justify-content-center", "h-100");
      hint.appendChild(div);
      hints.push(div);
    }
  });
  genUniqueNumbers(numberLength);
})();

// Create right number
function genUniqueNumbers(length) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    uniqueNumbers.add(randomNumber);
  }

  rightNumberArray = Array.from(uniqueNumbers);
  rightNumber = rightNumberArray.join("");
}

// create fault numbers
function genFaultNumbers(length) {}

// Events
entrance.addEventListener("click", (e) => {
  let currentDisplayNumbers = display.textContent;

  if (
    e.target.classList.contains("entrance-num") &&
    display.textContent.length < numberLength
  ) {
    display.textContent = currentDisplayNumbers + e.target.textContent;
    currentDisplayNumbers = display.textContent;
    e.target.style.color = "#89ff00";
    setTimeout(() => {
      e.target.style.color = "#2a80aa";
    }, 200);
    soundController(pressBtn);
  }
  if (e.target.classList.contains("delete") && display.textContent) {
    let displayArr = currentDisplayNumbers.split("");
    displayArr.pop();
    currentDisplayNumbers = displayArr.join("");
    display.textContent = currentDisplayNumbers;
    e.target.style.setProperty("--color", "#ff5722");
    setTimeout(() => {
      e.target.style.setProperty("--color", "#494848");
    }, 200);
    soundController(deleteBtn);
  }
});

draft.addEventListener("click", (e) => {
  if (e.target.closest(".draft>div")) {
    e.target.classList.toggle("x-mark");
    soundController(deleteBtn);
  }
});

function soundController(sound) {
  sound.volume = 0.5;
  sound.currentTime = 0;
  sound.play();
}
