import { readFile } from 'fs/promises';
import { FILE_PATH, initialData } from './consts';
import { Data } from './interfaces';

export const getTodoList = async (): Promise<Data> => {
    try {
        const data = await readFile(FILE_PATH, { encoding: 'utf8' });

        return JSON.parse(data);
    } catch(e) {
        return initialData;
    }
}
