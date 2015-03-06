module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      // vendor libs
      'vendor/angular/angular.js',
      // ocLazyLoad needs to be loaded early for it to work in tests
      'vendor/oclazyload/dist/ocLazyLoad.js',
      'vendor/ui-router/release/angular-ui-router.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
      'vendor/angular-local-storage/dist/angular-local-storage.js',
      'vendor/highlightjs/highlight.pack.js',
      'vendor/angular-highlightjs/angular-highlightjs.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/ngprogress/build/ngProgress.js',
      'vendor/angular-debounce/dist/angular-debounce.js',
      // modules
      'src/**/!(*.test).js',
      // tests
      'src/**/*.test.js',
      // application view templates
      { pattern: 'src/**/*.html', included: false }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.test).js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    plugins: [
      'karma-mocha',
      'karma-sinon-chai',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],

    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        { type: 'json',
          file: 'ui-coverage.json'
        },
        { type: 'text',
          file: null
        }
      ]
    },

    // web server port
    port: 8080,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });

  config.set({
    proxies: {
        '/element/': 'http://localhost:' + config.port + '/base/src/element/'
    }
  });

};
