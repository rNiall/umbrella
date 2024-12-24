import { monthNames } from "../consts";
import { readExpenses } from "../DAL";
import { ListParams } from "../interfaces";
import { getCurrentDates, selectCategories } from "../shared";


export const listExpenses = async (params: ListParams): Promise<void> => {
    try {
        const records = await readExpenses();
        const { year } = getCurrentDates();
        let category = '';

        if (params.category) {
            category = await selectCategories();
        }

        let toShow = records.expenses;

        if (params.month || params.year || params.category) {
            console.log(`Showing expenses for ${params.month ? monthNames[Number(params.month) - 1] : ''} ${params.year || year}`);

            toShow = records.expenses.filter((expense) => {
                const date = new Date(expense.date);
                const isMonthMatch = !params.month || date.getMonth() + 1 === Number(params.month);
                const isYearMatch = params.year ? date.getFullYear() === Number(params.year) : year === date.getFullYear();
                const isCategoryMatch = !category || category === expense.category;

                return isMonthMatch && isYearMatch && isCategoryMatch;
            });
        } else {
            console.log(`Showing all expenses`);
        }

        console.table(toShow);
    } catch(e) {
        console.error(`The following error happen during listing operation: ${JSON.stringify(e)}`);

        process.exit(1);
    }
}
  
  