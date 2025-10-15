// indexing into types using their keys

type Payment = {
    customerName: string;
    paymentType: 'cash' | 'card' | 'check';
}

type PaymentType = Payment['paymentType']


// using the KEYOF operator returns a union type of the keys of an object

type PaymentKeys = keyof Payment


// using the TYPEOF operator at compile time returns the type of a const value

const payment = {
    customerName: 'John Smith',
    paymentType: 'cash',
}

//notice the inferred type is not automatically narrowed. E.g. the type of customerName is 'string' not the string literal 'John Smith'
type PaymentFromConst = typeof payment;



// using 'as const' surfaces more specific type information to the type system

const payment2 = {
    customerName: 'John Smith',
    paymentType: 'cash',
} as const;

// here our properties are now readonly and they are narrowed to the greatest possible degree
type PaymentFromConst2 = typeof payment2;


// using 'as const' can be helpful when you want to use a list of options as both a type and a value

// imagine a client app that has a dropdown with a list of actions.
// You want the string literals that populate the dropdown to also represent a specific type to strongly type your handler function

const EMAIL_ACTIONS = ['Reply', 'Delete', 'Forward']

//note that the type is generically string[]

// this is not ideal. We lose the ability to use a type-safe switch and don't get good compilation errors
function handleActions(action: string) {
    console.log(action);
}

// hand-writing a type that matches our EMAIL_ACTIONS list is not ideal either. How would we guarantee they stay in sync?



// use as const and other tricks:

const EMAIL_ACTIONS2 = ['Reply', 'Delete', 'Forward'] as const;

//using 'as const' gets us a type with an array of the actual string literals

// use typeof to get the type, and use [number] to iterate through the indices of the array
// returns a type that is a union of the VALUES, but lifted to the type level
type EmailActions = typeof EMAIL_ACTIONS2[number];



// now we can strictly type the function
function handleActions2(action: EmailActions) {
    console.log(action);
}

// now we get things like autocomplete, full type safety, and can write better switch expressions in our function body
handleActions2('Delete')
