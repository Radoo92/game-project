let score = {
    user: 0,
    computer: 0
};

let history = [];

let choicesCount = {
    kameň: 0,
    papier: 0,
    nožnice: 0
};

function startGame() {
    alert("Hra začína!");
    let userChoice = prompt("Zadajte svoj výber: Kameň, Papier alebo Nožnice").toLowerCase();
    console.log("Užívateľ zadal: " + userChoice);
    if (userChoice === "kameň" || userChoice === "papier" || userChoice === "nožnice") {
        playGame(userChoice);
    } else {
        alert("Neplatný výber! Skúste to znova.");
    }
}

function playGame(userChoice) {
    let computerChoice = getComputerChoice();
    console.log("Výber počítača: " + computerChoice);
    let result = getResult(userChoice, computerChoice);
    alert("Váš výber: " + userChoice + "\nVýber počítača: " + computerChoice + "\n\n" + result);
    console.log("Výsledok: " + result);
    updateScore(result);
    updateChoicesCount(userChoice);
    updateHistory(userChoice, computerChoice, result);
}

function getComputerChoice() {
    let choices = ["kameň", "papier", "nožnice"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "Remíza!";
    } else if (
        (userChoice === "kameň" && computerChoice === "nožnice") ||
        (userChoice === "papier" && computerChoice === "kameň") ||
        (userChoice === "nožnice" && computerChoice === "papier")
    ) {
        return "Vyhrali ste!";
    } else {
        return "Prehrali ste!";
    }
}

function updateScore(result) {
    const userScore_span = document.getElementById("user-score");
    const computerScore_span = document.getElementById("computer-score");
    if (result === "Vyhrali ste!") {
        score.user++;
        userScore_span.innerHTML = score.user;
    } else if (result === "Prehrali ste!") {
        score.computer++;
        computerScore_span.innerHTML = score.computer;
    }
    console.log("Skóre - Užívateľ: " + score.user + ", Počítač: " + score.computer);
}

function updateChoicesCount(userChoice) {
    choicesCount[userChoice]++;
    console.log("Počet výberov - Kameň: " + choicesCount.kameň + ", Papier: " + choicesCount.papier + ", Nožnice: " + choicesCount.nožnice);
}

function updateHistory(userChoice, computerChoice, result) {
    history.push({
        user: userChoice,
        computer: computerChoice,
        result: result
    });
    console.log("História: ", history);
}