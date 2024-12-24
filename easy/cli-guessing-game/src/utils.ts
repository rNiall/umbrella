type ColorsENUM = 'red' | 'green' | 'cyan' | 'yellow' | 'white';
type Colors = {
  [key in ColorsENUM]: number;
}

const colors: Colors = {
  red: 31,
  green: 32,
  yellow: 33,
  cyan: 36,
  white: 37
};

export const logMessage = (message: string, colorCode: ColorsENUM): void => {
  const resetCode = '\x1b[0m';
  const colorStartCode = `\x1b[${colors[colorCode]}m`;

  console.log(' ');
  console.log(colorStartCode + message + resetCode);
}