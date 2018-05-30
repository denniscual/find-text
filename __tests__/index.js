import { spy } from 'sinon'
import { findText } from '../src/index'
import fs from 'fs'

const fakeData = ({
  word = 'TODO',
  path = `${process.cwd()}/src/index.js`
}) => ({
  word,
  path
})

// TODO: Add more unit tests for findText.
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
})

// TODO: Add more unit tests for findTextInFiles.
describe.skip('findTextInFiles', () => {
})
