// Game elements
const hintCons = document.querySelectorAll(".hint");
const draft = document.querySelector(".draft");
const entrance = document.querySelector(".entrance");
const display = document.querySelector(".display");
const modalCon = document.querySelector(".modal-con");
const introduction = document.querySelector(".introduction");
const instructions = document.querySelector(".instructions-con");
const endGame = document.querySelector(".end-game");
const wonModal = document.querySelector(".won");
const loseModal = document.querySelector(".lose");
const numbersMapArr = [4, 3, 2, 4, 5, 9, 0, 3, 1, 2, 1, 4, 0, 7, 3];
let numbersUsedArr = [];
let hintNum = [];

// Game sounds
const pressSound = document.querySelector(".btn-press-sound");
const deleteSound = document.querySelector(".delete-press-sound");
const introSound = document.querySelector(".open-safe");
// Game controls
const startBtn = document.querySelector(".start-btn");
const gotItBtn = document.querySelector(".got-it-btn");
const replay = document.querySelector(".replay");
const timer = document.querySelector(".timer span");
const userTime = document.querySelector(".user-time");
let timerInterval = null;
const time = 241;
let remainTime = time;
// Game values
let draftNum = null;
let numberLength = 3;
let rightNumberArray = [];
let rightNumber = null;
let hints = [];
let newNumbersArray = [];
let uniqueArr;
introSound.volume = 0.5;
pressSound.volume = 0.5;
deleteSound.volume = 1;

(function () {
  // Hunts
  hintCons.forEach((hint) => {
    for (let i = 0; i < numberLength; i++) {
      const div = document.createElement("div");
      div.classList.add(
        "col-4",
        "d-flex",
        "justify-content-center",
        "h-100",
        "position-relative"
      );
      hint.appendChild(div);
      hints.push(div);
    }
  });
  hintNum = document.querySelectorAll(".hint div");
  getRandomizedNumbersArray(numbersMapArr);

  // Draft
  // Sorting numerically (if text content are numbers)
  draftNum = [...new Set([...hintNum].map((hint) => hint.textContent))].sort(
    (a, b) => a - b
  );
  for (let i = 0; i < uniqueArr.length; i++) {
    const div = document.createElement("div");
    div.classList.add(
      "col-6",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "position-relative"
    );
    div.textContent = draftNum[i];
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
  genUniqueNumbers(numberLength);
})();

startBtn.onclick = () => {
  introSound.play();
  const startBtnLetters = document.querySelectorAll(".start-btn div");
  startBtnLetters.forEach((letter) => {
    letter.style.animation = "none";
    setTimeout(() => {
      letter.style.animation = "show-letters 1s ease-in-out reverse forwards";
      setTimeout(() => {
        introduction.classList.add("d-none");
        instructions.classList.remove("d-none");
      }, 1000);
    }, 5);
  });
};

gotItBtn.onclick = () => {
  instructions.classList.add("d-none");
  gotItBtn.classList.add("d-none");
  modalCon.classList.add("d-none");
  introSound.muted = true;
  timerInterval = setInterval(() => {
    if (remainTime <= 30) {
      timer.style.color = "red";
    }
    if (remainTime === 0) {
      clearInterval(timerInterval);
      modalCon.classList.remove("d-none");
      endGame.classList.remove("d-none");
      loseModal.classList.remove("d-none");
      replay.textContent = "TRY AGAIN";
    }
    remainTime--;
    timer.textContent = remainTime;
  }, 1000);
};
// Create array of different numbers
function genUniqueNumbers(length) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    uniqueNumbers.add(randomNumber);
  }

  rightNumberArray = Array.from(uniqueNumbers);
  rightNumber = rightNumberArray.join("");
}

// Events
entrance.addEventListener("click", (e) => {
  let currentDisplayNumbers = display.textContent;

  if (
    e.target.classList.contains("entrance-num") &&
    display.textContent.length < numberLength
  ) {
    display.textContent = currentDisplayNumbers + e.target.textContent;
    currentDisplayNumbers = display.textContent;
    e.target.style.cssText = `color:#ff8000; scale:0.85;box-shadow: 2px 2px 8px 0px black`;
    setTimeout(() => {
      e.target.style.cssText = `color: #0b4b6a; scale:1;box-shadow: 4px 6px 12px 0px black;`;
    }, 200);
    pressSound.currentTime = 0;
    pressSound.play();
  }
  if (e.target.classList.contains("delete") && display.textContent) {
    let displayArr = currentDisplayNumbers.split("");
    displayArr.pop();
    currentDisplayNumbers = displayArr.join("");
    display.textContent = currentDisplayNumbers;
    e.target.style.setProperty("--color", "#ff5722");
    e.target.style.cssText += `scale:0.85;box-shadow: 2px 2px 8px 0px black`;
    setTimeout(() => {
      e.target.style.setProperty("--color", " #494848");
      e.target.style.cssText += `scale:1;box-shadow: 4px 6px 12px 0px black;`;
    }, 200);
    deleteSound.currentTime = 0;
    deleteSound.play();
  }
  if (e.target.classList.contains("enter") && display.textContent) {
    const index8 =
      newNumbersArray[8] !== undefined ? String(newNumbersArray[8]) : "";
    const index5 =
      newNumbersArray[5] !== undefined ? String(newNumbersArray[5]) : "";
    const index2 =
      newNumbersArray[2] !== undefined ? String(newNumbersArray[2]) : "";

    rightNumber = index8 + index5 + index2;
    let givenNum = display.textContent;

    display.textContent = "";
    e.target.style.setProperty("--color", "#243cc0");
    e.target.style.cssText += `scale:0.85;box-shadow: 2px 2px 8px 0px black`;
    setTimeout(() => {
      e.target.style.setProperty("--color", " #494848");
      e.target.style.cssText += `scale:1;box-shadow: 4px 6px 12px 0px black;`;
      modalCon.classList.remove("d-none");
      endGame.classList.remove("d-none");
      if (givenNum == rightNumber) {
        wonModal.classList.remove("d-none");
        userTime.classList.remove("d-none");
        userTime.children[0].textContent = time - remainTime;
        replay.textContent = "REPLAY";
        introSound.muted = false;
        introSound.play();
      } else {
        loseModal.classList.remove("d-none");
        replay.textContent = "TRY AGAIN";
      }
    }, 200);
  }
});


draft.addEventListener("click", (e) => {
  if (!e.target.classList.contains("deleted")) {
  }
  e.target.classList.toggle("deleted");
  if (e.target.closest(".draft>div")) {
    e.target.classList.toggle("x-mark");
    hintNum.forEach((hint) => {
      e.target.textContent === hint.textContent
        ? hint.classList.toggle("x-mark")
        : "";
    });
  }
});

function getRandomizedNumbersArray(numbers) {
  let numberMap = new Map();
  numbers.forEach((_, index) => {
    const originalNumber = numbers[index];
    if (!numberMap.has(originalNumber)) {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 10);
      } while (Array.from(numberMap.values()).includes(newNumber));

      numberMap.set(originalNumber, newNumber);
    }
    newNumbersArray.push(numberMap.get(originalNumber));
  });
  hintNum.forEach((hint, index) => {
    hint.textContent = newNumbersArray[index];
  });
  uniqueArr = [...new Set(newNumbersArray)];
}

replay.onclick = () => {
  window.location.reload();
};
