## node-module-library
A simple starter kit for creating module in node.

## Features
Check the pre-installed dev dependencies which you can take advantage easily.

- Handles all modern JS features
- Bundles `cjs` and `es` module formats
- [Rollup](https://rollupjs.org/) for build process
- [Babel](https://babeljs.io/) for transpilation
- [Jest](https://facebook.github.io/jest/) for testing
- [Eslint](https://eslint.org/) for linting. It uses [standard config](https://github.com/standard/eslint-config-standard)
for Javascript standard style

## Getting started

Clone this package and install the packages. This package requires `node >= 6`, 
but we recommend `node >= 8`.

```bash
git clone https://github.com/denniscual/node-module-library.git
cd node-module-library
yarn install
```

#### Scripts

* `yarn build` -  builds the library to `dist`.
* `yarn dev` - builds the library, then keeps rebuilding it whenever the source files change 
using [rollup-watch](https://github.com/rollup/rollup-watch).
* `yarn test` - runs tests.

## License

[MIT](https://opensource.org/licenses/MIT)
