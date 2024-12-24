import { monthNames } from "../consts";
import { readExpenses } from "../DAL";
import { ListParams } from "../interfaces";
import { getCurrentDates, selectCategories } from "../shared";


export const summaryExpenses = async (params: ListParams): Promise<void> => {
    try {
        const records = await readExpenses();
        const { year } = getCurrentDates();
        let category = '';

        if (params.category) {
            category = await selectCategories();
        }

        let toCalculate = records.expenses;

        if (params.month || params.year || category) {
            console.log(`Summarise expenses for ${params.month ? monthNames[Number(params.month) - 1] : ''} ${params.year || year}`);

            toCalculate = records.expenses.filter((expense) => {
                const date = new Date(expense.date);
                const isMonthMatch = !params.month || date.getMonth() + 1 === Number(params.month);
                const isYearMatch = params.year ? date.getFullYear() === Number(params.year) : year === date.getFullYear();
                const isCategoryMatch = !category || category === expense.category;

                return isMonthMatch && isYearMatch && isCategoryMatch;
            });
        } else {
            console.log(`Summarise all expenses`);
        }

        const total = toCalculate.reduce((sum, { amount }) => sum + amount, 0);
        
        console.log(`Total amount: ${records.currency}${total}`);
    } catch(e) {
        console.error(`The following error happen during summarise operation: ${JSON.stringify(e)}`);

        process.exit(1);
    }
}
  
  