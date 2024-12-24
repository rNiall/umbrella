# Task CLI

Sample solution for the [expense-tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

## How to run

Clone the repository and run the setup script:

```bash
git clone https://github.com/rNiall/expense-tracker-cli.git
cd expense-tracker-cli
```

### Run the following command to add CLI to your terminal:
```bash
# Automatic setup for CLI. node.js required to be istalled

./setup.sh

# Or you can manually install

npm install # Only typescript libraries required
npm link # it wil link the main file for 'expense-tracker' shortcut

```

### Usage:

```bash
$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)

$ expense-tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: 2)

$ expense-tracker add --description "Breakfast" --amount 22 --category
# Expense added successfully (ID: 3)

$ expense-tracker list
# ID  Date       Description  Amount  Category
# 1   2024-12-20  Lunch        $20      Other
# 2   2024-12-20  Dinner       $10      Other
# 3   2024-12-20  Breakfast    $22      Food

$ expense-tracker list --month 12
# ID  Date       Description  Amount  Category
# 1   2024-12-20  Lunch        $20      Other
# 2   2024-12-20  Dinner       $10      Other
# 3   2024-12-20  Breakfast    $22      Food

$ expense-tracker list --year 2024 --month 12 --category
# ID  Date       Description  Amount  Category
# 1   2024-12-20  Lunch        $20      Other
# 2   2024-12-20  Dinner       $10      Other
# 3   2024-12-20  Breakfast    $22      Food

$ expense-tracker summary
# Total expenses: $52

$ expense-tracker summary --month 12
# Total expenses: $52

$ expense-tracker summary --year 2024 --month 12
# Total expenses: $52

$ expense-tracker summary --year 2024 --month 12 --category
# Food
# Total expenses: $22

$ expense-tracker delete --id 2
# Expense deleted successfully

$ expense-tracker save
# Expenses succesfully exported to csv
```