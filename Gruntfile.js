/*eslint filenames/match-regex: "off" */

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: {}
    });

    grunt.event.on('coverage', (lcov, done) => {
        require('coveralls').handleInput(lcov, (err) => {
            if (err) {
                done(err);
            }
            done();
        });
    });
};
