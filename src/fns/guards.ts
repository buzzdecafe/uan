export const getTypeStr = (x: any): string => Object.prototype.toString.call(x)

export const isObject = (x: any): x is Object => getTypeStr(x) === '[object Object]'

export const isFunction = (x: any): x is Function => getTypeStr(x) === '[object Function]'
