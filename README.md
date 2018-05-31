## find-text
Fast, minimal, and easy to use tool for finding text across multiple files. It is tiny (3.78kb bundle size, including dependecies).

[![NPM](https://img.shields.io/npm/v/find-text.svg)](https://www.npmjs.com/package/find-text) [![Build Status](https://travis-ci.org/denniscual/storext.svg?branch=master)](https://travis-ci.org/denniscual/find-text) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install find-text
```

## Usage

The module exposes two API's `findText` and `findTextInFiles`.

### findText

```js
import { findText } from 'find-text'

/**
 * findText :: (String, String) => Promise
 *
 * Find the text on the given file.
 */
findText('TODO', '/Users/user/Desktop/sample/src/users.js')
  .then((results) => {
    console.log(results) // See below the shape of result output
  })
  .catch((err) => {
    // Error object
    console.log(err)
  })
```

The result contains the `fileName`, `matches`, and `count` of matches in the file.

```js
const result = {
  fileName: 'src/users.js', // current working directory path is omitted
  matches: [{
    text: '// TODO: Add update user API', // line in found text
    lineNumber: 5
  }],
  count: 1
}
```

### findTextInFiles

```js
import { findTextInFiles } from 'find-text'

/**
 * findTextInFiles :: (String, String) => Promise
 *
 * Find the text in the files which are resided at the given directory. 
 */
findTextInFiles('TODO', 'src/users.js')
  .then((results) => {
    console.log(results) // See below the shape of results output
  })
  .catch((err) => {
    // Error object
    console.log(err)
  })
```

The results is an array of object (the output returned by `findText`)

```js
const results = [
  {
    fileName: 'src/users.js', 
    matches: [{
      text: '// TODO: Add update user API',
      lineNumber: 5
    }],
    count: 1
  }
]
```

## API

### findText :: (String, String) => Promise 

Find the text on the given file. When the text is not found in the given file, it returns empty object.

Promise is rejected when passing path which is not exist.

#### text

Type: `string`

The string you want to search for.

#### path

Type: `string`

The path you want to search in.

### findTextInFiles :: (String, String) => Promise

Find the text in the files which are resided at the given directory. It recursively reads the nested files which match for the pattern.

It returns empty array when passing not found text or no files are matched for the given pattern.

#### text

Type: `string`

The string you want to search for.

#### pattern

Type: `string`|`string[]`

Pattern to be matched. It supports negated pattern. For more information about pattern, check [micromatch](https://github.com/micromatch/micromatch)

## Changelog

This project adheres to [Semantic Versioning](http://semver.org/).
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/denniscual/find-text/releases) page.

## License

[MIT](https://opensource.org/licenses/MIT)
