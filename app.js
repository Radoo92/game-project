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
    let userChoice = prompt("Zadajte svoj výber: Kamen, Papier alebo Noznice").toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    console.log("Užívateľ zadal: " + userChoice);
    if (userChoice === "kamen" || userChoice === "papier" || userChoice === "noznice") {
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
    let choices = ["kamen", "papier", "noznice"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "Remíza!";
    }

    if (
        (userChoice === "kamen" && computerChoice === "noznice") ||
        (userChoice === "papier" && computerChoice === "kamen") ||
        (userChoice === "noznice" && computerChoice === "papier")
    ) {
        return "Vyhrali ste!";
    }

    return "Prehrali ste!";
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

    if (score.user === 3) {
        alert("Vyhrali ste hru!");
        resetGame();
        return
    } else if (score.computer === 3) {
        alert("Prehrali ste hru!");
        resetGame();
        return
    }
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

    const historyTable = document.getElementById("history-table");
    const newRow = historyTable.insertRow();

    const roundCell = newRow.insertCell();
    const userCell = newRow.insertCell();
    const computerCell = newRow.insertCell();
    const resultCell = newRow.insertCell();

    roundCell.textContent = history.length;
    userCell.textContent = userChoice;
    computerCell.textContent = computerChoice;
    resultCell.textContent = result;
}

function resetGame() {
    score.user = 0;
    score.computer = 0;
    history = [];

    const userScore_span = document.getElementById("user-score");
    const computerScore_span = document.getElementById("computer-score");
    const historyTable = document.getElementById("history-table");

    userScore_span.innerHTML = score.user;
    computerScore_span.innerHTML = score.computer;
    historyTable.innerHTML = "";
}