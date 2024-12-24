import { select, input } from "@inquirer/prompts";
import { CATEGORIES, CONFIRMATION, monthNames } from "../consts";
import { atomicWrite, readExpenses } from "../DAL";
import { AddInput } from "../interfaces";
import { getCurrentDates, highlightAmountLeft } from "../shared";

export const addExpense = async (inputParams: AddInput): Promise<void> => {
    try {
      const bucket = await readExpenses();
      const dates = getCurrentDates();
      bucket.lastIndex++;
      let category = 'other';

      if (inputParams.category) {
        category = await select({ message: 'Select category of expense', choices: CATEGORIES });
      }

      if (!bucket.limit[dates.year]) {
        bucket.limit[dates.year] = new Array(12).fill(0);
      }

      const monthlyLimit = bucket.limit[dates.year][dates.month];
      if (!monthlyLimit && monthlyLimit !== -1) {
        const isBudgetRequired = await select({ message: `Do you want to set budget for ${monthNames[dates.month]} ${dates.year}`, choices: CONFIRMATION });

        if (isBudgetRequired) {
            const budget = await input({ message: `Enter budget in ${bucket.currency}` });
            const amount = Number(budget);

            bucket.limit[dates.year][dates.month] = !isNaN(amount) && isFinite(amount) && amount || 0;

            console.log(`Budget for ${monthNames[dates.month]} ${dates.year} set to ${bucket.currency}${amount}`);
        } else {
            bucket.limit[dates.year][dates.month] = -1;
        }
      }
      
      bucket.expenses.push({
        id: bucket.lastIndex,
        description: inputParams.description,
        amount: Number(inputParams.amount),
        category,
        date: dates.full,
      });

      await atomicWrite(bucket);
      
      console.log(`Expense added successfully (ID: ${bucket.lastIndex})`);
      
      highlightAmountLeft(bucket);
    } catch (e) {
      console.error(`The following error occur during add new expense operation: ${JSON.stringify(e, null, 2)}`);
  
      process.exit(1);
    }
  }