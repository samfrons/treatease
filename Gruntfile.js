/**
 * Gruntfile
 *
 * If you created your Sails app with `sails new foo --linker`,
 * the following files will be automatically injected (in order)
 * into the EJS and HTML files in your `views` and `assets` folders.
 *
 * At the top part of this file, you'll find a few of the most commonly
 * configured options, but Sails' integration with Grunt is also fully
 * customizable.  If you'd like to work with your assets differently
 * you can change this file to do anything you like!
 *
 * More information on using Grunt to work with static assets:
 * http://gruntjs.com/configuring-tasks
 */

module.exports = function (grunt) {



  /**
   * CSS files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * By default, Sails also supports LESS in development and production.
   * To use SASS/SCSS, Stylus, etc., edit the `sails-linker:devStyles` task
   * below for more options.  For this to work, you may need to install new
   * dependencies, e.g. `npm install grunt-contrib-sass`
   */

  var cssFilesToInject = [
    // 'assets/css/**/*.css',
    // 'css/**/*.css',
    // 'layerslider/css/layerslider.css'

  ];


  /**
   * Javascript files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * To use client-side CoffeeScript, TypeScript, etc., edit the
   * `sails-linker:devJs` task below for more options.
   */

  var jsFilesToInject = [

    // Bring in the socket.io client
    'linker/js/socket.io.js',

    // then beef it up with some convenience logic for talking to Sails.js
    'linker/js/sails.io.js',

    // A simpler boilerplate library for getting you up and running w/ an
    // automatic listener for incoming messages from Socket.io.
    'linker/js/app.js',
    // Below, as a demonstration, you'll see the built-in dependencies
    // linked in the proper order order


    // *->    put other dependencies here   <-*

    // lodash
    'js/components/lodash/lodash.custom.js',
    'js/components/lodash/lodash.js',
//    'js/components/lodash/lodash.compat.js',

    // angular
    'js/components/angular/angular.js',
    'js/components/angular/angular-cookies.js',
    'js/components/angular/angular-resource.js',
    'js/components/angular/angular-sanitize.js',
    'js/components/angular/angular-route.js',
    'js/components/custom_angular_bootstrap.js',
    

    // bower components
    // 'js/components/angular-bootstrap/ui-bootstrap-tpls-0.6.0-SNAPSHOT.min.js',
//    'js/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

    // 'js/bower_components/angular-ui-utils/modules/showhide/showhide.js',
    // 'js/bower_components/angular-ui-utils/modules/event/event.js',
    // 'js/bower_components/angular-ui-utils/modules/keypress/keypress.js',
    // 'js/bower_components/angular-ui-map/ui-map.js',   // for ui-map v 0.5
    // 'js/bower_components/angular-ui-map/src/map.js',  // for ui-map v 0.4
    // 'js/bower_components/angularytics/dist/angularytics.min.js',
    // 'js/bower_components/angular-socket-io/socket.js',

    // All of the rest of your app scripts imported here
    'linker/**/*.js',
  ];


  /**
   * Client-side HTML templates are injected using the sources below
   * The ordering of these templates shouldn't matter.
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * By default, Sails uses JST templates and precompiles them into
   * functions for you.  If you want to use jade, handlebars, dust, etc.,
   * edit the relevant sections below.
   */

  var templateFilesToInject = [
    'linker/**/*.html'
  ];



  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  //
  // DANGER:
  //
  // With great power comes great responsibility.
  //
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  // Modify css file injection paths to use
  cssFilesToInject = cssFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
  });

  // Modify js file injection paths to use
  jsFilesToInject = jsFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
  });


  templateFilesToInject = templateFilesToInject.map(function (path) {
    return 'assets/' + path;
  });


  // Get path to core grunt dependencies from Sails
  var depsPath = grunt.option('gdsrc') || 'node_modules/sails/node_modules';
  grunt.loadTasks(depsPath + '/grunt-contrib-clean/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-copy/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-concat/tasks');
  grunt.loadTasks(depsPath + '/grunt-sails-linker/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-jst/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-watch/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-uglify/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-cssmin/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-less/tasks');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-lodash');
  // grunt.loadNpmTasks('grunt-webfont');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    lodash: {
      options: {
        include: ['extend', 'find', 'remove']
      },
      dev: {
        dest: 'assets/js/components/lodash/lodash.custom.js'
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './assets',
            src: [
              '**/*',
              '!archive/**',
              '!js/components/angular/docs/**', // angular docs are big
              '!js/components/angular/angular-scenario.js',
              '!js/bower_components/angular/**', // we don't use angular from bower

              // json3 is huge! only take the dist .js files
              '!js/bower_components/json3/**',
              'js/bower_components/json3/lib/*'
            ],
            dest: '.tmp/public'
          }
        ]
      },
      
      // TODO: CHANGE this to smth another
      fontawesome: {
        files: [ {
            expand : true,
            cwd    : './assets/linker/styles/fontawesome/font/',
            src    : ['*.*'],
            dest   : '.tmp/public/font/'
          }
        ]
      },      
      bootstrap: {
        files: [ {
            expand : true,
            cwd    : './assets/linker/styles/bootstrap/fonts/',
            src    : ['*.*'],
            dest   : '.tmp/public/fonts/'
          }
        ]
      },
      // end TODO

      build: {
        files: [
          {
            expand: true,
            cwd: '.tmp/public',
            src: ['**/*'],
            dest: '.tmp'
          }
        ]
      },
      wwwToTmp: {
        files: [
          {
            expand: true,
            cwd: 'www',
            src: ['**/*'],
            dest: '.tmp/public'
          }
        ]
      }
    },

    clean: {
      dev: ['.tmp/**'],
      build: ['www'],
      sources:['.tmp/public/concat', '.tmp/public/linker', '.tmp/public/js/**']
    },

    jst: {
      dev: {
        options: {
          templateSettings: {
            interpolate: /\{\{(.+?)\}\}/g
          }
        },
        files: {
          '.tmp/public/jst.js': templateFilesToInject
        }
      }
    },

    less: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'assets/styles/',
            src: ['*.less'],
            dest: '.tmp/public/styles/',
            ext: '.css'
          }, {
            expand: true,
            cwd: 'assets/linker/styles/',
            src: ['*.less'],
            dest: '.tmp/public/linker/styles/',
            ext: '.css'
          }
        ]
      }
    },

    concat: {
      js: {
        src: jsFilesToInject,
        dest: '.tmp/public/concat/production.js'
      },
      css: {
        src: cssFilesToInject,
        dest: '.tmp/public/concat/production.css'
      }
    },

    uglify: {
      dist: {
        src: ['.tmp/public/concat/production.js'],
        dest: '.tmp/public/min/production.js'
      },
      options: {
        mangle: false
      }
    },

    cssmin: {
      dist: {
        src: ['.tmp/public/concat/production.css'],
        dest: '.tmp/public/min/production.css'
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'assets/linker/styles',
          cssDir: '.tmp/public/linker/styles',
          generatedImagesDir: '.tmp/public/linker/images/generated',
          imagesDir: 'assets/linker/images',
          javascriptsDir: 'assets/linker/js',
          fontsDir: 'assets/linker/styles/fonts',
          importPath: 'assets/js/bower_components',
          httpImagesPath: '/linker/images',
          httpGeneratedImagesPath: '/linker/images/generated',
          httpFontsPath: '/linker/styles/fonts',
          relativeAssets: false,
          debugInfo: true
        }
      }
    },

    'sails-linker': {

      devJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/**/*.html': jsFilesToInject,
          'views/**/*.html': jsFilesToInject,
          'views/**/*.ejs': jsFilesToInject
        }
      },

      prodJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
          'views/**/*.html': ['.tmp/public/min/production.js'],
          'views/**/*.ejs': ['.tmp/public/min/production.js']
        }
      },

      devStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '<link rel="prefetch stylesheet" href="%s">',
          appRoot: '.tmp/public'
        },

        // cssFilesToInject defined up top
        files: {
          '.tmp/public/**/*.html': cssFilesToInject,
          'views/**/*.html': cssFilesToInject,
          'views/**/*.ejs': cssFilesToInject
        }
      },

      prodStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '<link rel="prefetch stylesheet" href="%s">',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/min/production.css'],
          'views/**/*.html': ['.tmp/public/min/production.css'],
          'views/**/*.ejs': ['.tmp/public/min/production.css']
        }
      },

      // Bring in JST template object
      devTpl: {
        options: {
          startTag: '<!--TEMPLATES-->',
          endTag: '<!--TEMPLATES END-->',
          fileTmpl: '<script type="text/javascript" src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/jst.js'],
          'views/**/*.html': ['.tmp/public/jst.js'],
          'views/**/*.ejs': ['.tmp/public/jst.js']
        }
      },


      /*******************************************
       * Jade linkers (TODO: clean this up)
       *******************************************/

      devJsJADE: {
        options: {
          startTag: '// SCRIPTS',
          endTag: '// SCRIPTS END',
          fileTmpl: 'script(type="text/javascript", src="%s")',
          appRoot: '.tmp/public'
        },
        files: {
          'views/**/*.jade': jsFilesToInject
        }
      },

      prodJsJADE: {
        options: {
          startTag: '// SCRIPTS',
          endTag: '// SCRIPTS END',
          fileTmpl: 'script(type="text/javascript", src="%s")',
          appRoot: '.tmp/public'
        },
        files: {
          'views/**/*.jade': ['.tmp/public/min/production.js']
        }
      },

      devStylesJADE: {
        options: {
          startTag: '// STYLES',
          endTag: '// STYLES END',
          fileTmpl: 'link(rel="stylesheet", href="%s")',
          appRoot: '.tmp/public'
        },
        files: {
          'views/**/*.jade': cssFilesToInject
        }
      },

      prodStylesJADE: {
        options: {
          startTag: '// STYLES',
          endTag: '// STYLES END',
          fileTmpl: 'link(rel="stylesheet", href="%s")',
          appRoot: '.tmp/public'
        },
        files: {
          'views/**/*.jade': ['.tmp/public/min/production.css']
        }
      },

      // Bring in JST template object
      devTplJADE: {
        options: {
          startTag: '// TEMPLATES',
          endTag: '// TEMPLATES END',
          fileTmpl: 'script(type="text/javascript", src="%s")',
          appRoot: '.tmp/public'
        },
        files: {
          'views/**/*.jade': ['.tmp/public/jst.js']
        }
      }
      /************************************
       * Jade linker end
       ************************************/
    },

    watch: {
      api: {
        // API files to watch:
        files: ['api/**/*']
      },
      assets: {
        options: {
//          livereload: true,
//          interrupt: true
        },

        // Assets to watch:
        files: ['assets/**/*', 'views/**/*'],

        // When assets are changed:
        tasks: [
          'timer:watch_assets',
          'compileAssets', 'linkAssets',
          'logger:watch_assets:timer', 'logger:Ready To Go:beep'
        ]
      }
    }
  });

  var moment = require('moment');
  var timers = {};
  grunt.registerTask('timer', 'description', function (timer) {
    timer = timer || 'default';
    timers[timer] = moment();
  });

  grunt.registerTask('logger', 'logger description', function (msg, special, pre) {
    pre = pre || '';
    var timer = msg;
    grunt.log.writeln(
      'Logger: ' + pre
      + (special==='timer' ? ''+(moment().diff(timers[timer],'seconds',true)+'s ') : '')
      + msg
      + (special==='beep' ? '!!\007\007' : '')
    );
  });

  // When Sails is lifted:
  grunt.registerTask('default', [
    'clean:dev',
    'compass:dev',
    'compileAssets',
    'linkAssets',
    // 'copy:build',
    'logger:Ready To Go:beep',
    'watch:assets'
  ]);
