function add(num1, num2) {
    return num1 + num2;
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
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    }
}

function lastCharIsOperator(str) {
    return (str.slice(-1) === '÷' || str.slice(-1) === 'x' ||
            str.slice(-1) === '-' || str.slice(-1) === '+');
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
    } else {
        displayContents += operator;
    }

    display.textContent = displayContents;
}

let prevNum = null;
let prevOperator = null;
let displayContents = '';

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        inputNumber(e.target.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        inputOperator(e.target.textContent);
    });
});
