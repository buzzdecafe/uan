import { URIS, Type } from './HKT'

export interface Functor<F extends URIS> {
  map: <A, B>(f: (a: A) => B, fa: Type<F, A>) => Type<F, B>
}
