import { writeFile } from "fs/promises";
import { getTodoList } from "../services";
import { FILE_PATH } from "../consts";
import { logMessage } from "../utils";


export const deleteBy = async (taskID: string): Promise<void> => {
    const todolist = await getTodoList();

    if (!todolist.tasks[taskID]) {
        logMessage(`There is no ${taskID} ID`, 'red');
        process.exit();
    }

    delete todolist.tasks[taskID]
        
    await writeFile(FILE_PATH, JSON.stringify(todolist, null, 2));

    logMessage(`The message with (ID: ${taskID}) successfully deleted`, 'green');

    process.exit();
}