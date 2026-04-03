const PrincipalDisplay = document.getElementById("principalDisplay");
const SecondaryDisplay = document.getElementById("secondaryDisplay");
let lastResult = false;
const operators = new Set(["+", "-", "*", "/"]);

function appendToDisplay(input) {
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
    if (expression && !operators.has(expression.slice(-1))) {
      SecondaryDisplay.value = eval(expression);
    } else {
      SecondaryDisplay.value = "";
    }
  } catch {
    SecondaryDisplay.value = "";
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
