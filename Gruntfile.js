module.exports = function(grunt) {

  var fileList = ["public/javascripts/angular-css-injector.js",
  "public/javascripts/ui-bootstrap-tpls-0.13.0.min.js",
  "public/javascripts/angular-selection-model-custom.js",
  "public/javascripts/jquery.min.js",
  "public/javascripts/pageslide.min.js",
  "public/javascripts/dirPagination.min.js",
  "public/javascripts/factory/application.js",
  "public/javascripts/config.js",
  "public/javascripts/app.js",

  "public/javascripts/controller/base.js",
  "public/javascripts/controller/menu.js",
  "public/javascripts/controller/applications.js",

  "public/javascripts/service/applicationService.js",
  "public/javascripts/service/eventService.js",
  "public/javascripts/service/callbackHandler.js",
  "public/javascripts/service/failedRequestHandler.js",

  "public/javascripts/ng-clip.min.js",
  "public/javascripts/zero-clipboard.min.js",
  "public/javascripts/bootstrap.min.js",
  "public/javascripts/angular-growl.min.js",
  "public/javascripts/select.min.js",
  "public/javascripts/angular-sanitize.min.js",
  "public/javascripts/ng-FitText.js",
  "public/javascripts/moment.min.js",
  "public/javascripts/angular-moment.min.js",
  "public/javascripts/scrollglue.min.js",
  "public/javascripts/angular-ui-switch.js"]

  var cssFileList = [
  "public/stylesheets/angular-growl.min.css",
  "public/stylesheets/loading-button.min.css",
  "public/stylesheets/awesome-bootstrap-checkbox.min.css",
  "public/stylesheets/loaders.min.css",
  "public/stylesheets/select.min.css",
  "public/stylesheets/font-awesome.min.css",
  "public/stylesheets/angular-ui-switch.css"]

  var stageCss = ["public/stylesheets/*.css",
  //"public/stylesheets/angular-growl.min.css",
  //"public/stylesheets/loading-button.min.css",
  //"public/stylesheets/awesome-bootstrap-checkbox.min.css",
  //"public/stylesheets/loaders.min.css",
  "public/stylesheets/stage/bootstrap.min.css",
  "public/stylesheets/stage/fury.css"
  ]
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      ugly:{
        options: {
          processImport: true
        },
        files: {
          'public/minified/all.min.css': cssFileList
        }
      },
      beautiful:{
        options: {
          advanced: false,
          keepBreaks: true,
          processImport: true
        },
        files: {
          'public/minified/all.min.css': cssFileList
        }
      },
    },
    jsvalidate: {
      options:{
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      targetName:{
        files:{
          src:fileList
        }
      }
    },
    uglify: {
      ugly: {
        options: {
          mangle: false,
          compress: true
        },
        files: {
          'public/minified/all.min.js': fileList,
        }
      },
      beautiful: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'public/minified/all.min.js': fileList
        }
      }
    },
    watch: {
      scripts: {
        files: 'public/javascripts/**/*.js',
        tasks: ['development'],
        options: {
          event: ['added', 'deleted', 'changed'],
          livereaload: true
        }
      }
    },
    ngconstant: {
      development: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://localhost:5000',
            styleFolder: 'common',
            applicationPrefix: 'development-'
          }
        }
      },
      production: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://fury-api.melifrontends.com',
            styleFolder: 'common',
            applicationPrefix: ''
          }
        }
      },
      stage: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://fury-api.stage.com:80',
            styleFolder: 'stage',
            applicationPrefix: 'stage-'
          }
        }
      }
    }
  });

  var target = grunt.option('target') || 'development';
  grunt.registerTask('development', ['ngconstant:' + target, 'jsvalidate', 'uglify:beautiful', 'cssmin:beautiful']);

  grunt.registerTask('production', ['ngconstant:production','uglify:ugly', 'cssmin:ugly']);

  grunt.registerTask('stage', ['ngconstant:stage','uglify:beautiful', 'cssmin:beautiful']);

  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-jsvalidate');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');
};
