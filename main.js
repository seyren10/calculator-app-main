const keyList = document.querySelectorAll(".btn");
const screen = document.querySelector("#screen");

let input = "";
let toggleClear = false;
let firstOperation = true;

const inputScreen = (key) => {
  input += key;
  screen.textContent = input;
};

const deleteLastNumber = () => {
  if (!toggleClear) {
    input = input.toString();
    input = input.slice(0, input.length - 1);
    screen.textContent = input;
  } else {
    clearScreen();
  }
};
const clearScreen = () => {
  input = "";
  screen.textContent = input;
  toggleClear = false;
  firstOperation = true;
};

const add = (n1, n2) => {
  return n1 + n2;
};
const subtract = (n1, n2) => {
  return n1 - n2;
};
const multiply = (n1, n2) => {
  return n1 * n2;
};
const divide = (n1, n2) => {
  return n1 / n2;
};

const calculate = (operation, first, second) => {
  switch (operation) {
    case "+":
      return add(first, second);
    case "-":
      return subtract(first, second);
    case "x":
      return multiply(first, second);
    case "/":
      return divide(first, second);
    default:
      return "Invalid Operation";
  }
};

const extractExpression = () => {
  const operations = ["+", "-", "x", "/"];
  let operationIndex = 0;
  let currentOperation = "";

  for (const operation of operations) {
    operationIndex = input.indexOf(operation);

    if (operation === "-") {
      if (input[0] === "-") {
        operationIndex = input.indexOf(operation, 2);
      }
    }

    if (operationIndex !== -1) {
      currentOperation = operation;
      break;
    }
  }

  const firstExp = +input.slice(0, operationIndex);
  const secondExp = +input.slice(operationIndex + 1);

  input = calculate(currentOperation, firstExp, secondExp);
  screen.textContent = input;
};

const checkFirstOperation = () => {
  console.log(firstOperation);
  if (firstOperation) {
    firstOperation = false;
  } else {
    extractExpression();
  }

  return false;
};

const isOperation = (key) => {
  switch (key.toLowerCase()) {
    case "del":
      deleteLastNumber();
      break;
    case "reset":
      clearScreen();
      break;
    case "=":
      extractExpression();
      toggleClear = true;
      firstOperation = true;
      break;
    case "+":
      toggleClear = true;
      return checkFirstOperation();
    case "-":
      toggleClear = true;
      return checkFirstOperation();
    case "x":
      toggleClear = true;
      return checkFirstOperation();
    case "/":
      toggleClear = true;
      return checkFirstOperation();
    default:
      return false;
  }

  return true;
};

keyList.forEach((key) => {
  key.addEventListener("click", (e) => {
    const content = e.target.textContent;
    if (!isOperation(content)) {
      inputScreen(content);
    }
  });
});
