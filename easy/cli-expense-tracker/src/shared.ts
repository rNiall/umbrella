import { select } from '@inquirer/prompts';
import fs from 'fs/promises';
import { CATEGORIES, CURRENCIES, FILE_PATHS, monthNames } from './consts';
import { Dates, Expense, Expenses } from './interfaces';

const setup = async (): Promise<void> => {
    try {
      await fs.access(FILE_PATHS.main);
    } catch (e: any) {
      const answer = await select({ message: 'Select currencies', choices: CURRENCIES });
      
      await fs.writeFile(FILE_PATHS.main, JSON.stringify({ currency: answer, lastIndex: 0, limit: {}, expenses: [] }, null, 2));
    }
  }
  
export const setupMiddleware = async (action: any): Promise<any> => {
    return async function (...args: any) {
        await setup();

        return action(...args);
    }
}

export const selectCategories = async (): Promise<string> => {
    try {
        const category = await select({ message: 'Select category', choices: CATEGORIES });

        return category;
    } catch (e) {
        console.error(`Unable to choose category> Reason: ${JSON.stringify(e, null, 2)}`);

        process.exit(1)
    }
}

export const filterExpensesBy = (data: Expense[], month?: number, year?: number) => {
    return data.filter((expense) => {
        const date = new Date(expense.date);
        const isMonthMatch = !month || date.getMonth() === Number(month);
        const isYearMatch = year ? date.getFullYear() === Number(year) : year === date.getFullYear();

        return isMonthMatch && isYearMatch;
    });
}

export const calculateSum = (data: Expense[]) => data.reduce((sum: number, { amount }) => sum + amount, 0);

export const highlightAmountLeft = (bucket: Expenses): void => {
    const dates = getCurrentDates();
    const monthlyLimit = bucket.limit[dates.year][dates.month];

    if (monthlyLimit > 0) {
        const filtered = filterExpensesBy(bucket.expenses, dates.month, dates.year);
        const spent = calculateSum(filtered);

        console.log(`Specified limit for ${monthNames[dates.month]} ${dates.year}: ${monthlyLimit}${bucket.currency}. Budget left: ${monthlyLimit - spent}${bucket.currency}`);

        if (monthlyLimit - spent < 0) {
            console.warn('===========================================================================');
            console.warn(`You are out of your specified budget for ${monthNames[dates.month]} ${dates.year}`);
            console.warn('===========================================================================');
        }
    }
}

export const getCurrentDates = (date?: string): Dates  => {
    const today = date ? new Date(date) : new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    return {
      day,
      month,
      year,
      full: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }
}