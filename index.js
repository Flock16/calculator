const topDisplay = document.querySelector(".calc-screen > h3");
const display = document.querySelector(".calc-screen > h2");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButtons = document.querySelectorAll(".clear-button");
const equalsButton = document.querySelector(".equals-button");
const negativePositiveButton = document.querySelector(
  ".negative-positive-button"
);
const divideByZeroMessage = "Shameless";

let firstNumber = "";
let secondNumber = "";
let operator = "";
let clearBottomScreen = false;
let clearTopScreen = false;

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let input = event.target.textContent;
    handleOperatorInput(event.target, input);
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let input = event.target.textContent;
    handleNumberInput(input);
  });
});

clearButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let input = event.target.textContent;
    handleClearInput(input);
  });
});

equalsButton.addEventListener("click", () => {
  handleEqualsInput();
});

negativePositiveButton.addEventListener("click", () =>
  handleNegativePositiveToggle()
);

const handleNumberInput = (input) => {
  if (clearBottomScreen) {
    display.textContent = "";
    clearBottomScreen = false;
  }
  if (clearTopScreen) {
    topDisplay.textContent = "";
    clearTopScreen = false;
  }
  if (input === "." && display.textContent.includes(".")) {
    return;
  }
  clearOperatorButtonHighlight();
  display.textContent += input;
};

const handleClearInput = (input) => {
  if (input === "DEL") {
    display.textContent = display.textContent.slice(0, -1);
  } else if (input === "AC") {
    clearOperatorButtonHighlight();
    fullClear();
  }
};

const handleOperatorInput = (button, input) => {
  if (display.textContent == divideByZeroMessage) {
    fullClear();
    return;
  }
  clearOperatorButtonHighlight();
  addOperatorButtonHighlight(button);
  if (operator) handleEqualsInput();
  firstNumber = display.textContent;
  operator = input;
  topDisplay.textContent = `${firstNumber} ${operator}`;
  clearTopScreen = false;
  clearBottomScreen = true;
};

const handleEqualsInput = () => {
  if (!firstNumber || !operator) return;
  secondNumber = display.textContent;
  if (operator === "/" && secondNumber === "0") {
    handleDivideByZero();
    return;
  }
  topDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
  let result = operate(firstNumber, secondNumber, operator);
  display.textContent = firstNumber = result;
  secondNumber = "";
  operator = "";
  clearBottomScreen = true;
  clearTopScreen = true;
};

const handleNegativePositiveToggle = () => {
  if (display.textContent) {
    display.textContent.includes("-")
      ? (display.textContent = display.textContent.slice(1))
      : (display.textContent = "-" + display.textContent);
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
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  topDisplay.textContent = "";
};
const handleDivideByZero = () => {
  display.textContent = divideByZeroMessage;
  clearBottomScreen = true;
  firstNumber = "";
  secondNumber = "";
  operator = "";
};
