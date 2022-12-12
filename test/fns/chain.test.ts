import * as fc from 'fast-check'
import { chain } from '../../src/fns/chain'


describe('.chain', () => {
  describe('chain over array', () => {
    it('maps a function over a nested list and returns the (shallow) flattened result', () => {
      const f = (x: number) => [ x * 2, x * 10 ]
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          (ns) => {
            const chained = chain<number, number>(f)(ns)
            return chained['length'] === ns.length * 2 
              && chained.every(n => Number.isInteger(n))
          }
        )
      )
    })
  })

  describe('chain over function', () => {
    it('', () => {

    })
  })

  describe('chain over chainable object', () => {
    it('', () => {

    })
  })

  describe('unchainable', () => {
    it('throws a TypeError if given an unchainable argument', () => {
      const x2 = (x: number) => [x, x]
      
    })
  })
})