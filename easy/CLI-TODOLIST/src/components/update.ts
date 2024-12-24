import { writeFile } from "fs/promises";
import { getTodoList } from "../services";
import { FILE_PATH } from "../consts";
import { logMessage } from "../utils";


export const update = async (taskID: string, taskMessage: string): Promise<void> => {
    const todolist = await getTodoList();

    if (!todolist.tasks[taskID]) {
        logMessage(`There is no ${taskID} ID`, 'red');
        process.exit();
    }
    const previous = todolist.tasks[taskID].description;

    todolist.tasks[taskID].description = taskMessage;
    todolist.tasks[taskID].updatedAt = new Date().toDateString();
        
    await writeFile(FILE_PATH, JSON.stringify(todolist, null, 2));

    logMessage(`Task updated successfully (ID: ${taskID})`, 'green');
    console.table([{ previous, new: taskMessage  }])

    process.exit();
}