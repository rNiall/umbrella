import { Data, Task } from "./interfaces";

  type ColorsENUM = 'red' | 'green' | 'cyan' | 'yellow' | 'white';
  type Colors = {
    [key in ColorsENUM]: number;
  }

  const colors: Colors = {
    red: 31,
    green: 32,
    yellow: 33,
    cyan: 36,
    white: 37
  };

export const logMessage = (message: string, colorCode: ColorsENUM): void => {
    const resetCode = '\x1b[0m'; // Reset color
    const colorStartCode = `\x1b[${colors[colorCode]}m`;

    console.log(colorStartCode + message + resetCode);
}

export const addTodolist = (todos: Data, message: string): Data => {
    const currentDate = new Date().toDateString();
    const nextID = todos.lastIndex + 1;
    const taskData: Task = {
        id: nextID,
        description: message,
        status: 'todo',
        createdAt: currentDate,
        updatedAt: currentDate,
    } 

    todos.lastIndex = nextID;
    todos.tasks[nextID] = taskData;
    todos.todo.push(todos.lastIndex);

    return todos;
}
  