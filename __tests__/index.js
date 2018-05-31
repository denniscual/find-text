// January 01, 2018
import { spy } from 'sinon'
import { findText } from '../src'
import fs from 'fs'

// This will generate an input to findText
const fakeData = ({
  word = 'TODO',
  path = `${process.cwd()}/__tests__/fake.txt`
}) => ({
  word,
  path
})

// This will generate a fake result for findText
const fakeDataFromFile = () => ({
  fileName: '__tests__/fake.txt',
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
})

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
        const expected = fakeDataFromFile()
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

// TODO: Add more unit tests for findTextInFiles.
describe.skip('findTextInFiles', () => {
})
