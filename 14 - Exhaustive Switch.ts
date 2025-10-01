//EXHAUSTIVE SWITCH

type Colors = 'red' | 'green' | 'blue';

//sidenote on fallthrough behavior in switches

// currently nothing guarantees that all input options have well-defined behavior
function getRGB(color: Colors): number {
    switch(color) {
        case 'red': return 1;
        case 'green': return 2;
    }
}



// a default case makes sure all cases are well-defined, but NOT that all branches are explicitly handled
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
