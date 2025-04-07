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

const opButtons = document.querySelectorAll(".operator-btn");
opButtons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        // if there's a previous number and an operation calculate the existing expression 
        // which should already contain a (number, operation, number)
        if (previousNumber !== "" && operation !== ""){
            //reset the previous to the new result
            previousNumber = evaluate(Number(previousNumber), Number(currentNumber), operation).toString();;
        }
        // otherwise the previous number is set to the current
        else previousNumber = currentNumber;

        // set operation to the new one and clear current number
        operation = btn.id;
        currentNumber = "";
        update_display();
    });
});


const evalBtn = document.querySelector("#evaluate");
evalBtn.addEventListener("click", () => {
    if (operation){
        currentNumber = evaluate(Number(previousNumber), Number(currentNumber), operation).toString();
        previousNumber = "";
        operation = "";
        update_display();
    }
});