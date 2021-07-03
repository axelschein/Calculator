const numberBtns = document.querySelectorAll(".num"); 
const operator = document.querySelectorAll(".operator");
//const dot = document.querySelector(".dot"); dot.addEventListener('click', () => {console.log(dot.textContent)}, false);
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

// Reemplazo el * por la x-----------------------------------------------------------------------------------------------------
function operatorDefine(i) {
    
    if (i === "*") {
        operatorText.innerText = "x" ;
    } else {
        operatorText.innerText = i;
    }
}
// OPERACION----------------------
function operators(){  
    operator.forEach(button => { 
        button.addEventListener('click', () => {
            const oper = button.dataset.value;
            operatorDefine(oper);
            if (operationResult != null && num == null) {// en caso de querer usar el resultado de la operacion como mi primer valor
                console.log('yilt');
                return firstNumberUp(operationResult);
                
            } else if (num != null && num1 != null && operationResult != null) {// en caso de querer arrancar una nueva cuenta resetear todo
                operationResult=null;
                console.log('colot')
                return firstNumberUp(num);
                
            } else {
                
                return firstNumberUp(num);
            }
                      
            
        })
    })
}
// TOMO LOS NUMEROS
function numbers() {
    numberBtns.forEach(button => { 
        button.addEventListener('click', () => {
            
            updateNumValue(button.dataset.value)
            print(num);//aca num esta definido
        })
    })
}
function updateNewNumValue(value){//tengo que hacer una nueva funcion igual a esta porque me imprime el numero 2 de la pasada cuenta
    
    const currentNums = num ; 
    const newValues = currentNums + value; 
    num = newValues; 
} 
function updateNumValue(value){//tengo que hacer una nueva funcion igual a esta porque me imprime el numero 2 de la pasada cuenta
    const currentNum = num ? num.toString() : ""; 
    const newValue = currentNum + value; 
    num = newValue; //le saque el Number() porque me redondea cuanto es un numero y un punto (5. = 5)
} 

function print (i){
    currentValueText.innerText = i;
}

// Clear y delete ----------------------------------------------------------------

function clear(){
    acButton.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    num = null;
    
    currentValueText.innerText = "";
    previousValueText.innerText = "";
    operatorText.innerText = "";
    }, false);
}
function del(){
    deleteButton.addEventListener('click', () => {
        
        num = num.toString().slice(0,-1);      
        print();
    }, false);
}
// Subo  al div de arriba el primer numero de la operacion
function firstNumberUp(i) {
    previousValueText.innerText = i;
    currentValueText.innerText = "";
    num = null;
}
// Asigno los numeros
function defineNumber() { //defino el numero aca
    
    num1 = Number(previousValueText.innerText);
    num2 = Number(currentValueText.innerText);
    
}
// Defino el Calculo----------------------------------------------
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
        console.log(num)
        console.log(num1)
        console.log(num2)
        //previousValueText.innerText = num1 + operatorText.innerText + num2 + equal.innerText;
        //operatorText.innerText = "=";
        const totalOperation = num1 + operatorText.innerText + num2 + equal.innerText + operationResult;
        previousValueText.innerHTML = "";
        num2=null;
        num1=null;
        num=null;
        console.log(num)
        console.log(num1)
        console.log(num2)
        
        
        history(totalOperation)
    }, false);

}
//historia de todas las operaciones
function history(i) {

    const li = document.createElement('LI')
    li.textContent = i;
    const ul = document.getElementById('operations__history');
    ul.appendChild(li);

}
calculate();

// llamo a nueva clase Calculate que tiene todas las operaciones
const calculator = new Calculate(num1, num2);
