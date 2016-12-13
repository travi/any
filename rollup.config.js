import babel from 'rollup-plugin-babel';

export default {
    entry: 'any.js',
    plugins: [
        babel({
            babelrc: false,
            exclude: ['./node_modules/**'],
            presets: ['es2015-rollup']
        })
    ],
    targets: [
        {dest: 'lib/any.cjs.js', format: 'cjs'},
        {dest: 'lib/any.es.js', format: 'es'}
    ]
};
