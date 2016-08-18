/*!
 * Adams Gruntfile
 * @author Adam
 */



(function() {
    'use strict';
}());


module.exports = function(grunt) {

    grunt.initConfig({

        // Project configuration
        pkg: grunt.file.readJSON('package.json'),

        // Compile Sass
        sass: {
            options: {
                sourceMap: true,
                sourceComments: false,
                style:'compressed'
            },
            dist: {
                files: {
                    'dist/css/app.css': 'dev/scss/app.scss'
                }
            }
        },

        postcss: {
           options: {
             map: {
                 inline: false, // save all sourcemaps as separate files...
             },

             processors: [
               require('pixrem')(), // add fallbacks for rem units
               require('autoprefixer')({browsers: 'last 8 versions'}), // add vendor prefixes
             ]
           },
           dist: {
            src: 'dist/css/*.css'
           }
         },

         cssmin: {
               dist: {
                  options: {
                     banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
                  },
                  files: {
                     'dist/css/styles.min.css': ['dist/css/*.css']
                  }
              }
            },

        // Copy html files
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: [
                        '**/*.html',
                        'images/{,*/}*.{png,jpg,gif}',
                        'fonts/*.{woff,woff2}'
                    ],
                    dest: 'dist'
                }]
            }
        },

        imagemin: {
               dist: {
                  options: {
                    optimizationLevel: 5
                  },
                  files: [{
                     expand: true,
                     cwd: 'dev/images',
                     src: ['**/*.{png,jpg,gif}'],
                     dest: 'dist/images'
                  }]
               }
            },

        concat: {
            options: {},
            dist: {
                src: ['dev/js/*.js'],
                dest: 'dist/js/main.js'
            }
        },

        uglify: {
            options: {

            },
            dist: {
                files: {
                    'dist/js/main.min.js': 'dist/js/main.js'
                }
            }
        },

        //Browersync
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "dist/css/app.css",
                        "dist/js/*.js",
                        "dist/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./dist"
                    }
                }
            }
        },

        // Watch and build
        watch: {

            sass: {
                files: 'dev/scss/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },

            html: {
                files: ['dev/*.html'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            },

             js: {
                files: ['dev/js/*.js'],
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },

            images: {
                files: ['dist/images/{,*/}*.{png,jpg,gif,svg}'],
                options: {
                    livereload: true
                }
            }
        },

    });

    // Load dependencies

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Run tasks
    grunt.registerTask('default', ['sass','postcss','concat', 'cssmin', 'uglify', 'copy', 'imagemin','browserSync', 'watch' ]);

};