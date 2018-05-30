import { add } from '../src/index'

describe('add', () => {
  it('should equal to 4', () => {
    // received value
    const received = add(2, 2)
    // expected value
    const expected = 4
    // assert
    expect(received).toBe(expected)
  })
})
