/**
 * Created by jinliang on 3/19/17.
 */
module.exports = function (grunt) {
    //project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest:{
            local:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testResults.txt',
                    quiet: false,
                    clearRequireCache: false,
                    ui: 'tdd'
                },
                src:['unit_test/**/*.js']
            },
            shippable:{
                options:{
                    reporter: 'mocha-junit-reporter',
                    reporterOptions:{

                    },
                    ui:'tdd'
                },
                src: ['test/**/*.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.registerTask('test',['mochaTest:local']);
};