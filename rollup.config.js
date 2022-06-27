/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import babel from 'rollup-plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    babel({
      babelrc: false,
      exclude: ['./node_modules/**'],
      presets: ['@travi'],
      plugins: ['@babel/plugin-transform-exponentiation-operator']
    })
  ],
  output: [
    {file: 'lib/any.js', format: 'cjs', sourcemap: true},
    {file: 'lib/any.mjs', format: 'es', sourcemap: true}
  ]
};
