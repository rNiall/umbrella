import { writeFile } from "fs/promises";
import { getTodoList } from "../services";
import { FILE_PATH } from "../consts";
import { logMessage, addTodolist } from "../utils";


export const add = async (task: string): Promise<void> => {
    const todolist = await getTodoList();
    const newTodos = addTodolist(todolist, task);
        
    await writeFile(FILE_PATH, JSON.stringify(newTodos, null, 2));

    logMessage(`Task added successfully (ID: ${newTodos.lastIndex})`, 'green');

    process.exit();
}