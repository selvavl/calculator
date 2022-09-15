// function add(a,b) {
//     let result = "";
//     result = parseInt(a) + parseInt(b);
//     return result;
// }

// function subtract(a,b) {
//     let result = "";
//     result = parseInt(a) - parseInt(b);
//     return result;
// }

// function multiply(a,b) {
//     let result = "";
//     result = parseInt(a) * parseInt(b);
//     return result;
// }

// function divide(a,b) {
//     let result = "";
//     result = parseInt(a) / parseInt(b);
//     return result;
// }

function operate(a, b, operator) {
    
    switch (operator) {
        case "+":
            return parseInt(a) + parseInt(b);
            // break;

        case "-":
            return parseInt(a) - parseInt(b);
            // break;

        case "*":
            return parseInt(a) * parseInt(b);
            // break;

        case "/":
            return parseInt(a) / parseInt(b);
            // break;

    }
}

const buttons = document.querySelectorAll(".button");
const mini = document.querySelector("#mini");
const operator = document.querySelector("#operator");
const main = document.querySelector("#main");
const memory = document.querySelector("#memory");

let operation = {
    displayNumber: "0",
    memory: "",
    operator: "",

    equalToken: false,
    equalMemory: "",
    operatorToken: false,
}

function newOperation() {
    operation.displayNumber = "0";
    operation.memory = "";
    operation.operator = "";
    equalToken = false;
    equalMemory = "";
    operatorToken = false;
    main.innerText = operation.displayNumber;
    operator.innerText = operation.operator;
    memory.innerText = operation.memory;
}

function eraseEqualMemory() {
    operation.equalToken = false;
    operation.memory = "";
}

function buttonListener(){
    buttons.forEach(button => button.addEventListener("click", function() {

        if(button.id == "posneg") { //changes sign
            if(operation.displayNumber == "0" || operation.displayNumber == "0." || operation.displayNumber == "") { //condition to prevent errors
                console.log("posneg: do nothing")
                eraseEqualMemory();
            
            } else {
                operation.displayNumber *= -1;
                main.innerText = operation.displayNumber;
                eraseEqualMemory();
            }

        } else if(button.id == "backspace") { //delete last char
            if(operation.displayNumber == "0") {
                console.log("backspace: do nothing");
                eraseEqualMemory();
            
            } else if(operation.displayNumber.length == 1) {
                operation.displayNumber = "0";
                main.innerText = operation.displayNumber;
                eraseEqualMemory();

            } else {
                operation.displayNumber = operation.displayNumber.slice(0, -1);
                main.innerText = operation.displayNumber;
                eraseEqualMemory();
            } 

        } else if(button.id == "dot") { //writes dot "."
            if(operation.displayNumber.includes(".")) { //only one dot "." is allowed
                console.log("dot: do nothing");
                eraseEqualMemory();
            
            } else {
                operation.displayNumber += ".";
                main.innerText = operation.displayNumber;
                eraseEqualMemory();
            }

        } else if(button.id == "equal") {
            if(operation.displayNumber != "" && operation.memory != "" && operation.operator != "" && operation.equalToken == false) { //adding a token in case equal is used right away again
                operation.equalToken = true;
                operation.equalMemory = operation.displayNumber;
                operation.displayNumber = operate(operation.memory, operation.displayNumber, operation.operator);
                main.innerText = operation.displayNumber;
            
            } else if(operation.equalToken) { //case equal is used right away again
                operation.displayNumber = operate(operation.displayNumber, operation.equalMemory, operation.operator);
                main.innerText = operation.displayNumber;
            } else {
                console.log("equal: do nothing");
            }

        } else if(button.classList.contains("operator")) {
            if(operation.displayNumber != "" && operation.memory != "" && operation.operator != "") {
                eraseEqualMemory();
                operation.displayNumber = operate(operation.memory, operation.displayNumber, operator);
                main.innerText = operation.displayNumber;

            }

            operation.operator = this.innerText;
            operator.innerHTML = operation.operator;
            
        } else if(button.classList.contains("number")) {
            eraseEqualMemory();
            
            if(operation.equalToken == true) { //If a number is pressed after an equal then clear memory
                newOperation();
                
            }
            
            if(operation.displayNumber == "0") {
                if(this.innerText == "0") {
                    console.log("number 0: do nothing") //If 0 is shown in display and 0 button is pressed, then do nothing.

                } else if(this.innerText != "0") {
                    operation.displayNumber = ""; // If 0 is shown in display and a number button different from 0 is pressed then clear the display.
                }

            } else if(operation.operator != "" && operation.operatorToken == false) {
                    operation.memory = operation.displayNumber;
                    operation.displayNumber = "";
                    operation.operatorToken = true;
                
            }

            operation.displayNumber += this.innerText;
            main.innerText = operation.displayNumber;

            

        }
        console.log(operation);



        

        // if(button.classList.contains("number")) {

        //     if(operation.checkEqual == true) {
        //         newOperation();
        //     }
            
        //     if(operation.operator != "") {      //if a number is pressed and an operator is present then:
        //         if(operation.checkerOperator == false) {    //display number must move into memory and display must be cleared
        //             operation.memory[0] = operation.displayNumber;
        //             operation.displayNumber = "";
        //             operation.checkerOperator = true;       //to make this clear function to happen once add a checker
        //         }
        //     }
            
        //     if(this.innerText == "0" && operation.displayNumber == "0") {        //if 0 is pressed while 0 is in display, do nothing
        //         console.log("do nothing!");
        //     } else {

        //         if(operation.checkerZero == false) { //when a number that differs from 0 is pressed, erase 0 in display value, a checker is need to be done just once.
        //             operation.displayNumber = "";
        //             operation.checkerZero = true;
        //         }
        //         operation.displayNumber += button.innerText;
        //         main.innerText = operation.displayNumber;

        //     }
            
        //    console.log(operation);
        // }
        
        // if(button.classList.contains("operator")) {
        //     if(this.innerText == operation.operator) {
        //         return;
        //     } else if(operation.memory[0]) { //when an operator is pressed and there are numbers in display and memory, operate
        //         operation.displayNumber = operate(operation.memory[0], operation.displayNumber, operation.operator);
        //         operation.memory[0] = ""; // memory then is cleaned  
        //         // operation.operator = "";    //operator is also cleaned
        //         operation.checkerOperator = false;  //operator checker is cleared
        //         main.innerText = operation.displayNumber;
        //     }
        //     operation.operator = this.innerText;
        //     operator.innerText = operation.operator;
        //     console.log(operation);
        // }


        // if(button.classList.contains("posneg")) {
        //     operation.displayNumber *= -1;
        //     main.innerText = operation.displayNumber
        //     console.log(operation);
        // }

        // if(button.id == "equal") {
        //     if(operation.memory[0] == "" || operation.operator == "") {
        //         console.log("do nothing again");
        //     } else {
        //         operation.displayNumber = operate(operation.memory[0], operation.displayNumber, operation.operator);
        //         operation.memory[0] = ""; //memory then is cleaned  
        //         operation.operator = "";    //operator is also cleaned
        //         operation.checkerOperator = false;  //operator checker is cleared
        //         operation.checkEqual = true;
        //         main.innerText = operation.displayNumber;
        //         operator.innerText = operation.operator;
        //     }
        //     console.log(operation);
        // }

        // if(button.classList.contains("clear")) {

        // }
    

    }))
        
}

newOperation();

buttonListener();