// UNION TYPES

// like enums, they define a type-safe set of options

type Color = 'red' | 'green' | 'blue';


// having overly general parameter types like 'string' is a place for bugs to hide
function getColorCode(color: string): number {
    switch (color) {
        case 'red': return 1;
        case 'green': return 2;
        case 'blue': return 3;
    }
}

// this code would error at runtime, but it compiles without better typing
getColorCode('Invalid On Purpose')

// union types facilitate type narrowing in the branches of conditional statements
function useColor(color: Color): void {
    if (color == 'red') {
        color
        //^?
    }
}

// why not use enums?
// "TypeScript Enums are Terrible"
// https://www.youtube.com/watch?v=0fTdCSH_QEU
// TL;DR - enums in typescript are backed by arrays that have some odd foot-guns

