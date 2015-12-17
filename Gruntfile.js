module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080'
            }
        },
        requirejs: { 
            build: { 
              options: {
                almond: true,
                baseUrl: "public_html/js",
                mainConfigFile: "public_html/js/main.js",
                name: "main",
                optimize: "none",
                out: "public_html/js/build/main.js"
              } 
            }
        },
        imagemin: {
            dynamic:{
                files: [{
                    expand: true,
                    cwd: 'public_html/design/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public_html/minpic/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public_html/css/styles.css': 'public_html/css/main.scss'
                }
            }
        },
        fest: {
            templates: {
                style: "compressed",
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
        concat: { 
            build: {
                separator: ';\n',
                src: [
                      'public_html/js/lib/almond.js',
                      'public_html/js/build/main.js'
                ],
                dest: 'public_html/js/build.js'
            }
        },
        uglify: { 
            build: {
                files: {
                    'public_html/js/build.min.js': 
                        ['public_html/js/build.js']
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask(
        'default', 
        [
        'concurrent', 'sass'
        ]
    );
    grunt.registerTask(
        'build',
        [
            'fest', 'requirejs:build',
            'concat:build', 'uglify:build',
            'imagemin'
        ]
    );

};