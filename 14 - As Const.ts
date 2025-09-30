



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