let first
let second
let op
let result
let expression

const buttons = document.querySelector(".buttons")
const span = document.querySelector(".display span")

const operators=[
    ["%","mod"],
    ["/","divide"],
    ["*","multiply"],
    ["-","sub"],
    ["+","add"]
];

const symbols=operators.map((op)=>op[0])

function add(a = first, b = second) {
    return Number(a) + Number(b);
}

function sub(a = first, b = second) {
    return Number(a) - Number(b);
}

function divide(a = first, b = second) {
    if (Number(b) === 0) return "Sacrilegious!!";
    return Number(a) / Number(b);
}

function multiply(a = first, b = second) {
    return Number(a) * Number(b);
}

function mod(a = first) {
    return Number(a) / 100;
}

const operations={add,sub,multiply,divide,mod}

function reset(toUpdate=true){
    first=undefined
    second=undefined
    op=undefined
    result=undefined
    expression='0'
    if(toUpdate){
        updateDisplay()
    }
}

function updateDisplay() {
    expression=expression.toString()
    if (expression === '0') {
        span.innerText = 0
    } else {
        if (expression.length > 11) {
            if(!expression.includes(".")){
                span.innerText = 'overflow!!'
            }else{
                expression=parseFloat(Number(expression).toFixed(6))
                span.innerText=expression
            }
        } else {
            span.innerText = expression
        }
    }
}

function numClicked(button){
    let maxLength=9
    if(expression.length>maxLength){
        return;
    }
    if(result){
        reset()
        expression=button.innerText
    }else{
        if(expression==='0'){
            expression=''
        }
        expression+=button.innerText
    }
    updateDisplay()
}

function dotClicked(button){
    let lastNumber = expression.split(/[\+\-\*\/]/).pop();
    if (lastNumber.includes(".")) {
        return;
    }
    let last = expression.at(-1)
    if(!Number.isNaN(Number(last))){
        expression+=button.innerText
        updateDisplay()
    }
}

function assignVar(opClicked = false) {
    expression = expression.toString();
    op = symbols.find((symbol) => expression.includes(symbol));

    if (!op) {
        first = expression;
    } else {
        let parts = expression.split(op);
        first = parts[0];
        second = parts[1];
    }

    if (opClicked) {
        eval();
        let tempFirst = result;
        reset();
        first = tempFirst;
    }
}


function operatorClicked(button){
    console.log("operatorClicked called with:", button.innerText);
    expression=expression.toString()
    let lastChar = expression.at(-1)
    let symbols = operators.map((op)=>op[0])
    let symbolFound=symbols.some((symbol)=>expression.includes(symbol))
    if(symbols.includes(lastChar)){
        return;
    }else if(symbolFound){
        assignVar(true)
        expression=first+button.innerText
    }else if(expression.at(-1)==='.'){
        expression+='0'
        expression+=button.innerText
    }else if(!Number.isNaN(Number(result))){
        let tempFirst=result
        reset()
        expression=tempFirst+button.innerText
        updateDisplay()
    }else if(!Number.isNaN(Number(lastChar))){
        expression+=button.innerText
    }
    op=button.innerText
    updateDisplay()
}


function eval() {
    if (first && second && op) {
        let operation = operators.find((operator) => operator[0] === op)[1];
        result = operations[operation](first, second);
        if (typeof result === "number") {
            result = parseFloat(result.toFixed(6));
        }
        expression = result.toString();
        updateDisplay();
    }
    else if(first && op==='%'){
        result=mod(first)
        expression = result.toString();
        updateDisplay();
    }
}


function AC(){
    reset()
    updateDisplay()
}

function C(){
    if(expression.length===1){
        expression=0
    }
    if(expression.length>1){
        expression=expression.slice(0,-1)
    }
    assignVar()
    updateDisplay()
}

function handleButton(button){
    if(!Number.isNaN(Number(button.innerText))){
        numClicked(button)
    }else if(button.innerText==='.'){
        dotClicked(button)
    }else if(button.classList.contains("operator")){
        operatorClicked(button)
    }else if(button.classList.contains("eval")){
        assignVar()
        eval()
    }else if(button.innerText==="AC"){
        AC()
    }else if(button.innerText==="C"){
        C()
    }
        console.log("first: "+first)
        console.log("second :"+second)
        console.log("op: "+op)
        console.log("expression: "+expression)
        console.log("result: "+result)
        console.log(" ")
}

buttons.addEventListener("click",(e)=>handleButton(e.target))

window.addEventListener("load",reset)
