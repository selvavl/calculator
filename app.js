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
    displayNumber: "0",
    memoryNumber: "",
    operator: "",
    checkerZero: false,
    checkerOperator: false,
}

function newOperation() {
    operation.displayNumber = "0";
    operation.memoryNumber = "";
    operation.operator = "";

    main.innerText = operation.displayNumber;
}

function buttonListener(){
    buttons.forEach(button => button.addEventListener("click", function() {

        if(button.classList.contains("number")) {
            if(operation.operator != "") {      //if a number is pressed and an operator is present then:
                if(operation.checkerOperator == false) {    //first, the display number must move into memory and display must be cleared
                    operation.memoryNumber = operation.displayNumber;
                    operation.displayNumber = "";
                    operation.checkerOperator = true;       //to make this clear function to happen once add a checker
                }
            }
            
            if(this.innerText == "0" && operation.displayNumber == "0") {        //if 0 is pressed while 0 is in display, do nothing
                console.log("do nothing!");
            } else {
                if(operation.checkerZero == false) { //when a number that differs from 0 is pressed, erase 0 in display value, a checker is need to be done just once.
                    operation.displayNumber = "";
                    operation.checkerZero = true;
                }
                operation.displayNumber += button.innerText;
                main.innerText = operation.displayNumber;
            }
        }
        
        if(button.classList.contains("operator")) {
            if(operation.displayNumber != "" && operation.memoryNumber != "") { //when an operator is pressed and there are numbers in display and memory, operate
                operation.displayNumber = operate(operation.memoryNumber, operation.displayNumber, operation.operator);
                operation.memoryNumber = ""; //memory then is cleaned  
                operation.operator = "";    //operator is also cleaned
                operation.checkerOperator = false;  //operator checker is cleared
                main.innerText = operation.displayNumber;
            }
            operation.operator = this.innerText;
            operator.innerText = operation.operator;
        }

        if(button.classList.contains("posneg")) {
            operation.displayNumber *= -1;
            main.innerText = operation.displayNumber
        }

        if(button.id == "equal") {
            if(operation.memoryNumber == "") {
                console.log("do nothing again");
            } else {
                operation.displayNumber = operate(operation.memoryNumber, operation.displayNumber, operation.operator);
                operation.memoryNumber = ""; //memory then is cleaned  
                operation.operator = "";    //operator is also cleaned
                operation.checkerOperator = false;  //operator checker is cleared
                main.innerText = operation.displayNumber;
                operator.innerText = operation.operator;
            }
            
        }

        if(button.classList.contains("clear")) {

        }
    
        // if (button.classList.contains("operator")) {
        //     if(operation.memoryNumber != 0) {
        //         operation.displayNumber = operate(operation.memoryNumber,operation.displayNumber,operation.operator);
        //         main.innerText = operation.displayNumber;
        //     } else{
        //         operation.operator = button.innerText;  //Display and assign Operator 
        //         operator.innerText = operation.operator;
        //         operation.memoryNumber = operation.displayNumber;
        //         operation.displayNumber = "";
        //     }
            
        
        // } else if(button.classList.contains("number")) {   //Display and assign displayNumber
        //     operation.displayNumber += button.innerText;
        //     main.innerText = operation.displayNumber;
    
        // } else if (button.id == "posneg") {
        //     operation.displayNumber = String(operation.displayNumber * -1); //change positive or negative value to displayNumber
        //     main.innerText = operation.displayNumber;
        // }
    
        // console.log(operation);
    }))
        
}

newOperation();

buttonListener();