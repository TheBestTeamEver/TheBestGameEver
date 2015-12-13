module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1_2-1_0-jar-with-dependencies.jar main.Main 8080'
            }
        },
        sass: {
            dist: {
                files: {
                    'public_html/css/styles.css': 'public_html/css/main.scss'
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            },
            sass: {
                    files: [
                        'public_html/css/*.scss'
                    ],
                    tasks: ['sass'],
                    options: {
                        atBegin: true,
                        livereload: true
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['concurrent']);

};