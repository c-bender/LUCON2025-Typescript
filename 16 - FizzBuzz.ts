//FIZZBUZZ

type UpperLimit = 100;

type BoundedRange<
    UpperLimit extends number,
    Result extends Array<unknown> = [],
> =
    Result['length'] extends UpperLimit
        ? Result
        : BoundedRange<UpperLimit, [...Result, Result['length']]>;

type NumberRange = BoundedRange<100>[number];
//      ^?

type RecursiveSliceFromIndex<T extends readonly any[], Index extends number, Acc extends readonly any[] = []> =
    Acc['length'] extends Index
        ? T extends readonly [infer Head, ...infer Tail] ? [Head, ...RecursiveSliceFromIndex<T, Index, []>] : []
        : T extends readonly [infer Head, ...infer Tail]
            ? RecursiveSliceFromIndex<Tail, Index, [...Acc, Head]>
            : [];

type DivisibleByThree = RecursiveSliceFromIndex<BoundedRange<100>, 3>[number];
//    ^?
type DivisibleByFive = RecursiveSliceFromIndex<BoundedRange<100>, 5>[number];
//      ^?
type EveryNthElement<N extends number> = RecursiveSliceFromIndex<BoundedRange<100>, N>;

type Fizz<N extends number> = `${N} Fizz`;
type Buzz<N extends number> = `${N} Buzz`;
type FizzBuzz<N extends number> = `${N} FizzBuzz`;

type GenerateFizzBuzz = NumberRange extends infer N extends number
    ? N extends DivisibleByThree
        ? N extends DivisibleByFive ? FizzBuzz<N> : Fizz<N>
        : N extends DivisibleByFive ? Buzz<N> : `${N}`
    : never;

type result = GenerateFizzBuzz;
//    ^?
