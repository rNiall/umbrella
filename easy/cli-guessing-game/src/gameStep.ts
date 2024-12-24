import input from '@inquirer/input';
import { winnerASCII } from "./consts";
import { logMessage } from "./utils";

export const gameStep = async (toGuess: number, attempt: number, difficulty: number): Promise<boolean> => {
    logMessage(`${difficulty - attempt} chance(s) left`, 'cyan');
    const answer = await input({ 
        message: 'Enter your guess:',
        validate: (input) => {
            if (isNaN(parseInt(input))) {
                return 'Please enter a valid number.';
            }

            return true;
        }
    });

    const normalisedNumber = parseInt(answer);

    if (normalisedNumber > toGuess) {
        logMessage(`Incorrect! The number is less than ${normalisedNumber}.`, 'yellow');
    } else if (normalisedNumber < toGuess) {
        logMessage(`Incorrect! The number is greater than ${normalisedNumber}.`, 'yellow');
    } else if (normalisedNumber === toGuess) {
        logMessage(winnerASCII, 'green');
        logMessage(`Congratulations! You guessed the correct number in ${attempt + 1} attempts.`, 'green');

        return true;
    }

    return false;
}