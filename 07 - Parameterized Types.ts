// PARAMETERIZED TYPES

// Types can include a reference to a parameter.
// These are like "generics" in Java or Kotlin

// Here is a parameterized type that just gives you back whatever type you pass to it.
type Tautology<T> = T;

const same: Tautology<string> = 'test';


// Typescipt has many utility types that are parameterized
// Here is one that operates on string literals
const capitalizedString: Capitalize<'test'> = 'Test';


// using 'extends' for type parameters sets a boundary for the generic parameter
// Type A extends Type B if ALL of As possible values are assignable to type B

// e.g. 'test' extends string is true, but string extends 'test' is false

//a more complicated example using conditional types (more on this later)
type DoesUnionExtendNumber = 1 | 2 | 3 extends number ? true : false;


// using parameterized types to streamline the PaymentType definitions

type PaymentTypes = 'cash' | 'card' | 'check';

type BasePayment<T extends PaymentTypes> = {
    customerName: string;
    paymentType: T;
}

//the type parameter performs the "narrowing" for us now. No need to use an intersection with {paymentType: 'cash'}
type CashPayment = BasePayment<'cash'>;

type CardPayment = BasePayment<'card'> & { cardIssuer: 'visa' | 'mastercard'; }

type CheckPayment = BasePayment<'check'> & { bankName: 'chase' | 'wachovia'; }

type Payment = CashPayment | CardPayment | CheckPayment;



// template literal types use backticks and create string literal types
type EventName = `on${Capitalize<string>}`;

// doesn't meet the template definition, and so it won't compile
const onChange: EventName = 'onchange';
const onClose: EventName = 'onClose';