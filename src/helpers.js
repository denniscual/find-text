import isEmpty from 'lodash.isempty'

/**
 * Performs right-to-left function composition.
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

/**
 * getFileName :: String => String
 *
 * It returns a path which is relative to given pattern path. It removes the cwd (current working directory) path that leave only the necessary path.
 * @param {String} path
 * @return {String} file name
 */
export const getRelativePath = (path) => path.replace(`${process.cwd()}/`, '')

/**
 * removeNull :: Array(a) => Array(a)
 *
 * It remove the included null or empty object element on the array.
 * @param {Array} arr
 * @return {Array} Filtered array.
 */
export const removeNil = (arr) => arr.filter((elem) => !isEmpty(elem))
