function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(a, b, operator) {
    
    switch (operator) {
        case "+":
            add(a,b);
            break;

        case "-" :
            subtract(a,b);
            break;

        case "*":
            multiply(a,b);
            break;

        case "/":
            divide(a,b);
            break;

    }
}

const buttons = document.querySelectorAll(".button");
const mini = document.querySelector("#mini");
const operator = document.querySelector("#operator");
const main = document.querySelector("#main");

let operation = {
    displayNumber: "",
    memoryNumber: "0",
    operator: "",
}

function showNumber() {
    main.innerText = operation.memoryNumber;
}

function buttonListener(){
    buttons.forEach(button => button.addEventListener("click", function() {
    
        if(button.classList.contains("number")) {   //Display and assign displayNumber
            operation.displayNumber += button.innerText;
            main.innerText = operation.displayNumber;
    
        } else if (button.classList.contains("operator")) {
            operation.operator = button.innerText;  //Display and assign Operator 
            operator.innerText = operation.operator;
        
        } else if (button.id == "posneg") {
            operation.displayNumber = String(operation.displayNumber * -1); //change positive or negative value to displayNumber
            main.innerText = operation.displayNumber;
        }
    
        console.log(operation);
    }))
        
}

showNumber();

buttonListener();