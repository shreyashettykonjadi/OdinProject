let humanScore = 0
let computerScore = 0

function getComputerChoice() {
    let num = Math.random();
    let compChoice
    if (num < 1 / 3) {
        compChoice = "rock"
    } else if (num < 2 / 3) {
        compChoice = "paper"
    } else if (num < 1) {
        compChoice = "scissor"
    }
    return compChoice
}

function getHumanChoice() {

    return new Promise((resolve)=>{
        const choicesContainer=document.querySelector(".choicesContainer")
        choicesContainer.addEventListener("click",function(e){
            if(e.target.tagName==="BUTTON"){
                resolve(e.target.textContent)
            }
        });
    });
}

function playRound(humanChoice, computerChoice) {
    let result
    if (humanChoice == computerChoice) {
        result = "It's a tie"
    } else if (humanChoice == "rock") {
        if (computerChoice == "paper") {
            result = "Computer wins, paper beats rock"
            computerScore++
        } else if (computerChoice == "scissor") {
            result = "You win! rock beats scissor"
            humanScore++
        }
    } else if (humanChoice == "paper") {
        if (computerChoice == "rock") {
            result = "You win! paper beats rock"
            humanScore++
        } else if (computerChoice == "scissor") {
            result = "Computer wins, scissor beats paper"
            computerScore++
        }
    } else if (humanChoice == "scissor") {
        if (computerChoice == "paper") {
            result = "You win! scissor beats paper"
            humanScore++
        } else if (computerChoice == "rock") {
            result = "Computer wins, rock beats scissor"
            computerScore++
        }
    }
    return result;
}

async function playGame(){
    let finalResult
    do{
        const humanSelection = await getHumanChoice()
        const computerSelection = getComputerChoice()
        let result=playRound(humanSelection, computerSelection)
        displayRoundResult(result)
        displayScore()
        console.log(result)
    }while(humanScore!=5 && computerScore!=5);

    if(humanScore==5){
        finalResult="You win the game!! reload the page to try again"
        displayFinalResult(finalResult)
        console.log(finalResult)
    }else if(computerScore==5){
        finalResult="Computer wins the game reload the page to try again"
        displayFinalResult(finalResult)
        console.log(finalResult)
    }
}

function displayRoundResult(result){
    const roundResult=document.querySelector(".roundResult")
    const resultLine=document.querySelector(".roundResult p")
    resultLine.textContent=result
    roundResult.appendChild(resultLine)
}

function displayFinalResult(finalResult){
    const finalResultDiv=document.querySelector(".finalResultDiv")
    const finalLine=document.querySelector(".finalResultDiv p")
    finalLine.textContent=finalResult
    finalResultDiv.appendChild(finalLine)
}

function displayScore(){
    const humanScoreDiv=document.querySelector(".humanScore")
    const compScoreDiv=document.querySelector(".compScore")
    humanScoreDiv.textContent=`Player score: ${humanScore}`
    compScoreDiv.textContent=`Computer score: ${computerScore}`
}

playGame()
