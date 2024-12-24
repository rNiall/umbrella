import { atomicWrite, readExpenses } from "../DAL";
import { DeleteInput } from "../interfaces";
import { highlightAmountLeft } from "../shared";

export const deleteExpense = async (input: DeleteInput): Promise<void> => {
    try {
      const bucket = await readExpenses();
      const notmalisedID = Number(input.id);
      const indexToDelete = bucket.expenses.findIndex(({id}) => id === notmalisedID);

      if (indexToDelete === -1) {
        console.error(`There is no (ID: ${input.id}) to delete`);

        process.exit(1);
      } 
        
      bucket.expenses.splice(indexToDelete, 1);

      await atomicWrite(bucket);

      console.log(`Expense deleted successfully`);

      highlightAmountLeft(bucket);
    } catch (e) {
      console.error(`The following error occur during delete operation: ${JSON.stringify(e, null, 2)}`);
  
      process.exit(1);
    }
  }