import { Func, Tagged } from "../internal/t"


export interface Box<A> extends Tagged<'Box'> {
  map: <B>(f: Func<A, B>) => Box<B>
  chain: <B>(f: Func<A, Box<B>>) => Box<B>,
  isBox: () => true
}

export const box = <A>(value: A): Box<A> => {
  return {
    tag: 'Box',
    map: (f) => box.of(f(value)),
    chain: (f) => f(value),
    isBox: () => true
  }
}

box.of = box
