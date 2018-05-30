import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    filesize(), // display the filesize.
    terser(), // uglifier for es modules
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: [
        'node_modules/lodash.isempty/**'
      ]
    })
  ],
  external: ['fs', 'path']
}
