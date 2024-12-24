#!/usr/bin/env tsx

import { Methods, MethodName } from './interfaces';
import { add, update, deleteBy, markInProgress, done, list } from './components';

const [method, arg1, arg2]: string[] = process.argv.slice(2);

const methods: Methods = {
    add,
    update,
    delete: deleteBy,
    'mark-in-progress': markInProgress,
    'mark-done': done,
    list
}

if (method in methods) {
    methods[method as MethodName](arg1, arg2);
} else {
    console.error(`Method ${method} is not supported.`);
}