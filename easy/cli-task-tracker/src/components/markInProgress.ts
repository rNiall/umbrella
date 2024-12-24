import { writeFile } from "fs/promises";
import { getTodoList } from "../services";
import { FILE_PATH } from "../consts";
import { logMessage } from "../utils";


export const markInProgress = async (taskID: string): Promise<void> => {
    const todolist = await getTodoList();

    if (!todolist.tasks[taskID]) {
        logMessage(`There is no ${taskID} ID`, 'red');
        process.exit();
    }

    const filteredInProgress = todolist.inProgress.filter((id: number) => id !== Number(taskID));
    const filteredTodos = todolist.todo.filter((id: number) => id !== Number(taskID));
    todolist.done.push(Number(taskID));
    todolist.inProgress = filteredInProgress;
    todolist.todo = filteredTodos;
    todolist.tasks[taskID].status = 'in-progress';

    await writeFile(FILE_PATH, JSON.stringify(todolist, null, 2));

    logMessage(`Task ID: ${taskID} successfully moved to in progress`, 'green');

    process.exit();
}