// ----------- Slot machine project-----------
// 1 - Deposit some money 🆗
// 2 - Determine number of lines to bet, the goal is to get 3 of the same symbol on a line 🆗
// 3 - Collect a bet amount per line 🆗
// 4 - Spin the slot machine 🆗
// 5 - Check if the player won 
// 6 - Pay the player
// 7 - Repeat

const prompt = require('prompt-sync')(); // import prompt-sync module to use prompt



// ----------- GLOBAL VARIABLES ----------- //

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNTS = {
    "🍒": 2,
    "🍊": 4,
    "🍇": 6,
    "🍏": 8
}

const SYMBOLS_VALUES = {
    "🍒": 5,
    "🍊": 4,
    "🍇": 3,
    "🍏": 2
}




const deposit = () => {
    while (true) {
        const depositAmount = prompt("How much would you like to deposit?: ");
        const numberDepositAmount = parseFloat(depositAmount); // convert string to number

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { // check if the input is a number and greater than 0
            console.log("Invalid input. Please try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("How many lines would you like to bet? (1-3): ");
        const numberOfLines = parseFloat(lines); // convert string to number

        if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) { // 
            console.log("Invalid line. Please try again.");
        } else {
            return numberOfLines;
        }
    }
};

const collectBetAmount = (numberOfLines, balance) => {
    while (true) {
        const bet = prompt("How much would you like to bet per lines?: ");
        const numberOfBet = parseFloat(bet); // convert string to number

        if (isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet >= balance / numberOfLines) {
            console.log("Invalid bet. Please try again.");
        } else {
            return numberOfBet;
        }
    }
};

const spin = () => {
    const symbols = []

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNTS)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];

    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; // copy symbols array
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
        }
    }
    return reels;
};

const transposed = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printReels = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i < row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
};



let balance = deposit();
const lines = getNumberOfLines();
const bet = collectBetAmount(lines, balance);
const reels = spin();
const rows = transposed(reels);
printReels(rows);
const winnings = getWinnings(rows, bet, lines);
console.log(`\nYou won ${winnings}!`);