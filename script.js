const topDisplay = document.querySelector(".calc-screen > h3");
const bottomDisplay = document.querySelector(".calc-screen > h2");
const calcButtons = document.querySelector(".calc-buttons-container");
const operatorButtons = document.querySelectorAll(".operator-button");
const divideByZeroMessage = "Shameless";
const numbers = "1234567890.";
const operators = "/x+-";
const clearButtons = ["AC", "DEL"];

let firstNumber = "";
let secondNumber = "";
let operator = "";
let clearBottomScreen = false;
let clearTopScreen = false;

calcButtons.addEventListener("click", (event) => {
  input = event.target.textContent;
  if (numbers.includes(input)) handleNumberInput(input);
  else if (operators.includes(input)) handleOperatorInput(event.target, input);
  else if (input === "=") handleEqualsInput();
  else if (clearButtons.includes(input)) handleClearInput(input);
  else if (input === "+/-") handleNegativePositiveToggle();
});

const handleNumberInput = (input) => {
  if (clearBottomScreen) {
    bottomDisplay.textContent = "";
    clearBottomScreen = false;
  }
  if (clearTopScreen) {
    topDisplay.textContent = "";
    clearTopScreen = false;
  }
  if (input === "." && bottomDisplay.textContent.includes(".")) {
    return;
  }
  clearOperatorButtonHighlight();
  bottomDisplay.textContent += input;
};

const handleClearInput = (input) => {
  if (input === "DEL") {
    bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1);
  } else if (input === "AC") {
    clearOperatorButtonHighlight();
    fullClear();
  }
};

const handleOperatorInput = (button, input) => {
  if (bottomDisplay.textContent == divideByZeroMessage) {
    fullClear();
    return;
  }
  clearOperatorButtonHighlight();
  addOperatorButtonHighlight(button);
  if (operator) handleEqualsInput();
  firstNumber = bottomDisplay.textContent;
  operator = input;
  if (firstNumber) topDisplay.textContent = `${firstNumber} ${operator}`;
  bottomDisplay.textContent = "";
  clearTopScreen = false;
};

const handleEqualsInput = () => {
  if (!firstNumber || !operator) return;
  secondNumber = bottomDisplay.textContent;
  if (operator === "/" && secondNumber === "0") {
    handleDivideByZero();
    return;
  }
  topDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
  let result = operate(firstNumber, secondNumber, operator);
  bottomDisplay.textContent = firstNumber = result;
  secondNumber = "";
  operator = "";
  clearBottomScreen = true;
  clearTopScreen = true;
};

const handleNegativePositiveToggle = () => {
  if (bottomDisplay.textContent) {
    bottomDisplay.textContent.includes("-")
      ? (bottomDisplay.textContent = bottomDisplay.textContent.slice(1))
      : (bottomDisplay.textContent = "-" + bottomDisplay.textContent);
  }
};

const operate = (firstNumber, secondNumber, operator) => {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  let result;
  if (operator === "+") result = add(firstNumber, secondNumber);
  if (operator === "-") result = subtract(firstNumber, secondNumber);
  if (operator === "x") result = multiply(firstNumber, secondNumber);
  if (operator === "/") result = divide(firstNumber, secondNumber);

  return parseFloat(result.toFixed(2));
};

const add = (a, b) => {
  return a + b;
};
const subtract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

const clearOperatorButtonHighlight = () => {
  operatorButtons.forEach((button) => {
    button.classList.remove("operator-button-pressed");
  });
};
const addOperatorButtonHighlight = (button) => {
  button.classList.add("operator-button-pressed");
};
const fullClear = () => {
  bottomDisplay.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  topDisplay.textContent = "";
};
const handleDivideByZero = () => {
  bottomDisplay.textContent = divideByZeroMessage;
  clearBottomScreen = true;
  topDisplay.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
};
