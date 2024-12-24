# Task CLI

Sample solution for the [task-cli](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

## How to run

Clone the repository and run the setup script:

```bash
git clone https://github.com/rNiall/todo-cli.git
cd todo-cli
```

### Run the following command to add CLI to your terminal:
```bash
# Automatic setup for CLI. node.js required to be istalled

./setup.sh

# Or you can manually install

npm install # Only typescript libraries required
npm link # it wil link the main file for 'task-cli' shortcut

```

### Usage:

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```