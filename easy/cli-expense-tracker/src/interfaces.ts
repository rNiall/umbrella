export interface Dates {
    day: number;
    month: number;
    year: number;
    full: string;
  }
  
export interface ListParams {
    month?: string;
    year?: string;
    category?: boolean;
}

export interface AddInput {
    category: boolean;
    description: string;
    amount: string;
}

export interface Expense {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
}

export interface Limit {
    [key: number]: number[];
}
  
export interface Expenses {
    currency: string;
    lastIndex: number;
    expenses: Expense[]
    limit: Limit;
}

export interface DeleteInput {
    id: string;
}