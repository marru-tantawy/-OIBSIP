const currentEl = document.getElementById("current");
const historyEl = document.getElementById("history");

let expression = "";        // what the user has typed so far
let justEvaluated = false;  // true right after "=" or an error
const OPERATORS = ["+", "−", "×", "÷"];

/* ---------- helpers ---------- */

function isOperator(char) {
  return OPERATORS.includes(char);
}

function updateDisplay() {
  currentEl.classList.remove("error");
  currentEl.textContent = expression === "" ? "0" : expression;
}

function showError(message) {
  expression = "";
  justEvaluated = true;
  currentEl.textContent = message;
  currentEl.classList.add("error");
}

/* Returns the number being typed right now (text after the last operator) */
function getCurrentNumber() {
  let start = 0;
  for (let i = expression.length - 1; i >= 0; i--) {
    // an operator at index 0 is just a negative sign, so ignore it
    if (isOperator(expression[i]) && i !== 0) {
      start = i + 1;
      break;
    }
  }
  return expression.slice(start);
}

/* Remove floating-point noise, e.g. 0.1 + 0.2 = 0.30000000000000004 */
function formatNumber(value) {
  return String(parseFloat(value.toFixed(10)));
}

/* ---------- calculation ---------- */

/* Step 1: split the expression string into numbers and operators */
function tokenize(text) {
  const tokens = [];
  let buffer = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (isOperator(char)) {
      const previousIsOperatorOrStart = buffer === "" && (tokens.length === 0 || isOperator(tokens[tokens.length - 1]));

      if (char === "−" && previousIsOperatorOrStart) {
        buffer = "-";                 // a minus here is a negative sign
      } else {
        tokens.push(parseFloat(buffer));
        tokens.push(char);
        buffer = "";
      }
    } else {
      buffer += char;                 // digit or decimal point
    }
  }
  tokens.push(parseFloat(buffer));
  return tokens;
}

/* Step 2: apply one operator to two numbers */
function applyOperator(a, operator, b) {
  switch (operator) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return a / b;   // zero is checked before this is called
  }
}

/* Step 3: evaluate the tokens. Returns a number, or null on divide-by-zero */
function evaluate(text) {
  const tokens = tokenize(text);

  // First pass: × and ÷
  const afterMultiplyDivide = [tokens[0]];
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const next = tokens[i + 1];

    if (operator === "×" || operator === "÷") {
      if (operator === "÷" && next === 0) return null;
      const last = afterMultiplyDivide.pop();
      afterMultiplyDivide.push(applyOperator(last, operator, next));
    } else {
      afterMultiplyDivide.push(operator, next);
    }
  }

  // Second pass: + and −
  let result = afterMultiplyDivide[0];
  for (let i = 1; i < afterMultiplyDivide.length; i += 2) {
    result = applyOperator(result, afterMultiplyDivide[i], afterMultiplyDivide[i + 1]);
  }
  return result;
}

function inputDigit(digit) {
  if (justEvaluated) {          // start a new calculation after "="
    expression = "";
    historyEl.textContent = "";
    justEvaluated = false;
  }
  // avoid numbers like 007
  if (getCurrentNumber() === "0") {
    expression = expression.slice(0, -1);
  }
  expression += digit;
  updateDisplay();
}

function inputDecimal() {
  if (justEvaluated) {
    expression = "";
    historyEl.textContent = "";
    justEvaluated = false;
  }
  const number = getCurrentNumber();
  if (number.includes(".")) return;                 // only one decimal point per number
  if (number === "" || number === "-") expression += "0";
  expression += ".";
  updateDisplay();
}

function inputOperator(operator) {
  justEvaluated = false;      // keep going with the previous result (chaining)

  if (expression === "") {
    if (operator === "−") {   // allow a negative first number
      expression = "−";
      updateDisplay();
    }
    return;
  }

  const last = expression[expression.length - 1];
  if (isOperator(last)) {
    if (expression.length === 1) return;         


    if (operator === "−" && (last === "×" || last === "÷")) {
      expression += operator;
      updateDisplay();
      return;
    }

  
    while (expression.length > 1 && isOperator(expression[expression.length - 1])) {
      expression = expression.slice(0, -1);
    }
  }
  expression += operator;
  updateDisplay();
}

function calculate() {
  if (expression === "") return;

  // drop a trailing operator, e.g. "5+" becomes "5"
  let text = expression;
  while (text.length > 0 && isOperator(text[text.length - 1])) {
    text = text.slice(0, -1);
  }
  if (text === "" || text === "−") return;

  const result = evaluate(text);

  if (result === null || !isFinite(result)) {
    historyEl.textContent = text + " =";
    showError("Error: can't divide by zero");
    return;
  }

  historyEl.textContent = text + " =";
  expression = formatNumber(result).replace("-", "−");   // use our minus symbol
  justEvaluated = true;
  updateDisplay();
}

function clearAll() {
  expression = "";
  justEvaluated = false;
  historyEl.textContent = "";
  updateDisplay();
}

function backspace() {
  if (justEvaluated) {        
    clearAll();
    return;
  }
  expression = expression.slice(0, -1);
  updateDisplay();
}


document.querySelectorAll(".key").forEach(function (button) {
  button.addEventListener("click", function () {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "digit":     inputDigit(value);    break;
      case "decimal":   inputDecimal();       break;
      case "operator":  inputOperator(value); break;
      case "equals":    calculate();          break;
      case "clear":     clearAll();           break;
      case "backspace": backspace();          break;
    }
  });
});

/* Bonus: keyboard support */
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") inputDigit(key);
  else if (key === ".") inputDecimal();
  else if (key === "+") inputOperator("+");
  else if (key === "-") inputOperator("−");
  else if (key === "*") inputOperator("×");
  else if (key === "/") { event.preventDefault(); inputOperator("÷"); }
  else if (key === "Enter" || key === "=") { event.preventDefault(); calculate(); }
  else if (key === "Backspace") backspace();
  else if (key === "Escape") clearAll();
});