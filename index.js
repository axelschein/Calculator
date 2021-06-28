const numberBtns = document.querySelectorAll(".num"); 
const operator = document.querySelectorAll(".operator");
// const dot = document.querySelector(".dot"); dot.addEventListener('click', () => {console.log(dot.textContent)}, false);
const deleteButton = document.querySelector(".delete"); 
const acButton = document.querySelector(".ac"); 
const equal = document.querySelector(".equal"); 
const operatorText = document.querySelector(".display__operator");
const previousValueText = document.querySelector(".display__previous-values");
const currentValueText = document.querySelector(".display__current-values");
let num1 = null;
let num2 = null;
let num = null;
let result = null;
let operationResult = null;

numbers();

operators();
del();
clear();

// pasar a las funciones los parametros para asi evitar declarar funciones dentro de otras 

// DEFINO LA OPERACION-----------------------------------------------------------------------------------------------------
function operatorDefine(i) {
    
    if (i === "*") {
        operatorText.innerText = "x" ;
    } else {
        operatorText.innerText = i;
    }
}
function operators(){  
    operator.forEach(button => { 
        button.addEventListener('click', () => {
            const oper = button.dataset.value;
            operatorDefine(oper);
            if (operationResult != null) {
                
                return firstNumberUp(operationResult);
                
            } else {
                
                return firstNumberUp(num);
            }
            
            
            
            // if (oper === "*") {
            //     operatorText.innerText = "x" ;
            // } else {
            //     operatorText.innerText = oper;
            // }
            //asigno el nuevo num al resultado de la cuenta
            
            
        })
    })
}
// TOMO LOS NUMEROS
function numbers() {
    numberBtns.forEach(button => { 
        button.addEventListener('click', () => {
            
            updateNumValue(button.dataset.value)
            print(); //aca num esta definido
        })
    })
}

function updateNumValue(value){
    const currentNum = num ? num.toString() : " "; // condicional ternario 
    const newValue = currentNum + value; 
    num = Number(newValue)

} 

function print (){
    return currentValueText.innerText = num ;
}

// Clear y delete ----------------------------------------------------------------

function clear(){
    acButton.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    //currentNum = "";
    //previousNum = "";
    currentValueText.innerText = " ";
    previousValueText.innerText = " ";
    operatorText.innerText = "";
    }, false);
}
function del(){
    deleteButton.addEventListener('click', () => {
        
        num1 = num1.toString().slice(0,-1);      
        print();
    }, false);
}
// Subo  al div de arriba el primer numero de la operacion
function firstNumberUp(i) {
    previousValueText.innerText = i;
    currentValueText.innerText = " ";
    num = null;
}
// Asigno los numeros
function defineNumber() {
    // operationResult ? num.toString() : ; // condicional ternario que asigna el resultado de la operacion como el nuevo num1
    // const newValue = currentNum + value; 
    // num = Number(newValue)
    num1 = Number(previousValueText.innerText);
    num2 = Number(currentValueText.innerText);
}
// Calculo----------------------------------------------
function calculate () {
    equal.addEventListener('click', () => {
        defineNumber()            
        switch (operatorText.innerText) {
            case "+":
                operationResult = calculator.add(num1,num2);
                currentValueText.innerText = operationResult
                break;
            case "-":
                operationResult = calculator.subtract(num1,num2);
                currentValueText.innerText = operationResult
                break;
            case "x":
                operationResult = calculator.multiply(num1,num2);
                currentValueText.innerText = operationResult
                break;
            case "÷":
                operationResult = calculator.divide(num1,num2);
                currentValueText.innerText = operationResult
                break;
        
            default:
                console.log('default')
                break;
        }
        
        previousValueText.innerText = num1 + operatorText.innerText + num2 + equal.innerText;
        operatorText.innerText = "=";
        
        
    }, false);

}

calculate();

// llamo a nueva clase Calculate que tiene todas las operaciones
const calculator = new Calculate(previousValueText.innerText, currentValueText.innerText);
