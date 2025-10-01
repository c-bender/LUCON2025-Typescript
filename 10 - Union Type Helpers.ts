// TYPE HELPERS: UNION TYPES

type Colors = 'red' | 'green' | 'blue';

type NonRed = Exclude<Colors, 'red'>;

// note that you can pass a union type in the second param

type OnlyRed = Extract<Colors, 'red'>;


// Note that the type parameters are not themselves strongly typed
type Colors2 = 'redd' | 'greenn' | 'bluee';

// We can pass a string that isn't included in the union. We also don't get autocomplete.
type OnlyRed2 = Exclude<Colors2, 'red'>;


// We have the tools for a better way, IF we have a SIMPLE union type:

type ElementSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

type IncludeOperation = 'include from';
type ExcludeOperation = 'exclude from';
type SubsetOperation = IncludeOperation | ExcludeOperation;


type SubsetOfUnion<T extends SubsetOperation, U, V extends U> =
    //if we are using an include operation: then if the element of U is found in V, return it otherwise return never
    T extends IncludeOperation ? U extends V ? U : never
        // else if we are in an exclude operation: then if the element of U is found in V, return never, otherwise return the element
        : U extends V ? never : U;

type Size = SubsetOfUnion<'include from', ElementSize, 'small' | 'medium' | 'large'>;


// So why are the built-in types not written like this? It's to allow greater flexibility in matching patterns.

// Example
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

type Shape = Circle | Square | Triangle;

// We want to extract all shapes that have a 'radius' property
type HasRadius = Extract<Shape, { radius: number }>;

// If there was a `U extends T` bound, this wouldn't work
// because `{ radius: number }` doesn't extend `Circle | Square | Triangle` directly
// It's an object shape that "matches" a part of Circle