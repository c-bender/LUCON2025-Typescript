// ALGEBRAIC DATA TYPES

// ADTs are the combination of sum types and union types

//Simple case: the top-level object is a sum type, and the paymentType key represents a union type
type Payment = {
    name: string;
    paymentType: 'cash' | 'card' | 'check';
}

