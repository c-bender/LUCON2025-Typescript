// SUM TYPE HELPERS

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

//omit returns a type definition without the specified key(s)
type PersonName = Omit<Person, 'age'>

//pick returns a type definition with only the specified key(s)
type Age = Pick<Person, 'age'>

//partial returns a type definition with every key set to optional
type PartialPerson = Partial<Person>

//required returns a type definition with every key set to required
type FullPerson = Required<{name?: string}>