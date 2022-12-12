import { Func, Tagged } from "../internal/t"
import { HKT } from './HKT'
import { Functor } from './Functor'


declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A> // maps the type literal "Option" to the type `Option`
  }
}

export const URI = 'Option'
export type _URI = typeof URI

export type Option<T> = Some<T> | None


export interface Some<T> extends Tagged<'Option.Some'> {
  map: <B>(f: Func<T, B>) => Option<B>
  chain: <B>(f: Func<T, Option<B>>) => Option<B>
  isSome: () => true
  isNone: () => false
}

export interface None extends Tagged<'Option.None'> {
  map: (f: Func<unknown, unknown>) => None
  chain: (f: Func<unknown, unknown>) => None
  isSome: () => false
  isNone: () => true
}

export const some = <T>(value: T): Some<T> => {
  return {
    tag: 'Option.Some',
    map: (f) => some.of(f(value)),
    chain: (f) => f(value),
    isSome: () => true,
    isNone: () => false
  }
}
some.of = some

export const none: None = Object.freeze({
  tag: 'Option.None',
  map: (_f: Func<unknown, unknown>) => none,
  chain: (_f: Func<unknown, unknown>) => none,
  isSome: () => false,
  isNone: () => true
})

export const fromPredicate = <T>(f: Func<T, boolean>, value: T) => f(value) ? some.of(value) : none
