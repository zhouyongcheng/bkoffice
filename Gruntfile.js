module.exports = function (grunt) {
    grunt.initConfig({
        jshint : {
            sample : {
                files: 'public/js/*.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', []);
};
