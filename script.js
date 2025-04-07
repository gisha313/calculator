function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

function div(a, b){
    if (b === 0) return "err";
    return a / b;
}

function evaluate(firstNumber, secondNumber, operator){
    const operations = {
        "+": add,
        "-": sub,
        "*": mul,
        "/": div,
    }

    return operations[operator](firstNumber, secondNumber);
}

const displayCurrent = document.querySelector("#display-current");

function update_display(){
    displayCurrent.textContent = previousNumber + operation + currentNumber;
}

let currentNumber = "", previousNumber = "", operation = "";

const numButtons = document.querySelectorAll(".number-btn");
numButtons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        let number = btn.id;
        currentNumber = currentNumber === null ? number : currentNumber + number;
        update_display();
    });
});