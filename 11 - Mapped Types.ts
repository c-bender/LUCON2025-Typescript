// MAPPED TYPES

// a mapped type is a type defintion created by iterating over the keys of another object

interface UIActionsConfig {
    click: string;
    drag: number;
    drop: Object;
}

//if we wanted to create a type that stored handlers for each of these actions, how would we do it?
//creating it manually wouldn't enforce that the two "stay in sync"

interface UIActionsHandlers {
    onClick: (input: string) => void;
    onDrag: (input: number) => void;
    onDrop: (input: Object) => void;
}

const uiActionHandlerImpl: UIActionsHandlers = {
    onClick: (input) => {console.log(input)},
    onDrag: (input) => {console.log(input * 2)},
    onDrop: (input) => {console.log(input)},
}

// mapped types get us an object with the right shape, but not the right key names
type UIActionsHandlers2 = {
        //^?
    [K in keyof UIActionsConfig]: (input: UIActionsConfig[K]) => void;
}

// combining a mapped type with string literal utility types gets us all the way there
type UIActionsHandlers3 = {
    //^?
    [K in keyof UIActionsConfig as `on${Capitalize<K>}`]: (input: UIActionsConfig[K]) => void;
}

const uiActionHandlerImpl2: UIActionsHandlers3 = {
    onClick: (input) => {console.log(input)},
    onDrag: (input) => {console.log(input * 2)},
    onDrop: (input) => {console.log(input)},
}


//mapped types can be used for type transformations

// setting up some generic Angular-like form types
type FormControl<T> = { value: T }
type FormGroup<T> = {
    controls: { [K in keyof T]: FormControl<T[K]> | FormGroup<T[K]> }
}
type FormArray<T> = FormGroup<T>[]
type AbstractControl<T> = FormArray<T> | FormGroup<T> | FormControl<T>


