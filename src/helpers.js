import isEmpty from 'lodash.isempty'

/**
 * getFileName :: String => String
 *
 * It returns a path which is relative to given pattern path. It removes the cwd (current working directory) path that leave only the necessary path.
 * @param {String} path
 * @return {String} file name
 */
export const getRelativePath = (path) => path.replace(`${process.cwd()}/`, '')

/**
 * getFoundText :: (String, Object) => Array
 *
 * Extract the line with found text in the given file.
 * @param {String} word
 * @param {Object} meta information
 * @return {Object} result (fileName, matches, count)
 */
export const getFoundText = (content, {word, path}) => {
  // split the content of the file by newline. Return array of lines(line of strings read in given file)
  const lines = content.split('\n')

  // Transform the elements of lines into object. The object should have properties of
  // text and lineNumber. Use 'map' method for tranforming the lines array. Use the index parameter (add 1 because index is zero-based number) which is passed in 'map' for getting the line number of each line.
  const transformLines = lines.map((line, i) => ({
    text: line,
    lineNumber: i + 1
  }))

  // Filter only the the line which include the found string
  const filteredLines = transformLines
    .filter((line) => line.text.includes(word))

  // Create an object which has attributes of matches and count. Use 'reduce' method
  const result = filteredLines.reduce((acc, line) => {
    const { matches } = acc
    // Handle if the matches is defined or undefined. If defined, retain the matches data. Else
    // assign a new array with the line element
    const updatedMatches = matches ? matches.concat(line) : [line]
    // return new acc
    return {
      fileName: getRelativePath(path),
      matches: updatedMatches,
      count: updatedMatches.length // count matches
    }
  }, {})

  return result
}

/**
 * removeNull :: Array(a) => Array(a)
 *
 * It remove the included null or empty object element on the array.
 * @param {Array} arr
 * @return {Array} Filtered array.
 */
export const removeNil = (arr) => arr.filter((elem) => !isEmpty(elem))
