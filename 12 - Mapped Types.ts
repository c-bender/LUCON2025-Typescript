// MAPPED TYPES

// a mapped type is a type defintion created by iterating over the keys of another object

interface UIActionsConfig {
    click: string;
    drag: number;
    drop: Object;
}

//if we wanted to create a type that defined handlers for each of these actions, how would we do it?
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
    [K in keyof UIActionsConfig]: (input: UIActionsConfig[K]) => void;
}

// combining a mapped type with string literal utility types gets us all the way there
type UIActionsHandlers3 = {
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
    controls: { [K in keyof T]: AbstractControl<T[K]> }
}
type FormArray<T> = FormGroup<T>[]
type AbstractControl<T> = FormArray<T> | FormGroup<T> | FormControl<T>

interface Address {
    city: string;
    state: string;
}

interface Person {
    firstName: string;
    lastName: string;
    address: Address
    phoneNumbers: number[]
}

//if all the types are primitives, we can map all the values to form controls (we would need a bit more logic to wrap that in a FormGroup)
type FormFromSimpleObject<T> = {
    [K in keyof T]: FormControl<T[K]>
}

type AddressForm = FormFromSimpleObject<Address>;


//if we have more complex nested objects, you can use conditional types
type FormFromComplexObject<T> = {
    [K in keyof T]: T[K] extends string | number | boolean ? FormControl<T[K]> : T[K] extends (infer U)[] ? FormArray<U> : FormGroup<T[K]>;
}

type PersonForm = FormFromComplexObject<Person>;






// using mapped types to ensure two types stay in sync

//imagine we have a list of custom form validations that the client implements
//but the config comes from the api
//how do we ensure we always have a validator that represents the config and vice versa?

export const APP_VALIDATORS = {
    required: () => {},
    maxlength: (maxLength: number) => {},
    minlength: (minLength: number) => {}
} as const;

// Supported validator keys
type ValidatorKeys = keyof typeof APP_VALIDATORS;

// Specifies all the possible configs for each validation. These represent the possible shapes from the API.
// Adding a key to the APP_VALIDATORS will trigger a compilation error if there is not a corresponding key here.
interface ValidationConfigList {
    required: ValidationName<'required'>,
    maxlength: ValidationName<'maxlength'>
    minlength: ValidationName<'required'>,
}

// This type will throw a compilation error if the keys of APP_VALIDATORS contains any keys not found in ValidationConfigList
export type VerifyValidationConfigList = {
    //iterate over the keys of APP_VALIDATORS, and use those keys to index ValidationConfigList
    //for any K, if it isn't in ValidationConfigList, a compliation error is thrown
    [K in keyof typeof APP_VALIDATORS]: ValidationConfigList[K]
};

// This type will throw a compilation error if the keys of ValidationConfig contains any keys not found in APP_VALIDATORS
type VerifyAppValidatorsList = {
    //the inverse of the type above
    //iterate over the keys of ValidationConfigList, and use those keys to index the type definition of APP_VALIDATORS
    //for any K, if it isn't in APP_VALIDATORS, a compilation error is thrown
    [K in keyof ValidationConfigList]: typeof APP_VALIDATORS[K]
};

interface ValidationName<T extends ValidatorKeys> {name: T}