/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      exclude: ['./node_modules/**'],
      presets: [
        'es2015-rollup',
        'stage-3'
      ],
      plugins: ['babel-plugin-transform-exponentiation-operator']
    })
  ],
  external: [
    'chance',
    'mersenne-twister',
    'lodash'
  ],
  output: [
    {file: 'lib/any.cjs.js', format: 'cjs', sourcemap: true},
    {file: 'lib/any.es.js', format: 'es', sourcemap: true}
  ]
};
