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
    "css/font-awesome.css",
    "css/bootstrap.css",
    "css/style.css",
    "css/colors/brown.css",
    "layerslider/css/layerslider.css",
    "css/quiz-style.css",
    
  ];

  /**
   * Javascript files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * To use client-side CoffeeScript, TypeScript, etc., edit the
   * `sails-linker:devJs` task below for more options.
   */

  var jsFilesToInject = [
     "js/jquery.js",
     "js/bootstrap.min.js",
     "js/jquery.unveilEffects.js",   
     "js/retina-1.1.0.js",
     "js/jquery.hoverdir.js",
     "js/owl.carousel.js",  
     "js/jetmenu.js",   
     "js/jquery.hoverex.min.js",
     "js/jquery.prettyPhoto.js",
     "js/jquery.isotope.min.js",
     "js/custom.js",
     "/linker/js/socket.io.js",
     "/linker/js/sails.io.js",
     "/linker/js/app.js",
     "/js/components/lodash/lodash.custom.js",
     "/js/components/lodash/lodash.js",
     "/js/components/angular/angular.js",
     "/js/components/angular/angular-cookies.js",
     "/js/components/angular/angular-resource.js",
     "/js/components/angular/angular-sanitize.js",
     "/js/components/angular/angular-route.js",
     "/js/components/custom_angular_bootstrap.js",
     "/linker/js/app/app.js",
     "/linker/js/app/controllers/quiz.js",
     "/linker/js/app/controllers/video.js",
     "/linker/js/app/directives/owl-carousel.js",
     "/linker/js/routingConfig.js",
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
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
    },

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
    },

    clean: {
      dev: ['.tmp/**'],
      sources:['.tmp/public/concat', '.tmp/public/linker', '.tmp/public/js/**']
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
          // '.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
          // 'views/**/*.html': ['.tmp/public/min/production.js'],
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
    },
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
    'copy:dev',
    'concat',
    'linkAssets',
    'logger:Ready To Go:beep',
    'watch:assets'
  ]);

//   grunt.registerTask('compileAssets', [
//     'timer:compileAssets',
//     'timer:clean_dev', 'clean:dev', 'logger:clean_dev:timer',
//     'jst:dev',
// //    'less:dev',
//     'timer:compass_dev', 'compass:dev', 'logger:compass_dev:timer',
//     'timer:copy_dev', 'copy:dev', 'logger:copy_dev:timer',
//     'logger:compileAssets:timer:~~'
//   ]);

  grunt.registerTask('linkAssets', [
    'timer:linkAssets',
    // Update link/script/template references in `assets` index.html
    'sails-linker:devJs',
    'sails-linker:devStyles',
    'sails-linker:devTpl',
    'logger:linkAssets:timer:~~'

  ]);


  // Build the assets into a web accessible folder.
  // (handy for phone gap apps, chrome extensions, etc.)
  grunt.registerTask('build-deploy', [
    'clean:dev', //clean tmp
    'copy:dev',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'sails-linker:devTpl',

    // 'clean:sources' //clean concat and linker from .tmp/public
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
    'logger:starting prod',
    'logger:starting prod',
    'logger:starting prod',
    // //'clean:dev',
    // // 'logger:copying wwwToTmp',
    // //'copy:wwwToTmp',
    // 'logger:finished grunt'


    'clean:dev', //clean tmp
    'copy:dev',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'sails-linker:devTpl',

    // 'clean:sources', //clean concat and linker from .tmp/public
    // 'clean:dev'
    'logger:Ready To Go',
  ]);

};