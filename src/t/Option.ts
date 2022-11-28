import { Func } from "../fns/t"

export type Option<T> = Some<T> | None

export interface Some<T> {
  map: <B>(f: Func<T, B>) => Option<B>
  chain: <B>(f: Func<T, Option<B>>) => Option<B>,
  t: 'Option.Some',
  isSome: () => true
  isNone: () => false
}

export interface None {
  t: 'Option.None',
  map: (f: Func<unknown, unknown>) => None
  chain: (f: Func<unknown, unknown>) => None
  isSome: () => false
  isNone: () => true
}

export const some = <T>(value: T): Some<T> => {
  return {
    t: 'Option.Some',
    map: (f) => some.of(f(value)),
    chain: (f) => f(value),
    isSome: () => true,
    isNone: () => false
  
  }
}
some.of = some

export const none: None = Object.freeze({
  t: 'Option.None',
  map: (_f: Func<unknown, unknown>) => none,
  chain: (_f: Func<unknown, unknown>) => none,
  isSome: () => false,
  isNone: () => true

})

export const fromPredicate = <T>(f: Func<T, boolean>, value: T) => {
  return f(value) ? some.of(value) : none
}
