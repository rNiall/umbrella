import { Expense } from "./interfaces";
import { getCurrentDates } from "./shared";

export const convertToCSV = (expenses: Expense[]): { data: string, path: string } => {
    const dates = getCurrentDates();
    const header = ['ID', 'AMOUNT', 'DATE', 'CATEGORY', 'DESCRIPTION' ];

    const rows = expenses.map(expense => [
      expense.id,
      expense.amount,
      expense.date,
      `"${expense.category.replace(/"/g, '""')}"`,
      `"${expense.description.replace(/"/g, '""')}"`,
    ]);
  
    return { 
        data: [header, ...rows].map(row => row.join(',')).join('\n'), 
        path: `./expenses_${dates.full}.csv` 
    }
  };
