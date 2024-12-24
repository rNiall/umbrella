import fs from 'fs/promises';
import { FILE_PATHS } from "./consts";
import { Expenses } from "./interfaces";

export const readExpenses = async (): Promise<Expenses> => {
    try {
      const expenses = JSON.parse(await fs.readFile(FILE_PATHS.main, 'utf-8'));
  
      return expenses;
    } catch(e) {
      console.error(`The following error occur when reading expenses: ${JSON.stringify(e, null, 2)}`);
  
      process.exit(1);
    }
}

export const cleanUp = async (): Promise<void> => {
    try {
      await fs.unlink(FILE_PATHS.temp);
    } catch(unlinkError) {
      console.error('Error cleaning up temp file:', unlinkError);
    }
}

export const atomicWrite =  async (data: Expenses): Promise<void> => {
  try {
    await fs.writeFile(FILE_PATHS.temp, JSON.stringify(data, null, 2));
    await fs.rename(FILE_PATHS.temp, FILE_PATHS.main);
  } catch(e) {
    console.error(`Write operation failed. Reason: ${JSON.stringify(e, null, 2)}`);

    await cleanUp();
  }
}