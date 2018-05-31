import { spy } from 'sinon'
import { findText, findTextInFiles } from '../src'
import fs from 'fs'

// This will generate an input to findText
const fakeData = ({
  word = 'TODO',
  path = `${process.cwd()}/__tests__/data/fake.txt`
}) => ({
  word,
  path
})

// This will generate a fake result for findText and findTextInFiles
const fakeDataFromFiles = () => [
  {
    fileName: '__tests__/data/fake.txt',
    matches: [
      {
        text: '// TODO: This line should be included',
        lineNumber: 1
      },
      {
        text: '// TODO: And also this line',
        lineNumber: 3
      }
    ],
    count: 2
  },
  {
    fileName: '__tests__/data/fake2.txt',
    matches: [
      {
        text: '// TODO: Sample fake text 1',
        lineNumber: 1
      }
    ],
    count: 1
  },
  {
    fileName: '__tests__/data/fake3.php',
    matches: [{
      text: '// TODO: Fake data for js.',
      lineNumber: 1
    }],
    count: 1
  }
]

describe('findText', function () {
  beforeEach(() => {
    this.createReadStreamSpy = spy(fs, 'createReadStream')
  })

  afterEach(() => {
    this.createReadStreamSpy.restore()
  })

  describe('createReadStream', () => {
    it('should pass a correct input', () => {
      const { word, path } = fakeData({})
      // execute findText
      findText(word, path)
      // assert the this.createReadStreamStub
      expect(this.createReadStreamSpy.calledWith(path)).toBeTruthy()
    })
  })

  it('should return rejected value when passing a not found text file', () => {
    const { word, path } = fakeData({path: 'dummy/path'})
    expect.assertions(1)
    return findText(word, path)
      .catch(({message}) => {
        const expected = `ENOENT: no such file or directory, open 'dummy/path'`
        expect(message).toBe(expected)
      })
  })

  it('should read text file and return an equal result', () => {
    const { word, path } = fakeData({})
    expect.assertions(1)
    return findText(word, path)
      .then((result) => {
        const expected = fakeDataFromFiles()[0]
        // assertions
        expect(result).toEqual(expected)
      })
  })

  it('should return empty object when the given text not found', () => {
    const { word, path } = fakeData({word: 'Not found'})
    expect.assertions(1)
    return findText(word, path)
      .then((result) => {
        const expected = {}
        expect(result).toEqual(expected)
      })
  })
})

const fakeDataForFindTextInFiles = ({
  word = 'TODO',
  pattern = '__tests__/**/*.txt'
}) => ({
  word,
  pattern
})

describe('findTextInFiles', () => {
  it('should return empty array if there is no word found', () => {
    const { word, pattern } = fakeDataForFindTextInFiles({word: 'FIXME'})
    expect.assertions(1)
    return findTextInFiles(word, pattern)
      .then((result) => {
        expect(result).toEqual([])
      })
  })

  it('should return empty array when there is no matched pattern', () => {
    const { word, pattern } = fakeDataForFindTextInFiles({pattern: 'dummy/path'})
    expect.assertions(1)
    return findTextInFiles(word, pattern)
      .then((result) => {
        expect(result).toEqual([])
      })
  })

  it('should read multiple types of file based in the given patterns and return an equal result', () => {
    // passing multiple patterns
    const { word, pattern } = fakeDataForFindTextInFiles({pattern: ['__tests__/**/*.txt', '__tests__/**/*.php']})
    expect.assertions(1)
    return findTextInFiles(word, pattern)
      .then((result) => {
        const expected = fakeDataFromFiles()
        expect(result).toEqual(expected)
      })
  })

  it('should skip file which is not matched for the given pattern', () => {
    // passing pattern for only .txt file
    const { word, pattern } = fakeDataForFindTextInFiles({pattern: '__tests__/**/*.txt'})
    expect.assertions(1)
    return findTextInFiles(word, pattern)
      .then((result) => {
        // get the object which is generated for .php file
        const expected = fakeDataFromFiles()[3]
        expect(result).not.toContainEqual(expected)
      })
  })
})
