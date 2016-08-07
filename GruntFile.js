/*jshint node:true*/

module.exports = function (grunt) {

    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            src: 'app',
            dist: 'dist',
            images: 'bin'
        },

        'bower-install': {
            src: {
                html: '<%= config.src %>/index.html',
                ignorePath: '<%= config.src %>/'
            }
        },

        watch: {
            less: {
                files: ['<%= config.src %>/styles/*.less'],
                tasks: ['less:dev'],
                options: {
                    spawn: false,
                    interrupt: true
                },
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.src %>/*.html',
                    // '.tmp/styles/{,*/}*.css',
                    '<%= config.src %>/scripts/{,*/}*.js',
                    '<%= config.src %>/scripts/{,*/}*.html',
                    '<%= config.src %>/<%= config.images %>/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ],
                tasks: [
                  // 'clean:server',
                  // 'concurrent:dev',
                  // 'requirejs:dev'
                  'concat'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'dist',
                        '<%= config.src %>'
                    ]
                }
            }
            // ,
            // dist: {
            //     options: {
            //         open: true,
            //         base: '<%= config.dist %>',
            //         livereload: false
            //     }
            // }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.src %>/scripts/{,*/}*.js'
            ]
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/<%= config.images %>/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= config.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.src %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/<%= config.images %>',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/<%= config.images %>'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/<%= config.images %>',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/<%= config.images %>'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt,xml}',
                        '<%= config.images %>/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*'
                    ]
                }]
            }
        },

        concat: {
          js: {
            options: {
              banner: '(function(){\nvar GAME = {};\n',
              footer: '})();'
            },
            src: ['<%= config.src %>/modules/*/*.js','<%= config.src %>/modules/main.js'],
            dest: '<%= config.dist %>/js/game.js'
          },
          css: {
            src: ['<%= config.src %>/modules/*/*.css'],
            dest: '<%= config.dist %>/css/game.css'
          },
          templates: {
            src: ['<%= config.src %>/modules/*/*.html'],
            dest: '.tmp/templates.html'
          }
        }
    });

    // Tasks.
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', function (target) {

        if (target === 'build') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            // 'concurrent:dev',
            'concat',
            'connect:livereload',
            'watch'
        ]);
    });

};
