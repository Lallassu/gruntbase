module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['replace:dev', 'browserify', 'bower', 'wiredep', 'concurrent']);
    grunt.registerTask('dist', ['jshint', 'browserify', 'bower', 'bower_concat', 'uglify', 'copy:dist', 'replace:dist']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            dev: {
                tasks: ['jshint', 'nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            server: {
                files: ['.rebooted'],
            }, 
            js: {
                files: ['server/*.js', 'client/*.js'],
                tasks: ['jshint', 'browserify'],
            },
            html: {
                files: ['html/*'],
                tasks: ['replace:dev', 'bower', 'wiredep'],
            },
            reload: {
                files: ['*.html'],
            }
        }, 
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    cwd: 'server/',
                    callback: function (nodemon) { 
                        nodemon.on('config:update', function () {
                            setTimeout(function() { 
                                require('open')('http://localhost:8000');
                            }, 1000);
                        });

                        nodemon.on('restart', function () {
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['server/**'], dest: 'dist/'},
                    {expand: true, src: ['package.json'], dest: 'dist/'},
                ],
            },
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'dist',
                            replacement: '<script src="libs.min.js"></script>\n<script src="client.min.js"></script>'
                        },
                        {
                            match: 'dev',
                            replacement: ''
                        },
                        {
                            match: 'livereload',
                            replacement: ''
                        },
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['html/index.html'], dest: 'dist/'}
                ]
            },
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'livereload',
                            replacement: '<script src="http://localhost:35729/livereload.js?snipver=1" type="text/javascript"></script>'
                        },
                        {
                            match: 'dist',
                            replacement: ''
                        },
                        {
                            match: 'dev',
                            replacement: '<script src="tmp/client.js"></script>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['html/index.html'], dest: './'}
                ]

            }
        },
        wiredep: {
            dev: {
                src: [
                    'index.html',  
                ],
            }
        },
        bower_concat:{
            all: {
                dest: 'tmp/libs.js'
            }
        },
        bower: {
            install: {
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangleProperties: true,
                reserveDOMCache: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            bower: {
                files: {
                    'dist/libs.min.js': ['tmp/libs.js']
                }
            },
            client: {
                files: {
                    'dist/client.min.js': ['tmp/client.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'client/*.js','server/*.js', 'share/*.js']
        },
        browserify: {
            main: {
                src: ['client/*.js', 'share/*.js'],
                dest: 'tmp/client.js'
            }
        },
    });
};
