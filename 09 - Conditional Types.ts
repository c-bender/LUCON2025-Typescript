// CONDITIONAL TYPES

// conditional types use the ternary operator pattern to check a condition and return a type based on the result of the check
// this check is a compile-time check, not a runtime check

type IsNumber<T> = T extends number ? true : false;

type OneIsNumber = IsNumber<1>;

type StringIsNumber = IsNumber<'one'>;



// using 'INFER' with conditional types
// the INFER keyword allows extracting type information from wrapped or nested objects in the context of a conditional type check

//example using arrays
type ArrayElementType<T> = T extends Array<infer U> ? U : never;

type ElementType = ArrayElementType<number[]>;

//example using parameterized types
type PromiseReturnType<T extends Promise<any>> = T extends Promise<infer U> ? U :  never;

type PromiseType = PromiseReturnType<Promise<{customObject: string}>>;