//  grunt.registerTask('default', [
//    'sails-linker:prodJs',
//    'sails-linker:prodStyles',
//    'sails-linker:devTpl',
////    'compileAssets',
////    'linkAssets',
//    'logger:Ready To Go:beep',
////    'watch:assets'
//  ]);

  grunt.registerTask('compileAssets', [
    'timer:compileAssets',
    'timer:clean_dev', 'clean:dev', 'logger:clean_dev:timer',
    'jst:dev',
//    'less:dev',
    'timer:compass_dev', 'compass:dev', 'logger:compass_dev:timer',
    'timer:copy_dev', 'copy:dev', 'logger:copy_dev:timer',
    'logger:compileAssets:timer:~~'
  ]);

  grunt.registerTask('linkAssets', [
    'timer:linkAssets',
    // Update link/script/template references in `assets` index.html
    'sails-linker:devJs',
    'sails-linker:devStyles',
    'sails-linker:devTpl',
//    'sails-linker:devJsJADE',
//    'sails-linker:devStylesJADE',
//    'sails-linker:devTplJADE'
    'logger:linkAssets:timer:~~'

  ]);


  // Build the assets into a web accessible folder.
  // (handy for phone gap apps, chrome extensions, etc.)
  grunt.registerTask('build', [
    'compileAssets',
    'linkAssets',
    'clean:build',
    // 'copy:build'
  ]);
  grunt.registerTask('build-deploy', [
    'clean:dev', //clean tmp
    'jst:dev',
//    'less:dev',
    'compass:dev',
    'copy:dev',
    'copy:fontawesome',
    'copy:bootstrap',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'sails-linker:devTpl',
//      'sails-linker:prodJsJADE',
//      'sails-linker:prodStylesJADE',
//      'sails-linker:devTplJADE'

    // 'copy:build',
    'clean:build', //clean www
    'clean:sources' //clean concat and linker from .tmp/public
    // 'clean:dev'
  ]);

