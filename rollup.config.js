/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import babel from 'rollup-plugin-babel';

export default {
  entry: 'any.js',
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
  targets: [
    {dest: 'lib/any.cjs.js', format: 'cjs'},
    {dest: 'lib/any.es.js', format: 'es'}
  ]
};
