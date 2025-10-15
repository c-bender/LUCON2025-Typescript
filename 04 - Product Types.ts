// PRODUCT TYPES

// like interfaces--they define an object shape
type PersonType = {
    name: string;
    age: number;
    height: number;
}

// interfaces are preferred for most object definitions
// 1. Declaration merging facilitates more ergonomic extension of object definitions
// 2. Better error messages
interface PersonInterface {
    name: string;
    age: number;
    height: number;
}