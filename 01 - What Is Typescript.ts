// WHAT IS A TYPE?

/*
A 'type' is a definition of a set of values. For any given value and type,
the value either 'meets' the criterion defined by the type or it does not.

If a value is assignable to a variable of a given type, then it 'meets',
'extends', or 'is' a value of that type.
*/

//The string 'test' is an instance of the type String
const variableName: String = 'test';

//A value can 'satisfy' more than one different type definition.

//Given a specific type:
type Message = { message: String };

//The same value can satisfy more generic types:
const anyType: any = { message: 'test' };
const objectType: Object = { message: 'test' };
const messageType: Message = { message: 'test' };

// Typescript infers types narrowly when they are not expliclty defined.
const inferredType = { message: 'test' };
        //^?





// TYPESCRIPT AND JAVASCRIPT

/*
 - Typescript compiles to Javascript
 - Adds static typing during compile time only
 */





// WHY TYPESCRIPT

/*
 - Static typing pushes more errors from runtime to compile-time
 - Leverage type checking by the IDE
 - Reduce test code
 */


