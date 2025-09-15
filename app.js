const display = document.getElementById('result');
const buttons = document.querySelectorAll('button');


let currentInput = '';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;


const updateDisplay = (value) => {
    display.value = value || '0';
};


const clear = () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay('0');
};


const handleNumber = (number) => {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    currentInput = currentInput === '0' ? number : currentInput + number;
    updateDisplay(currentInput);
};


const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);
    
    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const currentValue = previousInput || 0;
        const newValue = calculate(currentValue, inputValue, operator);
        
        updateDisplay(String(newValue));
        previousInput = newValue;
    }
    
    shouldResetDisplay = true;
    operator = nextOperator;
};


const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case 'x':
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand !== 0 ? firstOperand / secondOperand : 0;
        case '%':
            return firstOperand % secondOperand;
        case 'log':
            return Math.log10(firstOperand);
        default:
            return secondOperand;
    }
};


const handleSpecialOperation = (operation) => {
    const inputValue = parseFloat(currentInput);
    let result;
    
    switch (operation) {
        case 'x²':
            result = Math.pow(inputValue, 2);
            break;
        case '√':
            result = inputValue >= 0 ? Math.sqrt(inputValue) : 'Error';
            break;
        case 'log':
            result = inputValue > 0 ? Math.log10(inputValue) : 'Error';
            break;
        default:
            result = inputValue;
    }
    
    updateDisplay(String(result));
    currentInput = String(result);
    shouldResetDisplay = true;
};


const handleEquals = () => {
    const inputValue = parseFloat(currentInput);
    
    if (previousInput !== '' && operator && !shouldResetDisplay) {
        const newValue = calculate(previousInput, inputValue, operator);
        updateDisplay(String(newValue));
        
        previousInput = '';
        operator = '';
        currentInput = String(newValue);
        shouldResetDisplay = true;
    }
};


buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        const buttonName = e.target.getAttribute('data-delete') !== null ? 'data-delete' :
                         e.target.getAttribute('data-opera') !== null ? 'data-opera' :
                         e.target.getAttribute('data-number') !== null ? 'data-number' :
                         e.target.getAttribute('data-igual') !== null ? 'data-igual' :
                         e.target.getAttribute('data-exponente') !== null ? 'data-exponente' :
                         e.target.getAttribute('data-raizcuadrada') !== null ? 'data-raizcuadrada' :
                         e.target.getAttribute('data-porcentaje') !== null ? 'data-porcentaje' : null;
        
        switch (buttonName) {
            case 'data-number':
                handleNumber(buttonText);
                break;
            case 'data-opera':
                if (buttonText === 'log') {
                    handleSpecialOperation('log');
                } else {
                    handleOperator(buttonText);
                }
                break;
            case 'data-delete':
                clear();
                break;
            case 'data-igual':
                handleEquals();
                break;
            case 'data-exponente':
                handleSpecialOperation('x²');
                break;
            case 'data-raizcuadrada':
                handleSpecialOperation('√');
                break;
            case 'data-porcentaje':
                handleOperator('%');
                break;
            default:
                console.log('Botón no reconocido:', buttonName);
        }
    });
});


document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleNumber(key);
            break;
        case '+':
        case '-':
        case '/':
        case '%':
            handleOperator(key);
            break;
        case '*':
            handleOperator('x');
            break;
        case 'Enter':
        case '=':
            handleEquals();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            clear();
            break;
        default:
           
            break;
    }
});


clear();

