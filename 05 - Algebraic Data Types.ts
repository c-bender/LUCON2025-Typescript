// ALGEBRAIC DATA TYPES

// ADTs are the combination of union types and product types

//Simple case: the top-level object is a product type, and the paymentType key represents a union type
type Payment = {
    name: string;
    paymentType: 'cash' | 'card' | 'check';
}

