import { join } from 'path'
import { createReadStream } from 'fs'
import { getFoundText, removeNil } from './helpers'
const fastGlob = require('fast-glob')

/**
 * findText :: (String, String) => Promise
 *
 * Find the text on the given file. It is case-sensitive search utility.
 * @param {String} text
 * @param {String} path
 * @param {Object} options? where you can control the search mechanism. We can set flags (Regex) and make not case sensitive on the options.
 * @return {Promise}
 *   - Promise resolve type is an object with the included attributes 'matches and count'. If the
 *     given word cannot find in the file, it returns empty object.
 *   - Promise reject type is an instance of Error.
 */
export const findText = (text, path, options) => {
  // Handle if the path is a file
  const readerStream = createReadStream(path)
  // Set the encoding to be utf8.
  readerStream.setEncoding('UTF8')
  // Return a promise
  return new Promise((resolve, reject) => {
    // listening to an event data
    readerStream.on('data', (content) => {
      const result = getFoundText(content, {word: text, path})
      // pass the result as resolve value
      resolve(result)
    })
    // listening to an event error
    readerStream.on('error', (error) => {
      // pass the error message as reject value
      reject(error)
    })
  })
}

/**
 * findTextInFiles :: (String, String) => Promise
 *
 * Find the text in the files which are resided at the given directory. It recursively reads the nested files (uses fast-glob) for matching files.
 * @param {String} text
 * @param {String} pattern a string value which is used for filtering files.
 * @param {Object} options where you can control the search mechanism. It attributes to make the search as not case-sensitive.
 *                         We can also use this options to skip some files.
 * @return {Promise}
 *   - Promise resolve type is an array of object with the included attributes 'fileName, matches, and count'. If the
 *     given word cannot find in the file, it returns empty array.
 *   - Promise reject type is an instance of Error.
 */
export const findTextInFiles = (text, pattern, options) => {
  return fastGlob(pattern)
    .then((files) => {
      // get the current working directory
      const cwd = process.cwd()
      // return of array of promises.
      const promises = files.map((file) => {
        // execute the findText which returns Promise either resolve or rejected.
        return findText(text, join(cwd, file))
      })
      // invoke all Promises
      return Promise
        .all(promises)
        .then(removeNil) // removing null and empty object element
    })
}
