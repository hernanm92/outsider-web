module.exports = function(grunt) {

  var fileList = ["public/javascripts/angular-css-injector.js",
  "public/javascripts/ui-bootstrap-tpls-0.13.0.min.js",
  "public/javascripts/angular-selection-model-custom.js",
  "public/javascripts/jquery.min.js",
  "public/javascripts/pageslide.min.js",
  "public/javascripts/dirPagination.min.js",
  "public/javascripts/factory/application.js",
  "public/javascripts/factory/build.js",
  "public/javascripts/factory/deploy.js",
  "public/javascripts/factory/domain.js",
  "public/javascripts/factory/scope.js",
  "public/javascripts/factory/notification.js",
  "public/javascripts/factory/rules.js",
  "public/javascripts/factory/log.js",
  "public/javascripts/factory/watch.js",
  "public/javascripts/factory/service.js",
  "public/javascripts/factory/interop-version.js",
  "public/javascripts/factory/command.js",
  "public/javascripts/factory/action_history.js",
  "public/javascripts/config.js",
  "public/javascripts/app.js",
  "public/javascripts/controller/base.js",
  "public/javascripts/controller/cache-service.js",
  "public/javascripts/controller/menu.js",
  "public/javascripts/controller/scopes.js",
  "public/javascripts/controller/applications.js",
  "public/javascripts/controller/builds.js",
  "public/javascripts/controller/deploy-create.js",
  "public/javascripts/controller/deploy-status.js",
  "public/javascripts/controller/deploy-list.js",
  "public/javascripts/controller/deploy-history.js",
  "public/javascripts/controller/notifications.js",
  "public/javascripts/controller/rules.js",
  "public/javascripts/controller/watch.js",
  "public/javascripts/controller/logs.js",
  "public/javascripts/controller/metrics.js",
  "public/javascripts/controller/alerts.js",
  "public/javascripts/controller/interop-version.js",
  "public/javascripts/directive/logs.js",
  "public/javascripts/directive/informationBox.js",
  "public/javascripts/service/applicationService.js",
  "public/javascripts/service/eventService.js",
  "public/javascripts/service/callbackHandler.js",
  "public/javascripts/service/httpErrorHandler.js",
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
  "public/javascripts/metric/highlight-charts/highcharts.js",
  "public/javascripts/metric/highlight-charts/exporting.js",
  "public/javascripts/metric/highlight-charts/no-data-to-display.js",
  "public/javascripts/metric/highlight-charts/sand-signika-theme.js",
  "public/javascripts/metric/chart-plugin.js",
  "public/javascripts/java-thread-analyzer.js",
  "public/javascripts/thread_dump_render.js",
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
