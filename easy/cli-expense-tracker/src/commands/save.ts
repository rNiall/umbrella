import fs from 'fs/promises';
import { Expense } from "../interfaces";
import { readExpenses } from "../DAL";
import { ListParams } from "../interfaces";
import { getCurrentDates } from "../shared";
import { select } from "@inquirer/prompts";
import { FORMATS } from '../consts';
import { convertToCSV } from '../utils';

export const saveExpenses = async (params: ListParams): Promise<void> => {
    try {
        const records = await readExpenses();
        const format = await select({ message: 'Select saving format', choices: FORMATS });

        if (format === 'csv') {
            const { data, path } = convertToCSV(records.expenses);

            await fs.writeFile(path, data);

            console.log(`Expenses succesfully exported to csv`);
        }
    } catch(e) {
        console.error(`The following error happen during summarise operation: ${JSON.stringify(e)}`);

        process.exit(1);
    }
}