#!/usr/bin/env tsx

import { Command } from 'commander';
import { setupMiddleware } from './shared';
import { addExpense } from './commands/add';
import { listExpenses } from './commands/list';
import { summaryExpenses } from './commands/summary';
import { deleteExpense } from './commands/delete';
import { saveExpenses } from './commands/save';

const program = new Command();

program
  .name('expense tracker cli')
  .description('CLI to track expenses and get insights about them')
  .version('0.1.0');


///////////////////////////////////////////////////////////
/////////////////////////// ADD ///////////////////////////
///////////////////////////////////////////////////////////

program.command('add')
  .description('Add an expense')
  .option('-d, --description <string>', 'expense description', '')
  .option('-c, --category', 'expense category')
  .requiredOption('-a, --amount <number>', 'amount of expense')
  .action(await setupMiddleware(addExpense));

///////////////////////////////////////////////////////////
////////////////////////// LIST ///////////////////////////
///////////////////////////////////////////////////////////

program.command('list')
  .description('List expenses')
  .option('-m, --month <number>', 'list expenses for month')
  .option('-y, --year <number>', 'list expenses for year')
  .option('-c, --category', 'category')
  .action(await setupMiddleware(listExpenses));

///////////////////////////////////////////////////////////
//////////////////////// SUMMARY //////////////////////////
///////////////////////////////////////////////////////////

program.command('summary')
  .description('Summary for expense')
  .option('-m, --month <number>', 'summarise expenses for month')
  .option('-y, --year <number>', 'summarise expenses for year')
  .option('-c, --category', 'category')
  .action(await setupMiddleware(summaryExpenses));

///////////////////////////////////////////////////////////
//////////////////////// DELETE //////////////////////////
///////////////////////////////////////////////////////////

program.command('delete')
  .description('Delete by ID')
  .requiredOption('--id <number>', 'id to delete')
  .action(await setupMiddleware(deleteExpense));

///////////////////////////////////////////////////////////
//////////////////////// DELETE //////////////////////////
///////////////////////////////////////////////////////////

program.command('save')
  .description('Save to different formats')
  .action(await setupMiddleware(saveExpenses));

program.parse();