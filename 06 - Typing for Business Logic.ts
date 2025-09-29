//TYPING FOR BUSINESS LOGIC

//A Key Goal of Strong Typing: Make illegal states unrepresentable

//Case: a 'Payment' object for an online business
type Payment = {
    customerName: string;
    paymentType: 'cash' | 'card' | 'check';
    cardIssuer?: 'visa' | 'mastercard';
    bankName?: 'chase' | 'wachovia'
}

// A valid transaction
const transaction1: Payment = {
    customerName: 'John Smith',
    paymentType: 'cash'
}

// An invalid transaction, but one that still compiles
const transaction2: Payment = {
    customerName: 'John Smith',
    paymentType: 'card'
}

// Another invalid transaction. Still compiles.
const transaction3: Payment = {
    customerName: 'John Smith',
    paymentType: 'cash',
    bankName: 'chase'
}

// Imagine writing a payment validation function to catch all these invalid object states
// The complexity explodes as the object definitions become more complex to match business cases
function validatePayment(payment: Payment) {
    if (payment.paymentType === 'cash') {
        if (payment.bankName || payment.cardIssuer) {
            throw new Error(`Invalid payment state`);
        }
    }

    if (payment.paymentType === 'card' && !payment.cardIssuer) {
        throw new Error(`Invalid payment state: card payments require an issuer`);
    }
}


// The solution: make illegal states unrepresentable

// write definitions that represent the different options for valid payments
interface CashPayment {
    customerName: string;
    paymentType: 'cash';
}

interface CardPayment {
    customerName: string;
    paymentType: 'card';
    cardIssuer: 'visa' | 'mastercard';
}

interface CheckPayment {
    customerName: string;
    paymentType: 'card';
    bankName: 'chase' | 'wachovia';
}


// group those individual definitions using a union type
type PaymentImproved = CashPayment | CardPayment | CheckPayment;


const transaction1b: PaymentImproved = {
    customerName: 'John Smith',
    paymentType: 'cash'
}

//invalid payment type now causes a compilation error
const transaction2b: PaymentImproved = {
    customerName: 'John Smith',
    paymentType: 'card'
}

//another invalid payment that doesn't compile
//notice it uses the paymentType to narrow the type to CashPayment (see error message)
const transaction3b: PaymentImproved = {
    customerName: 'John Smith',
    paymentType: 'cash',
    bankName: 'chase'
}

//we don't need a validation function at all now. All the validity checks have moved to the compilation stage.


// The type definitions can be improved
// reduce duplication by using intersections and base types
// helps reduce errors with defining the same keys across different objects

type PaymentTypes = 'cash' | 'card' | 'check';

//the fields any payment must have
type BasePayment = {
    customerName: string;
    paymentType: PaymentTypes;
}

// intersections use the ampersand character
// the resulting type is a unified definition that meets ALL the criteria listed in the intersection

// in this case, we use the intersection to "narrow" the BasePayment definition down to a cash payment
type CashPayment2 = BasePayment & { paymentType: 'cash' };

//in this case, we narrow to paymentType = 'card' but also add a key for cardIssuer
type CardPayment2 = BasePayment & {
    paymentType: 'card';
    cardIssuer: 'visa' | 'mastercard';
}

type CheckPayment2 = BasePayment & {
    paymentType: 'check';
    bankName: 'chase' | 'wachovia';
}

type PaymentImproved2 = CashPayment2 | CardPayment2 | CheckPayment2;

const transaction1c: PaymentImproved2 = {
    customerName: 'John Smith',
    paymentType: 'cash'
}

const transaction2c: PaymentImproved2 = {
    customerName: 'John Smith',
    paymentType: 'card',
}

const transaction3c: PaymentImproved2 = {
    customerName: 'John Smith',
    paymentType: 'cash',
    bankName: 'chase'
}