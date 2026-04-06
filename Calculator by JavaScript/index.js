const PrincipalDisplay = document.getElementById("principalDisplay");
const SecondaryDisplay = document.getElementById("secondaryDisplay");
let lastResult = false;
const operators = new Set(["+", "-", "*", "/"]);
let digitCount = 0;

function appendToDisplay(input) {
  if (!operators.has(input) && input !== "." && digitCount <= 15) {
    digitCount++;
  } else if (operators.has(input) || input === ".") {
    digitCount = 0;
  }
  if (digitCount > 15) {
    window.alert("Maximum digit limit reached.");
    return;
  }

  if (lastResult) {
    if (!operators.has(input)) {
      PrincipalDisplay.value = "";
    }
    if (input === ".") PrincipalDisplay.value = "0.";
    lastResult = false;
  }
  if (input === ".") {
    if (PrincipalDisplay.value === "0") {
      PrincipalDisplay.value = "0.";
    } else if (!PrincipalDisplay.value.includes(".")) {
      PrincipalDisplay.value += ".";
    }
  } else {
    if (PrincipalDisplay.value === "0") {
      PrincipalDisplay.value = input;
    } else {
      PrincipalDisplay.value += input;
    }
  }
  try {
    const expression = PrincipalDisplay.value;
    const hasOperator = Array.from(expression).some((char) =>
      operators.has(char),
    );
    if (
      expression &&
      !operators.has(expression.slice(-1)) &&
      !expression.endsWith(".") &&
      hasOperator
    ) {
      SecondaryDisplay.value = eval(expression);
    } else {
      SecondaryDisplay.value = "";
    }
  } catch {
    SecondaryDisplay.value = "";
  }
}
function resizeFont() {
  if (PrincipalDisplay.value.length > 30) {
    PrincipalDisplay.style.fontSize = "60%";
  } else if (PrincipalDisplay.value.length > 20) {
    PrincipalDisplay.style.fontSize = "80%";
  } else {
    PrincipalDisplay.style.fontSize = "100%";
  }
}
function clearDisplay() {
  PrincipalDisplay.value = "0";
  SecondaryDisplay.value = "";
  lastResult = false;
}

function calculate() {
  try {
    PrincipalDisplay.value = eval(PrincipalDisplay.value);
    SecondaryDisplay.value = "";
    lastResult = true;
  } catch (error) {
    window.alert("Invalid expression.");
  }
}
