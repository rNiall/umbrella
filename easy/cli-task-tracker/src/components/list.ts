import { Data, Lists } from "../interfaces";
import { getTodoList } from "../services";
import { logMessage } from "../utils";

type ListKey = keyof Lists;

const mapper: { [key: string]: ListKey } = {
    'in-progress': 'inProgress',
    done: 'done',
    todo: 'todo',
}
export const list = async (status: string|null): Promise<void> => {
    const todolist: Data = await getTodoList();

    if (todolist.lastIndex === 0) {
        logMessage('There is no todos yet created', 'red');

        process.exit();
    }

    let tasks = [];

    if (!status) {
        tasks = Object.values(todolist.tasks);
    } else {
        const key: ListKey = mapper[status];
        
        for (let taskId of todolist[key]) {
            tasks.push(todolist.tasks[taskId]);
        }
    }
    
    logMessage(`${tasks.length} messeges found`, 'green');
    
    if (tasks.length > 0) {
        console.table(tasks);
    }

    process.exit();
}