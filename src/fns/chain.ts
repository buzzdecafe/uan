import { isFunction, isObject } from "./guards"
import { Func } from "./t"


export type ChainingObject<A> = { 
  chain: <B>(f: Func<A, ChainingObject<B>>) => ChainingObject<B> 
}
export type Chain<A, X=unknown> 
  = A[]
  | ChainingObject<A>
  | Func<X, A>

export const isChainingObject = <A>(x: any): x is ChainingObject<A> => isObject(x) && 'chain' in x && isFunction(x.chain)


// chain :: (A -> Chain<B>) -> Chain<A> -> Chain<B>
//----------------------------------------------------------------------
// chain :: (A -> Array<B>) -> Array<A> -> Array<B>
// function chain<A, B>(fn: Func<A, B[]>): Func<A[], B[]>
// chain :: (A -> ChainingObj<B>) -> ChainingObj<A> -> ChainingObj<B>
// function chain<A, B>(fn: Func<A, ChainingObject<B>>): Func<ChainingObject<A>, ChainingObject<B>>
// chain :: (A -> Func<X, B>) -> Func<X, A> -> Func<X, B>
// function chain<A, B, X>(fn: Func<A, Func<X, B>>): Func<Func<X, A>, Func<X, B>>

// implementation
export function chain<A, B>(fn: Func<A, Chain<B>>): Func<Chain<A>, Chain<B>> {
  return function(chn: Chain<A>): Chain<B> {
    if (Array.isArray(chn)) {
      const containerLs = chn as A[]
      return containerLs.flatMap(fn as Func<A, B[]>)
    }

    if (isChainingObject(chn)) {
      const containerObj = chn as ChainingObject<A>
      return containerObj.chain(fn as Func<A, ChainingObject<B>>)
    }

    if (isFunction(chn)) {
      return <X>(x: X) => {
        const chainer = fn as Func<A, Func<X, B>>
        const containerFn = chn as Func<X, A>

        if (isFunction(containerFn)) {
          return chainer(containerFn(x))(x)
        }

        throw new TypeError(`chain :: Chain function-container is not a Function!`)
      }
    }

    throw new TypeError(`chain :: chn: ${typeof chn} is not a Chain`)
  }
}