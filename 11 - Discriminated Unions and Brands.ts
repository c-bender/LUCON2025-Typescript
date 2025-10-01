//DISCRIMINATED UNIONS AND BRANDS

//DISCRIMINATED UNIONS

// discriminated unions are union types where each member of the union shares a property or 'tag' that can be used to discriminate between them
// this tag is then used for type narrowing and switch / if-then-else blocks

export type WithLoading<T> = LoadedValue<T> | ErroredValue | LoadingValue;

export type LoadedValue<T> = {
    status: 'loaded',
    value: T
};

export type ErroredValue = {
    status: 'errored',
    error: unknown
};

export type LoadingValue = { status: 'loading' };

function processAsyncCall(input: WithLoading<string>) {
    switch (input.status) {
        case 'loading': return 'Please wait while data loads';
        case 'errored': return `There was an error loading the data ${input.error}`;
        case 'loaded': return input.value;
    }
}




//BRANDS

// Using intersections can allow us to 'brand' primitive types without having to create wrapper objects / value classes
type Brand<T, B> = T & { _brand: B };

type Username = Brand<string, 'username'>;

// The type assertion "brands" the string as also a Username
const username1 = 'jsmith12' as Username;

// We still get all the out of box string functionality
username1.concat('test');

function printString(input: string) {
    console.log(input);
}

// we can pass it to anything that takes a string
printString(username1);

function printUsername(input: Username) {
    console.log(input);
}

// we can pass it to anything that takes a Username
printUsername(username1);

// but printUsername is now type-safe and we can't pass a "raw" string to it, even if it's the same literal string
printUsername('jsmith12');

// you can also access the brand for pattern matching in switch expressions, etc.