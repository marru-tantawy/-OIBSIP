# Calculator

A browser-based calculator built with vanilla HTML, CSS and JavaScript, as **Task 1** of the Web Development track at Oasis Infobyte (OIBSIP).

## Live Demo
https://marru-tantawy.github.io/OIBSIP/WebDev-L2-Calculator/

## Features
- Display screen showing the current input and the previous calculation
- Number buttons (0-9) and a decimal point (only one decimal point per number)
- Operators: addition, subtraction, multiplication, division
- Equals button to evaluate the expression
- Clear (C) button to reset everything
- Backspace button to remove the last character
- Division by zero shows an error message instead of crashing
- Operator chaining: `5 + 3 × 2` works without resetting, and follows normal maths rules (answer: 11)
- Keep calculating with the previous result after pressing `=`
- Keyboard support (digits, operators, Enter, Backspace, Escape)
- CSS Grid used for the button layout
- All events attached with `addEventListener` (no inline `onclick`)

## How It Works
`eval()` is not used. The typed expression is split into numbers and operators by my own `tokenize()` function, then calculated in two passes: first `×` and `÷`, then `+` and `−`.

## Tech Stack
HTML5, CSS3 (Grid), JavaScript (Vanilla)

## Project Structure
```
WebDev-Task1-Calculator/
├── index.html
├── style.css
├── script.js
├── images/            (screenshots)
└── README.md
```

## How to Run
Download or clone the repository and open `index.html` in any browser.


## Resources
MDN Web Docs (addEventListener, switch, parseFloat) and vanilla JavaScript calculator tutorials on YouTube.