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
    let humanChoice = prompt("Enter your choice - rock, paper or scissor")
    return humanChoice.toLowerCase()
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
            result = "You win, rock beats scissor"
            humanScore++
        }
    } else if (humanChoice == "paper") {
        if (computerChoice == "rock") {
            result = "You win, paper beats rock"
            humanScore++
        } else if (computerChoice == "scissor") {
            result = "Computer wins, scissor beats paper"
            computerScore++
        }
    } else if (humanChoice == "scissor") {
        if (computerChoice == "paper") {
            result = "You win, scissor beats paper"
            humanScore++
        } else if (computerChoice == "rock") {
            result = "Computer wins, rock beats scissor"
            computerScore++
        }
    }
    return result;
}

function playGame(){
    do{
        const humanSelection = getHumanChoice()
        const computerSelection = getComputerChoice()
        let result=playRound(humanSelection, computerSelection)
        console.log(result)
    }while(humanScore!=5 && computerScore!=5);

    if(humanScore==5){
        console.log("You win the game")
    }else if(computerScore==5){
        console.log("Computer wins the game")
    }
}


console.log(playGame());
