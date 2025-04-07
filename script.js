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

function evaluate(expr){
    const operations = {
        "+": add,
        "-": sub,
        "*": mul,
        "/": div,
    }

    let a   = Number(expr.split(" ")[0]);
    let op  = expr.split(" ")[1];
    let b   = Number(expr.split(" ")[2]);

    return operations[op](a, b);
}

console.log(evaluate("3 / 0"));