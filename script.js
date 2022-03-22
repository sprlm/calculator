function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '÷':
            return divide(num1, num2);
            break;
    }
}

function lastCharIsOperator(str) {
    return (str.slice(-1) === '÷' || str.slice(-1) === 'x' ||
            str.slice(-1) === '-' || str.slice(-1) === '+');
}

function solveInputsExist() {
    return prevNum !== null && prevOperator !== null && displayContents !== '';
}

function inputNumber(num) {
    if (lastCharIsOperator(displayContents)) {
        prevNum = displayContents.slice(0, -1);
        prevOperator = displayContents.slice(-1);
        displayContents = num;
    } else {
        if (displayContents.length < 12) {
            displayContents += num;
        }
    }
    display.textContent = displayContents;
}

function inputOperator(operator) {
    if (lastCharIsOperator(displayContents)) {
        displayContents = displayContents.slice(0,-1) + operator;
    } else if (solveInputsExist()) {
        solve();
        displayContents += operator;
    } else {
        displayContents += operator;
    }

    display.textContent = displayContents;
}

function clear() {
    prevNum = null;
    prevOperator = null;
    displayContents = '';

    display.textContent = displayContents;
}

function solve() {
    if (solveInputsExist()) {
        if (!isFinite(operate(prevNum, displayContents, prevOperator))) {
            alert(`Uh oh! You almost divided by zero there, bud.`);
        } else {
            displayContents = operate(prevNum, displayContents, prevOperator);
            displayContents = Math.round(displayContents * 10000) / 10000;

            if (displayContents.toString().length > 12) {
                displayContents = parseFloat(displayContents).toExponential(6);
            }

            displayContents = displayContents.toString();

            prevOperator = null;
            prevNum = displayContents;

            display.textContent = displayContents;
        }
    }
}

function getPercent() {
    if (displayContents !== '') {
        if (lastCharIsOperator(displayContents)) {
            displayContents = displayContents.slice(0,-1);
        }
        
        if ((displayContents / 100).toString().length > 12) {
            displayContents = parseFloat(displayContents/100).toExponential(6).toString();
        } else {
            displayContents = (displayContents / 100).toString()
        }

        display.textContent = displayContents;
    }
}

function backspace() {
    if (displayContents !== '') {
        displayContents = displayContents.slice(0,-1);
    }

    display.textContent = displayContents;
}

function decimal() {
    if (lastCharIsOperator(displayContents)) {
        prevNum = displayContents.slice(0, -1);
        prevOperator = displayContents.slice(-1);
        displayContents = '.';
    } else if (!displayContents.includes('.')) {
        displayContents += '.';
    }

    display.textContent = displayContents;
}

function getKeyPress(e) {
    let key = e.code;
    let shiftHeld = e.shiftKey;

    if (shiftHeld && key === 'Digit5') {
        getPercent();
    } else if (shiftHeld && key === 'Equal') {
        inputOperator('+');
    } else if ((shiftHeld && key === 'Digit8') || key === 'KeyX') {
        inputOperator('x');
    } else if (key.slice(0, -1) === 'Digit') {
        inputNumber(key.slice(-1));
    } else if (key === 'Escape') {
        clear();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Slash') {
        inputOperator('÷');
    } else if (key === 'Minus') {
        inputOperator('-');
    } else if (key === 'Period') {
        decimal();
    } else if (key === 'Equal' || key === 'Enter') {
        solve();
    }
}

let prevNum = null;
let prevOperator = null;
let displayContents = '';

const display = document.querySelector('#display');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        inputNumber(e.target.textContent);
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        inputOperator(e.target.textContent);
    });
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', solve);

const percentButton = document.querySelector('#percent');
percentButton.addEventListener('click', getPercent);

const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', backspace);

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', decimal);

window.addEventListener('keydown', getKeyPress);
