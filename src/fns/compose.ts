import { isFunction } from "../internal/_guards";
import { Func } from "../internal/t";


export const compose = <B, C>(f: Func<B, C>) => <A>(g: Func<A, B>) => (x: A) => f(g(x))

export type Pipeline1<A, Z> = [Func<A, Z>]
export type Pipeline2<A, B, Z> = [Func<A, B>, Func<B, Z>]
export type Pipeline3<A, B, C, Z> = [Func<A, B>, Func<B, C>, Func<C, Z>]
export type Pipeline4<A, B, C, D, Z> = [Func<A, B>, Func<B, C>, Func<C, D>, Func<D, Z>]
export type Pipeline5<A, B, C, D, E, Z> = [Func<A, B>, Func<B, C>, Func<C, D>, Func<D, E>, Func<E, Z>]
export type Pipeline6<A, B, C, D, E, F, Z> = [Func<A, B>, Func<B, C>, Func<C, D>, Func<D, E>, Func<E, F>, Func<F, Z>]
export type Pipeline7<A, B, C, D, E, F, G, Z> = [Func<A, B>, Func<B, C>, Func<C, D>, Func<D, E>, Func<E, F>, Func<F, G>, Func<G, Z>]
export type Pipeline8<A, B, C, D, E, F, G, H, Z> = [Func<A, B>, Func<B, C>, Func<C, D>, Func<D, E>, Func<E, F>, Func<F, G>, Func<G, H>, Func<H, Z>]

const isFunArray = (fs: any[]) => Array.isArray(fs) && fs.every(isFunction)
export const isPipeline1 = <A, Z>(fs: any[]): fs is Pipeline1<A, Z> => isFunArray(fs) && fs.length === 1
export const isPipeline2 = <A, B, Z>(fs: any[]): fs is Pipeline2<A, B, Z> => isFunArray(fs) && fs.length === 2
export const isPipeline3 = <A, B, C, Z>(fs: any[]): fs is Pipeline3<A, B, C, Z> => isFunArray(fs) && fs.length === 3
export const isPipeline4 = <A, B, C, D, Z>(fs: any[]): fs is Pipeline4<A, B, C, D, Z> => isFunArray(fs) && fs.length === 4
export const isPipeline5 = <A, B, C, D, E, Z>(fs: any[]): fs is Pipeline5<A, B, C, D, E, Z> => isFunArray(fs) && fs.length === 5
export const isPipeline6 = <A, B, C, D, E, F, Z>(fs: any[]): fs is Pipeline6<A, B, C, D, E, F, Z> => isFunArray(fs) && fs.length === 6
export const isPipeline7 = <A, B, C, D, E, F, G, Z>(fs: any[]): fs is Pipeline7<A, B, C, D, E, F, G, Z> => isFunArray(fs) && fs.length === 7
export const isPipeline8 = <A, B, C, D, E, F, G, H, Z>(fs: any[]): fs is Pipeline8<A, B, C, D, E, F, G, H, Z> => isFunArray(fs) && fs.length === 8

export type FuncPipeline<A, Z, B, C, D, E, F, G, H>
  = Pipeline1<A, Z>
  | Pipeline2<A, B, Z>
  | Pipeline3<A, B, C, Z>
  | Pipeline4<A, B, C, D, Z>
  | Pipeline5<A, B, C, D, E, Z>
  | Pipeline6<A, B, C, D, E, F, Z>
  | Pipeline7<A, B, C, D, E, F, G, Z>
  | Pipeline8<A, B, C, D, E, F, G, H, Z>

export const pipe = <A, Z, B = unknown, C = unknown, D = unknown, E = unknown, F = unknown, G = unknown, H = unknown>(fs: FuncPipeline<A, Z, B, C, D, E, F, G, H>): Func<A, Z> => {
  if (isPipeline1(fs)) {
    const f: Func<A, Z> = fs[0] as Func<A, Z>
    return f
  }

  if (isPipeline2(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, Z> = fs[1]
    return compose(f1)(f0)
  }

  if (isPipeline3(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, Z> = fs[2]
    return compose(f2)(compose(f1)(f0))
  }

  if (isPipeline4(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, D> = fs[2]
    const f3: Func<D, Z> = fs[3]
    return compose(f3)(compose(f2)(compose(f1)(f0)))
  }

  if (isPipeline5(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, D> = fs[2]
    const f3: Func<D, E> = fs[3]
    const f4: Func<E, Z> = fs[4]
    return compose(f4)(compose(f3)(compose(f2)(compose(f1)(f0))))
  }

  if (isPipeline6(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, D> = fs[2]
    const f3: Func<D, E> = fs[3]
    const f4: Func<E, F> = fs[4]
    const f5: Func<F, Z> = fs[5]
    return compose(f5)(compose(f4)(compose(f3)(compose(f2)(compose(f1)(f0)))))
  }

  if (isPipeline7(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, D> = fs[2]
    const f3: Func<D, E> = fs[3]
    const f4: Func<E, F> = fs[4]
    const f5: Func<F, G> = fs[5]
    const f6: Func<G, Z> = fs[6]
    return compose(f6)(compose(f5)(compose(f4)(compose(f3)(compose(f2)(compose(f1)(f0))))))
  }

  if (isPipeline8(fs)) {
    const f0: Func<A, B> = fs[0]
    const f1: Func<B, C> = fs[1]
    const f2: Func<C, D> = fs[2]
    const f3: Func<D, E> = fs[3]
    const f4: Func<E, F> = fs[4]
    const f5: Func<F, G> = fs[5]
    const f6: Func<G, H> = fs[6]
    const f7: Func<H, Z> = fs[7]
    return compose(f7)(compose(f6)(compose(f5)(compose(f4)(compose(f3)(compose(f2)(compose(f1)(f0)))))))
  }

  throw new TypeError(`pipe :: fs is not a valid Function pipeline`)
}
