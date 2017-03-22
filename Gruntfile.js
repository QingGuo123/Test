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
                src:['unit_test/**/tests.js']
            },
            shippable:{
                options:{
                    reporter: 'mocha-junit-reporter',
                    reporterOptions:{

                    },
                    ui:'tdd'
                },
                src: ['test/**/table_message.js']
            }
        }

        // mocha_istanbul: {
        //     coverage: {
        //         src: 'test', // a folder works nicely
        //         options:{
        //             ['--ui', 'tdd'] //any extra options fpr
        //         }
        //
        //     }
        // }
    });
    grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.registerTask('test',['mochaTest:local']);
};