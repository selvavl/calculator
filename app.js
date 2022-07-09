function add(a,b) {
    let result = "";
    result = parseInt(a) + parseInt(b);
    return result;
}

function subtract(a,b) {
    let result = "";
    result = parseInt(a) - parseInt(b);
    return result;
}

function multiply(a,b) {
    let result = "";
    result = parseInt(a) * parseInt(b);
    return result;
}

function divide(a,b) {
    let result = "";
    result = parseInt(a) / parseInt(b);
    return result;
}

function operate(a, b, operator) {
    
    switch (operator) {
        case "+":
            return add(a,b);
            break;

        case "-":
            return subtract(a,b);
            break;

        case "*":
            return multiply(a,b);
            break;

        case "/":
            return divide(a,b);
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
    lastPressed: "",
}

function showNumber() {
    main.innerText = operation.memoryNumber;
}

function buttonListener(){
    buttons.forEach(button => button.addEventListener("click", function() {
    
        if (button.classList.contains("operator")) {
            if(operation.memoryNumber != 0) {
                operation.displayNumber = operate(operation.memoryNumber,operation.displayNumber,operation.operator);
                main.innerText = operation.displayNumber;
            } else{
                operation.operator = button.innerText;  //Display and assign Operator 
                operator.innerText = operation.operator;
                operation.memoryNumber = operation.displayNumber;
                operation.displayNumber = "";
            }
            
        
        } else if(button.classList.contains("number")) {   //Display and assign displayNumber
            operation.displayNumber += button.innerText;
            main.innerText = operation.displayNumber;
    
        } else if (button.id == "posneg") {
            operation.displayNumber = String(operation.displayNumber * -1); //change positive or negative value to displayNumber
            main.innerText = operation.displayNumber;
        }
    
        console.log(operation);
    }))
        
}

showNumber();

buttonListener();