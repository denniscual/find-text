## find-text
Fast, minimal, and easy to use tool for finding text across multiple files. It is tiny (3.78kb bundle size, including dependecies).

[![NPM](https://img.shields.io/npm/v/find-text.svg)](https://www.npmjs.com/package/find-text) [![Build Status](https://travis-ci.org/denniscual/storext.svg?branch=master)](https://travis-ci.org/denniscual/find-text) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install find-text
```

## Usage

The module exposes two API's `findText` and `findTextInFiles`.

#### findText

```js
import { findText } from './index'

/**
 * findText :: (String, String) => Promise
 *
 * Find the text on the given file.
 */
findText('TODO', '/Users/user/Desktop/sample/src/users.js')
  .then((results) => {
    console.log(results) // See below the shape of result output
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

#### findTextInFiles

```js
import { findTextInFiles } from './index'

/**
 * findTextInFiles :: (String, String) => Promise
 *
 * Find the text in the files which are resided at the given directory. 
 */
findTextInFiles('TODO', 'src/users.js')
  .then((results) => {
    console.log(results) // See below the shape of results output
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


## License

[MIT](https://opensource.org/licenses/MIT)
