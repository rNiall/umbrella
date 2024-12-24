export interface Methods {
    add: (task: string) => void;
    update: (taskId: string, taskUpdate: string) => void;
    delete: (taskId: string) => void;
    'mark-in-progress': (taskId: string) => void;
    'mark-done': (taskId: string) => void;
    list: (status: string|null) => void;
}

export type MethodName = keyof Methods;

export interface Task {
    id: number;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface Lists {
    inProgress: number[];
    todo: number[];
    done: number[];
}

export interface Data extends Lists {
    lastIndex: number;
    tasks: { [key: string]: Task };
}

