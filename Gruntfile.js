module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: {}
    });

    grunt.event.on('coverage', function(lcov, done){
        process.env.NODE_COVERALLS_DEBUG = 1;
        require('coveralls').handleInput(lcov, function(err){
            if (err) {
                return done(err);
            }
            done();
        });
    });
};