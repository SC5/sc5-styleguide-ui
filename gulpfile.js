var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    bower = require('gulp-bower'),
    templateCache = require('gulp-angular-templatecache'),
    mainBowerFiles = require('main-bower-files'),
    neat = require('node-neat'),
    please = require('gulp-pleeease'),
    sass = require('gulp-sass'),
    merge = require('merge2'),
    sourceMaps = require('gulp-sourcemaps'),
    webServer = require('gulp-webserver'),
    sassSrc = ['resources/sass/app.scss'],
    buildDir = path.join(__dirname, 'build'),
    testAppDir = path.join(__dirname, 'app-test');

gulp.task('build', ['build:vendor', 'build:js', 'build:sass']);

gulp.task('build:js', function() {
  return merge(
    gulp.src('src/**/!(*.test).js'),
    gulp.src('src/**/*.html')
      .pipe(templateCache({ module: 'sc5.styleguide.main.templates' }))
      .pipe(concat('templates.js'))
  ).pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(concat('sc5-styleguide.js'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('build:sass', function() {
  return gulp.src(sassSrc)
    .pipe(sass({ includePaths: neat.includePaths }))
    .pipe(sourceMaps.init())
    .pipe(please({ minifier: false }))
    .pipe(concat('sc5-styleguide.css'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('build:vendor', ['bower'], function() {
  return gulp.src(mainBowerFiles({filter: /\.js/}))
    .pipe(plumber())
    .pipe(concat('sc5-styleguide.vendor.js'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('dev', ['build'], function() {
  gulp.watch('src/**/*', ['build']);
  gulp.watch('resources/sass', ['build:sass']);
  gulp.src([testAppDir, buildDir, 'resources'])
    .pipe(webServer({
      host: 'localhost',
      port: 3000,
      fallback: 'index.html'
    }));
});
