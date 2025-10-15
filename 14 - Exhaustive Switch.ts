//EXHAUSTIVE SWITCH

type Colors = 'red' | 'green' | 'blue';

//in Typescript (and Javascript) switch constructs have fallthrough by default. Use return or break to avoid unintended behavior.

// currently nothing guarantees that all input options have well-defined behavior
function getRGB(color: Colors): number {
    switch(color) {
        case 'red': return 1;
        case 'green': return 2;
    }
}



// a default branch makes sure behavior is well-defined for all possible inputs
// but NOT that all possible inputs are covered in their own branches
function getRGBWithDefault(color: Colors): number {
    switch(color) {
        case 'red': return 1;
        case 'green': return 2;
        default: throw new Error(`Unknown color ${color}`);
    }
}



// using the NEVER type and the 'satisfies' keyword resolves this problem at compile time
function getRGBWithExhaustivenessChecking(color: Colors): number {
    switch(color) {
        case 'red': return 1;
        case 'green': return 2;
        //since it is possible for the value to be 'blue' when it hits the default branch,
        //the assertion that 'color satisfies never' is false
        default: throw new Error(`Unknown color ${color satisfies never}`);
    }
}
