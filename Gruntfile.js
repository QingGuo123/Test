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
            user_test:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testUserResults.txt',
                    quiet: false,
                    clearRequireCache: false,
                    ui: 'tdd'
                },
                src:['unit_test/**/user_test.js']
            },
            status_test:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testStatusResults.txt',
                    quiet: false,
                    clearRequireCache: false,
                    ui: 'tdd'
                },
                src:['unit_test/**/tests.js']
            },
            announcement_test:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testAnnouncementResults.txt',
                    quiet: false,
                    clearRequireCache: false,
                    ui: 'tdd'
                },
                src:['unit_test/**/tests.js']
            },
            message_test:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testMessageResults.txt',
                    quiet: false,
                    clearRequireCache: false,
                    ui: 'tdd'
                },
                src:['unit_test/**/tests.js']
            },
            privateMessage_test:{
                options:{
                    reporter: 'spec',
                    captureFile: 'testPrivateMessageResults.txt',
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

    });
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('allInOne',['mochaTest: tests']);
    grunt.registerTask('all',['mochaTest:user_test', 'mochaTest:status_test', 'mochaTest:announcement_test', 'mochaTest:message_test', 'mochaTest:privateMessage_test']);
    grunt.registerTask('user_test',['mochaTest:user_test']);
    grunt.registerTask('status_test',['mochaTest:status_test']);
    grunt.registerTask('announcement_test',['mochaTest:announcement_test']);
    grunt.registerTask('message_test',['mochaTest:message_test']);
    grunt.registerTask('privateMessage_test',['mochaTest:privateMessage_test']);


};