import { isObject, isFunction } from "../internal/_guards"
import { Func, FuncIndexed } from "../internal/t"


export type MappingObject<A> = { map: <B>(f: Func<A, B>) => MappingObject<B> }
export type Mappable<A, X = unknown> = A[] | Record<string, A> | Func<X, A> | MappingObject<A>

export const isMappingObject = <A>(x: any): x is MappingObject<A> => isObject(x) && 'map' in x && isFunction(x.map)

export const map = <A, B>(fn: Func<A, B>) => (xs: Mappable<A>) => {
  if (Array.isArray(xs)) {
    return xs.map(fn)
  }

  if (isFunction(xs)) {
    return <X>(x: X) => fn(xs(x))
  }

  if (isObject(xs)) {
    return Object.entries(xs).reduce((acc, [k, v]) => ({ ...acc, [k]: fn(v as A) }), {})
  }

  if (isMappingObject<A>(xs)) {
    return (xs as MappingObject<A>).map(fn)
  }

  throw new TypeError(`map :: xs: ${typeof xs} is not Mappable`)
}

export const mapi = <A, B>(fn: FuncIndexed<A, B>) => (xs: A[]) => {
  if (Array.isArray(xs)) {
    return xs.map(fn)
  }

  throw new TypeError(`mapi(xs: ${typeof xs}): xs is not an indexed collection`)
}