import { isObject, isFunction } from "./guards"
import { Predicate, PredicateIndexed } from "./t"


export type FilteringObject<A> = { filter: (p: Predicate<A>) => FilteringObject<A> }
export type Filterable<A> = A[] | Record<string, A> | FilteringObject<A>

export const isFilteringObject = <A>(x: any): x is FilteringObject<A> => isObject(x) && 'filter' in x && isFunction(x.filter)

export const filter = <A>(p: Predicate<A>) => (xs: Filterable<A>) => {
  if (Array.isArray(xs)) {
    return xs.filter(p)
  }

  if (isObject(xs)) {
    return Object.entries(xs).reduce((acc, [k, v]) => ({
      ...acc,
      ...(p(v) ? { [k]: v } : {})
    }), {})
  }

  if (isFilteringObject(xs)) {
    return (xs as FilteringObject<A>).filter(p)
  }

  throw new TypeError(`filter(xs: ${typeof xs}) is not Filterable`)
}

export const filteri = <A>(p: PredicateIndexed<A>) => (xs: A[]) => {
  if (Array.isArray(xs)) {
    return xs.filter(p)
  }

  throw new TypeError(`filteri(xs: ${typeof xs}): xs is not an indexed collection`)
}