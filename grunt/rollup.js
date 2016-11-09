const babel = require('rollup-plugin-babel');

module.exports = {
    es5: {
        options: {
            format: 'cjs',
            plugins: [
                babel({
                    babelrc: false,
                    exclude: './node_modules/**',
                    presets: ['es2015-rollup']
                })
            ]
        },
        files: {
            'dist/any.js': 'any.js'
        }
    },
    es6: {
        options: {
            format: 'es',
            plugins: [
                babel({
                    babelrc: false,
                    exclude: './node_modules/**',
                    presets: ['es2015-node']
                })
            ]
        },
        files: {
            'dist/any.module.js': 'any.js'
        }
    }
};

