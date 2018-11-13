const { series, parallel, src, dest } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const mincss = require('gulp-csso')
const rename = require('gulp-rename')
const del = require('del')
sass.compiler = require('node-sass')

function clean () {
  return del('./build')
}

function js () {
  return src('./js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./build/js'))
}

function css () {
  return src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(mincss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./build/css'))
}

exports.default = series(clean, parallel(js, css))
