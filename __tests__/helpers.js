import {
  getRelativePath,
  getFoundText,
  removeNil
} from '../src/helpers'

describe('getRelativePath', () => {
  it('should extract the cwd path and only return the useful path', () => {
    //
    const received = getRelativePath(`${process.cwd()}/src/index.js`)
    //
    const expected = 'src/index.js'
    // assertion
    expect(received).toBe(expected)
  })
})
