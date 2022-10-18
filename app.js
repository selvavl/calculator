function operate(a, b, operator) {
    
    switch (operator) {
        case '+':
            return parseFloat(a) + parseFloat(b);
            // break;

        case '-':
            return parseFloat(a) - parseFloat(b);
            // break;

        case '*':
            return parseFloat(a) * parseFloat(b);
            // break;

        case '/':
            return parseFloat(a) / parseFloat(b);
            // break;

    }
}

const buttons = document.querySelectorAll('.button');
const operator = document.querySelector('#operator');
const main = document.querySelector('#main');
const memory = document.querySelector('#memory');

let operation = {
    displayNumber: 300,
    memory: '',
    operator: '',
    operatorToken: false,
    equalMemory: '',
    
}

main.innerText = operation.displayNumber;

function buttonListener(){
    buttons.forEach(button => button.addEventListener('click', function() {

        //changes sign of the number in display
        if(button.id == 'posneg') { 
            //does nothing if number in display == 0
            if(operation.displayNumber == 0) {
                console.log('do nothing posneg: display is 0');
            } else {
                operation.displayNumber *= -1;
                main.innerText = operation.displayNumber;
            }
            
        // delete last character in display
        } else if(button.id == 'backspace') { 
            //does nothing if number in display == 0
            if(operation.displayNumber === '0') {
                console.log('backspace: do nothing');
            //number in display changes to 0 if there is only one number in display
            } else if(String(operation.displayNumber).length == 1) {
                operation.displayNumber = 0;
                main.innerText = operation.displayNumber;
            //number in display changes to 0 if there is a negative number of 1 character
            } else if(String(operation.displayNumber).length == 2 && String(operation.displayNumber).includes('-')) {
                operation.displayNumber = 0;
                main.innerText = operation.displayNumber;
            } else {
                operation.displayNumber = String(operation.displayNumber);
                operation.displayNumber = operation.displayNumber.slice(0, -1);
                // operation.displayNumber = parseFloat(operation.displayNumber);
                main.innerText = operation.displayNumber;

            } 

        } else if(button.id == 'dot') { //writes dot '.'
            if(String(operation.displayNumber).includes('.')) { //only one dot '.' is allowed
                console.log('dot: do nothing');

            
            } else {
                operation.displayNumber += '.';
                main.innerText = operation.displayNumber;

            }

        } else if(button.id == 'equal') {
            if(operation.equalMemory != '') {
                operation.displayNumber = operate(operation.displayNumber, operation.equalMemory, operation.operator);
                main.innerText = operation.displayNumber;


            } else if(operation.displayNumber != '' && operation.memory != '' && operation.operator != '') { //adding a token in case equal is used right away again
                operation.equalMemory = operation.displayNumber;
                operation.displayNumber = operate(operation.memory, operation.displayNumber, operation.operator);
                main.innerText = operation.displayNumber;
                
            } 

        } else if(button.classList.contains('operator')) {
            if(operation.displayNumber != '' && operation.memory != '' && operation.operator != '') {

                operation.displayNumber = operate(operation.memory, operation.displayNumber, operator);
                operation.memory = '';
                main.innerText = operation.displayNumber;

            }

            operation.operator = this.innerText;
            operator.innerHTML = operation.operator;
            
        } else if(button.classList.contains('number')) {
            
            
            if(operation.displayNumber == '0') {
                if(this.innerText == '0') {
                    console.log('number 0: do nothing') //If 0 is shown in display and 0 button is pressed, then do nothing.
                    return;

                } else if(operation.displayNumber == '0' && this.innerText != '0') {
                    operation.displayNumber = ''; // If 0 is shown in display and a number button different from 0 is pressed then clear the display.
                }

            } else if(operation.operator != '') {
                    operation.memory = operation.displayNumber;
                    operation.displayNumber = '';
                    operation.operatorMemory = true;
                
            }

            operation.displayNumber += this.innerText;
            // operation.displayNumber = parseFloat(operation.displayNumber);
            main.innerText = operation.displayNumber;

            

        } else if(button.id == 'clear') {
           //newOperation();
        }
        console.table(operation);



    }))
        
}

buttonListener();