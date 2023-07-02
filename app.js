function operate(a, b, operator) {
    
    switch (operator) {
        case '+':
            return String(parseFloat(a) + parseFloat(b));
            // break;

        case '-':
            return String(parseFloat(a) - parseFloat(b));
            // break;

        case '*':
            return String(parseFloat(a) * parseFloat(b));
            // break;

        case '/':
            return String(parseFloat(a) / parseFloat(b));
            // break;

    }
}

const buttons = document.querySelectorAll('.button');
const operator = document.querySelector('#operator');
const main = document.querySelector('#main');
const memoryDisplay = document.querySelector('#memory');

let operation = {
    displayNumber: 0,
    memory: '',
    operator: '',
    operatorToken: false,
    equalToken: false,
    lastPressed: '',
    //equalMemory: '',
    
}

let newOperation = () => {
    operation = {
        displayNumber: '0',
        memory: '',
        operator: '',
        operatorToken: false,
        equalToken: false,
        lastPressed: '',
        //equalMemory: '',
    }

    main.innerText = operation.displayNumber;
    operator.innerText = operation.operator;
    memory.innerText = operation.memory;
}

main.innerText = operation.displayNumber;

function buttonListener(){
    buttons.forEach(button => button.addEventListener('click', function() {

       
        if (button.id == 'clear') {
            newOperation();
        
        } else if(button.classList.contains('number')) {
            if(operation.displayNumber == '0'/*ver luego la condicion que puede aparecer aqui con algun token */) {
                operation.displayNumber = this.innerText;
                main.innerText = operation.displayNumber;

            } else {
                operation.displayNumber += this.innerText;
                main.innerText = operation.displayNumber;
            }
            operation.lastPressed = this.innerText;

        }else if (button.id == 'posneg') {
            //if number in display is 0 then posneg does nothing
            if (operation.displayNumber == '0') {
                console.log('do nothing');

            } else if (operation.displayNumber.includes('-')) {
                operation.displayNumber = operation.displayNumber.slice(1);
                main.innerText = operation.displayNumber;

            } else {
                operation.displayNumber = '-' + operation.displayNumber;
                main.innerText = operation.displayNumber;
            }
            operation.lastPressed = this.innerText;

        } else if (button.id == 'backspace') { //recordar poner una condicion para hacer una nueva operacion en caso amerite
            if(operation.displayNumber == '0') {
                console.log('do nothing');
            //si hay un solo numero en display o un negativo de un solo digito, el display pasa a 0    
            } else if (operation.displayNumber.length == 1 || (operation.displayNumber.includes('-') && operation.displayNumber.length == 2)) {
                operation.displayNumber = '0';
                main.innerText = operation.displayNumber;

            } else {
                operation.displayNumber = operation.displayNumber.slice(0,-1);
                main.innerText = operation.displayNumber;
            }
            operation.lastPressed = this.innerText;

        } else if (button.id == 'clear') {
            newOperation();
            operation.lastPressed = this.innerText;
        
        } else if (button.id == 'dot') {
            if (operation.displayNumber.includes('.')) {
                console.log('dot, do nothing');

            } else {
                operation.displayNumber += this.innerText;
                main.innerText = operation.displayNumber;

            }
            operation.lastPressed = this.innerText;

        } else if (button.classList.contains('operator')) {
            
            if (operation.operatorToken == false) {
                operation.operatorToken = true;
                operation.memory = operation.displayNumber;
                operation.displayNumber = '';
                main.innerText = operation.displayNumber;
                memory.innerText = operation.memory;
            }

            operation.operator = this.innerText;
            operator.innerText = operation.operator;
            operation.lastPressed = this.innerText;

        } else if (button.id == 'equal') {
            if (operation.displayNumber == '' || operation.displayNumber == '' || operation.operator == '') {
                console.log('do nothing')
            } else {
                memory.innerText = `${operation.memory} ${operation.operator} ${operation.displayNumber} =`
                operation.displayNumber = operate(operation.memory, operation.displayNumber, operation.operator);
                main.innerText = operation.displayNumber;
                operation.memory = '';
                operation.operatorToken = false;
                operation.operator = '';
                operator.innerText = operation.operator;
            }

            
        }

        console.table(operation);

    }))
        
}

buttonListener();