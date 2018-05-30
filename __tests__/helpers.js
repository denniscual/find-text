import {
  getRelativePath,
  getFoundText,
  removeNil
} from '../src/helpers'

const PATH = `${process.cwd()}/src/index.js`

describe('getRelativePath', () => {
  it('should extract the cwd path and only return the useful path', () => {
    //
    const received = getRelativePath(PATH)
    //
    const expected = 'src/index.js'
    // assertion
    expect(received).toBe(expected)
  })
})

describe('getFoundText', () => {
  // Factory function which return fake data.
  const fakeData = ({
    content = `// TODO: Create add function to sum-up the 2 given arguments.
const add = (x, y) => x + y
// TODO: Create unit tests.
`,
    word = 'TODO',
    path = PATH
  }) => {
    return {
      content,
      word,
      path
    }
  }

  it('should return object that equal to expected object', () => {
    const { content, word, path } = fakeData({})
    const received = getFoundText(content, {word, path})
    // expected
    const expected = {
      fileName: 'src/index.js',
      matches: [
        {
          text: '// TODO: Create add function to sum-up the 2 given arguments.',
          lineNumber: 1
        },
        {
          text: '// TODO: Create unit tests.',
          lineNumber: 3
        }
      ],
      count: 2
    }
    // assertion
    expect(received).toEqual(expected)
  })

  it('should return empty object when passing empty content', () => {
    const { content, word, path } = fakeData({content: ''})
    const received = getFoundText(content, {word, path})
    // expected
    const expected = {}
    // assertion
    expect(received).toEqual(expected)
  })

  it('should return empty object when passing an unincluded text', () => {
    const { content, word, path } = fakeData({word: 'FIXME'})
    const received = getFoundText(content, {word, path})
    // expected
    const expected = {}
    // assertion
    expect(received).toEqual(expected)

  })
})

describe('removeNil', () => {
  const fakeData = () => [
    {name: 'irish'}, {name: 'dennis'}
  ]

  it('should remove the null element in the array', () => {
    const received = removeNil([...fakeData(), null])
    // expected
    const expected = fakeData()
    // assertion
    expect(received).toEqual(expected)
  })

  it('should remove the empty object element in the array', () => {
    const received = removeNil([...fakeData(), {}])
    // expected
    const expected = fakeData()
    // assertion
    expect(received).toEqual(expected)
  })

  it('should remove the null and empty elements in the array', () => {
    const received = removeNil([...fakeData(), {}, null])
    // expected
    const expected = fakeData()
    // assertion
    expect(received).toEqual(expected)
  })
})
