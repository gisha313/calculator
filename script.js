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
        // if something's already been calculated, don't let user append digits to the result, reset it
        if (repeatOperation) {
            repeatNumber = "";
            repeatOperation = "";
            currentNumber = "";
        }
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

        //reset repeat operation after new one is clicked
        repeatNumber = "";
        repeatOperation = "";
    });
});


const evalBtn = document.querySelector("#evaluate");
// if 'equals' is pressed after an operation is done, remember the second number and operation
// so that it can be repeated with every subsequent press of 'equals'
// but put them into new variables so that they aren't shown
let repeatNumber = "", repeatOperation = "";
evalBtn.addEventListener("click", () => {
    if (operation && currentNumber){
        repeatNumber = currentNumber;
        repeatOperation = operation;

        currentNumber = evaluate(Number(previousNumber), Number(currentNumber), operation).toString();
        previousNumber = "";
        operation = "";
        update_display();
    }
    else if (repeatOperation){
        currentNumber = evaluate(Number(currentNumber), Number(repeatNumber), repeatOperation);
        update_display();
    }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    previousNumber = "";
    currentNumber = "";
    operation = "";
    repeatOperation = "";
    repeatNumber = "";
    update_display();
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    //forget about repeat operation if the delete is clicked
    repeatOperation = "";
    repeatNumber = "";

    //if the situation is 'num oper num' or 'num' remove last digit from number
    if ((previousNumber && operation && currentNumber) || (!operation && currentNumber))
        currentNumber = currentNumber.slice(0, -1);
    //otherwise remove operation
    else if(!currentNumber && previousNumber)
        operation = "";
    
    //if after deleting we're left with a single number, make it the current number
    if (!operation && !currentNumber){
        currentNumber = previousNumber;
        previousNumber = "";
    }
    update_display()
});