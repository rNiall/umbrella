export const winnerASCII = `
__     ______  _    _  __          _______ _   _ 
\\ \\   / / __ \\| |  | | \\ \\        / /_   _| \\ | |
 \\ \\_/ / |  | | |  | |  \\ \\  /\\  / /  | | |  \\| |
  \\   /| |  | | |  | |   \\ \\/  \\/ /   | | | . \` |
   | | | |__| | |__| |    \\  /\\  /   _| |_| |\\  |
   |_|  \\____/ \\____/      \\/  \\/   |_____|_| \\_|
`;

export const gameOverAscii = `
 ____                          ___                 
/ ___|  __ _ _ __ ___   ___   / _ \\__   _____ _ __ 
| |  _ / _\` | '_ \` _ \\ / _ \\ | | | \\ \\ / / _ \\ '__|
| |_| | (_| | | | | | |  __/ | |_| |\\ V /  __/ |   
\\____|\\__,_ |_| |_| |_|\\___|  \\___/  \\_/ \\___|_|   
`;

export const levels: {[key: number]: string} = {
    10: 'Easy',
    5: 'Medium',
    3: 'Hard'
}

export const difficultyChoices = [
    {
        value: 10,
        name: 'Easy (10 chances)' 
    },
    {
        value: 5,
        name: 'Medium (5 chances)'
    },
    {
        value: 3,
        name: 'Hard (3 chances)'
    }
];

export const playAgainChoices = [
    {
        value: true,
        name: 'Yes' 
    },
    {
        value: false,
        name: 'No'
    }
]