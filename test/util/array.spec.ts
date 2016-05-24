import { random } from '../../src/util/array'

describe('random a number in a range', () => {
  it('result should in a range', () => {
    const result = random(1, 5)
    expect(result > 1 && result < 5).toBe(true)
  })
})