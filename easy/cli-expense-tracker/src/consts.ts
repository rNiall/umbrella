export const FILE_PATHS = {
    temp: './expenses_temp.json',
    main: './expenses.json',
};

export const CONFIRMATION = [
    {
      name: 'Yes',
      value: true,
    },
    {
      name: 'No',
      value: false
    }
];

export const FORMATS = [
    {
      name: 'CSV',
      value: 'csv',
    },
]
  
export const CURRENCIES = [
    {
      name: 'USD',
      value: '$',
      description: 'United States Dollar'
    },
    {
      name: 'EUR',
      value: '€',
      description: 'Euro'
    },
    {
      name: 'JPY',
      value: '¥',
      description: 'Japanese Yen'
    },
    {
      name: 'GBP',
      value: '£',
      description: 'British Pound Sterling'
    }
]

export const CATEGORIES = [
    {
        name: 'Housing',
        value: 'housing',
        description: 'Rent or mortgage payments, property taxes, home insurance, and maintenance costs.'
    },
    {
        name: 'Utilities',
        value: 'utilities',
        description: 'Electricity, water, gas, internet, and phone services.'
    },
    {
        name: 'Transportation',
        value: 'transportation',
        description: 'Car payments, fuel, public transportation, insurance, and maintenance.'
    },
    {
        name: 'Food',
        value: 'food',
        description: 'Groceries, dining out, and takeout.'
    },
    {
        name: 'Healthcare',
        value: 'healthcare',
        description: 'Insurance premiums, medications, doctor visits, and other medical expenses.'
    },
    {
        name: 'Insurance',
        value: 'insurance',
        description: 'Health, auto, home, and life insurance.'
    },
    {
        name: 'Debt Repayment',
        value: 'debt_repayment',
        description: 'Credit card payments, student loans, and other personal loans.'
    },
    {
        name: 'Entertainment',
        value: 'entertainment',
        description: 'Movies, concerts, streaming services, and other leisure activities.'
    },
    {
        name: 'Clothing',
        value: 'clothing',
        description: 'Apparel and footwear purchases.'
    },
    {
        name: 'Education',
        value: 'education',
        description: 'Tuition, books, and other educational expenses.'
    },
    {
        name: 'Personal Care',
        value: 'personal_care',
        description: 'Haircuts, grooming products, and personal hygiene items.'
    },
    {
        name: 'Savings and Investments',
        value: 'savings_investments',
        description: 'Contributions to savings accounts, retirement funds, and other investments.'
    },
    {
        name: 'Childcare',
        value: 'childcare',
        description: 'Daycare, babysitting, and other child-related expenses.'
    },
    {
        name: 'Pets',
        value: 'pets',
        description: 'Food, veterinary care, and pet supplies.'
    },
    {
        name: 'Gifts and Donations',
        value: 'gifts_donations',
        description: 'Presents for others and charitable contributions.'
    },
    {
        name: 'Other',
        value: 'other',
        description: 'Something that not fit to the proposed categories'
    }
];
  
export const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];