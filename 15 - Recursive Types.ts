//RECURSIVE TYPES

// you can use recursive structures in type definitions with the ternary operator

// example: a utility type that recursively capitalizes all keys in an object


// here is a simple non-recursive implementation
// the ternary is just there because technically object keys can be numbers and symbols
type SimpleKeyCapitalizer<T extends Object> = {
    [K in keyof T as K extends string ? Capitalize<K> : K]: T[K];
}

type Person = {
    firstName: string,
    lastName: string,
    age: number,
}

//everything works as expected for a flat object
type PersonCapitalized = SimpleKeyCapitalizer<Person>;


type Address = {
    city: string,
    state: string,
}

type PersonWithAddress = {
    firstName: string,
    lastName: string,
    age: number,
    address: Address,
}

//but it fails with nested objects
type PersonWithAddresCapitalized = SimpleKeyCapitalizer<PersonWithAddress>;



type RecursiveKeyCapitalizer<T extends Object> = {
    //Same logic for the keys, but if the value is of Object type, recursively call the helper type
    [K in keyof T as K extends string ? Capitalize<K> : K]: T[K] extends Object ? RecursiveKeyCapitalizer<T[K]> : T[K];
}

// will recursively capitalize the keys of nested objects
type PersonWithAddressRecursivelyCapitalized = RecursiveKeyCapitalizer<PersonWithAddress>;

