#!/usr/bin/env node

import select from '@inquirer/select';
import { difficultyChoices, gameOverAscii, levels, playAgainChoices } from './consts';
import { logMessage } from './utils';
import { gameStep } from './gameStep';

const startGame = async () => {
    try {
        const startTime = Date.now();
        const difficulty = await select<number>({
            message: 'Please select difficulty level:',
            choices: difficultyChoices,
        });
        
        logMessage(`
Great! You have selected the ${levels[difficulty]} difficulty level.
Let's start the game!
Guess the number between 1 and 100.
        `, 'cyan');

        let guessed = false;
        const numberToGuess = Math.floor((Math.random() * 100) + 1);
        
        for (let i = 0; i < difficulty; i++) {
            guessed = await gameStep(numberToGuess, i, difficulty);

            if (guessed) {
                const secondsTook = (Date.now() - startTime) / 1000;
                logMessage(`It takes you ${secondsTook} sec to win the game`, 'cyan')

                break;
            }
        }

        if (!guessed) { 
            logMessage(`Sorry you used all your attempts.`, 'red'); 
            logMessage(gameOverAscii, 'red'); 
            logMessage(`The number was: ${numberToGuess}`, 'cyan');
        }

        // Ask if player wants to play again
        const playAgain = await select<boolean>({
            message: 'Do you want to play again?',
            choices: playAgainChoices,
        });

        if (playAgain) {
            startGame();
        }

        process.exit();
    } catch(e) {
        console.log('Error:', e);
        process.exit(1);
    }
}

startGame();
