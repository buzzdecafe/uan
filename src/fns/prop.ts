import { isObject } from "../internal/_guards"
import { ObjectProperty } from "../internal/t"


export type WithPropTo<T> = { [k: ObjectProperty ]: T }

export const hasProp = <T>(p: ObjectProperty, obj: any): obj is WithPropTo<T> => {
  return isObject(obj) && p in obj
}

export const prop = (x: ObjectProperty) => <T>(obj: WithPropTo<T>) => {
  if (hasProp<T>(x, obj)) {
    return obj[x]
  }

  throw new TypeError(`prop(${Object.prototype.toString.call(x)}) does not exist on object`)
}

export const propOr = <T>(dflt: T) => (x: ObjectProperty) => (obj: WithPropTo<T>) => {
  const val = prop(x)<T>(obj)
  return val == null ? dflt : val
}

export const propEq = <T>(cmp: T) => (x: ObjectProperty) => (obj: WithPropTo<T>) => {
  const val = prop(x)<T>(obj)
  return val === cmp
}
