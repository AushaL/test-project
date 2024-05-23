const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const rollup = require('@rollup/stream');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const buffer = require('vinyl-buffer');

const paths = {
  pages: 'source/pages/*.pug',
  css: 'source/sass/style.scss',
  js: 'source/js/custom-scripts/**/*.js',
  img: 'source/img/',
};

gulp.task('pug2html', () => pipeline(
  gulp.src(paths.pages),
  pug({ pretty: true }),
  gulp.dest('build'),
  browserSync.stream()
));

gulp.task('styles', () =>
  pipeline(
    gulp.src(paths.css),
    plumber(),
    sourcemaps.init(),
    sass(),
    gcmq(),
    postcss([autoprefixer]),
    csso(),
    rename('style.min.css'),
    sourcemaps.write('.'),
    gulp.dest('build/css'),
    browserSync.stream()
  )
);

gulp.task('scripts', () => rollup({
  input: './source/js/main.js',
  plugins: [commonjs(), nodeResolve()],

  output: {
    format: 'iife'
  }
})
  .pipe(source('main.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.stream())
);

gulp.task('refresh', (done) => {
  browserSync.reload();
  done();
});

gulp.task('server', () => {
  browserSync.init({
    server: 'build/',
    cors: true,
    open: false,
    notify: false,
    ui: false,
    debugInfo: false,
  });
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/js/**/*.js', gulp.series('scripts', 'refresh'));
  gulp.watch('source/pages/**/*.pug', gulp.series('pug2html', 'refresh'));
});

gulp.task('copy', () =>
  gulp.src(
    [
      'source/fonts/**/*.{woff,woff2}',
      'source/js/*.js',
      'source/img/**',
      'source/*.ico',
    ],
    {
      base: 'source'
    }
  )
    .pipe(gulp.dest('build'))
);

gulp.task('clean', () => del('build'));

gulp.task(
  'build',
  gulp.series('clean', 'copy', gulp.parallel('styles', 'scripts', 'pug2html'))
);

gulp.task('start', gulp.series('build', 'server'));