//=====================================if addicaid starts on the localhost (production mode only)
// grunt.registerTask('prod', [
//     'logger:starting prod',
//     'clean:dev', //clean tmp
//     'jst:dev',
//     'compass:dev',
//     'copy:dev',
//     'copy:fontawesome',
//     'copy:bootstrap',
//     'concat',
//     'uglify',
//     'cssmin',
//     'sails-linker:prodJs',
//     'sails-linker:prodStyles',
//     'sails-linker:devTpl',

//     // 'copy:build',
//     'clean:build', //clean www
//     'clean:sources', //clean concat and linker from .tmp/public
//     // 'clean:dev'
//     'logger:finished grunt'
//   ]);


//  When sails is lifted in production
  grunt.registerTask('prod', [
    'logger:starting prod',
    //'clean:dev',
    // 'logger:copying wwwToTmp',
    //'copy:wwwToTmp',
    'logger:finished grunt'
  ]);



  grunt.registerTask('prod-old', [
    'clean:dev',
    'jst:dev',
//    'less:dev',
    'compass:dev',
    'copy:dev',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'sails-linker:devTpl',
  ]);

//  // When API files are changed:
//  grunt.event.on('watch', function(action, filepath) {
//    grunt.log.writeln(filepath + ' has ' + action);
//
//    // Send a request to a development-only endpoint on the server
//    // which will reuptake the file that was changed.
//    var baseurl = grunt.option('baseurl');
//    var gruntSignalRoute = grunt.option('signalpath');
//    var url = baseurl + gruntSignalRoute + '?action=' + action + '&filepath=' + filepath;
//
//    require('http').get(url)
//      .on('error', function(e) {
//        console.error(filepath + ' has ' + action + ', but could not signal the Sails.js server: ' + e.message);
//      });
//  });
};