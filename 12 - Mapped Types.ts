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







// using mapped types to ensure two types stay in sync

//imagine we have a list of custom form validations that the client implements
//but the config comes from the api
//how do we ensure no one
export const APP_CONFIG = {
    required: () => {},
    maxlength: (maxLength: number) => Validators.maxLength(maxLength),
    // minlength: (minLength: number) => Validators.minLength(minLength)
} as const;

// Supported validator keys
type ValidatorKeys = keyof typeof HALIBUT_VALIDATORS;

// Specifies all the possible configs for each validation. These represent the possible shapes from the API.
// Adding a key to the HALIBUT_VALIDATORS will trigger a compilation error if there is not a corresponding key here.
interface ValidationConfigList {
    required: ValidationName<'required'>,
    maxlength: ValidationName<'maxlength'> & ValidationConfig<MaxLengthValidationConfig>
    // minlength: ValidationName<'required'>,
}

// This type will throw a compilation error if the keys of HALIBUT_VALIDATORS contains any keys not found in ValidationConfig
export type Validation = {
    [K in keyof typeof HALIBUT_VALIDATORS]: ValidationConfigList[K]
}[keyof typeof HALIBUT_VALIDATORS];

// This type will throw a compilation error if the keys of ValidationConfig contains any keys not found in HALIBUT_VALIDATORS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ValidatorTypes = {
    [K in keyof ValidationConfigList]: typeof HALIBUT_VALIDATORS[K]
}[keyof ValidationConfigList];

interface ValidationName<T extends ValidatorKeys> {name: T};
interface ValidationConfig<T> {config: T};

interface MaxLengthValidationConfig {
    value: number;
}

export interface ErrorMessage {message: string};