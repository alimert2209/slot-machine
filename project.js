// ----------- Slot machine project-----------
// 1 - Deposit some money
// 2 - Determine number of lines to bet, the goal is to get 3 of the same symbol on a line
// 3 - Collect a bet amount
// 4 - Spin the slot machine
// 5 - Check if the player won
// 6 - Pay the player
// 7 - Repeat

const prompt = require('prompt-sync')(); // import prompt-sync module to use prompt



// ----------- GLOBAL VARIABLES ----------- //

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNTS = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
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

        if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines >= 3) { // 
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

    const reels = [[], [], []]; // each nested array is a column of slot machine

    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols]; // copy symbols array
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
        }
    }
    return reels;
};




const spinResult = spin();
let balance = deposit();
const numberOfLines = getNumberOfLines();
const betAmount = collectBetAmount(numberOfLines, balance);