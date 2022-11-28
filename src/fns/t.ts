export type FuncIndexed<A, B> = (a: A, i: number) => B
export type Func<A, B> = (a: A) => B

export type Predicate<A> = (a: A) => boolean
export type PredicateIndexed<A> = (a: A, i: number) => boolean

export type ObjectProperty = string | number | symbol
