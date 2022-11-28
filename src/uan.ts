import { chain } from './fns/chain'
import { compose, pipe } from './fns/compose'
import { filter, filteri } from './fns/filter'
import { map, mapi } from './fns/map'
import { prop, propEq, propOr } from './fns/prop'
import * as Option from './t/Option'


export default {
  chain,
  compose,
  filter,
  filteri,
  mapi,
  map,
  pipe,
  prop,
  propEq,
  propOr,
  t: {
    Option
  }
}
