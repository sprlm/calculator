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

function displayNumber(num) {
    if (displayContents.length < 12) {
        displayContents += num;
    }
    display.textContent = displayContents;
}

let displayContents = '';

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.number');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        displayNumber(e.target.textContent);
    });
})
