// ----------- Slot machine project-----------
// 1 - Deposit some money
// 2 - Determine number of lines to bet, the goal is to get 3 of the same symbol on a line
// 3 - Collect a bet amount
// 4 - Spin the slot machine
// 5 - Check if the player won
// 6 - Pay the player
// 7 - Repeat

const prompt = require('prompt-sync')(); // import prompt-sync module to use prompt

const deposit = () => {
    while (true) {
        const depositAmount = prompt("How much would you like to deposit?: ");
        const numberDepositAmount = parseFloat(depositAmount); // convert string to number

        if (isNaN(numberDepositAmount)) { // check if the input is a number
            console.log("Invalid input. Please try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const depositAmount = deposit();