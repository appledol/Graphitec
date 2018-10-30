'use strict';

//Подключаем плагины
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber'); 
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');


gulp.task('sass', function(){
    gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
//    .pipe(postcss([
//        autoprefixer({browsers: [
//            'last 10 version',
//            'last 10 Chrome versions',
//            'last 10 Firefox versions',
//            'last 10 Opera versions',
//            'last 10 Edge versions'
//        ]
//            
//        }),
//        mqpacker({
//            sort: true
//        })
//    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("css"))
     gulp.src("sass/responsive.scss")
    .pipe(plumber())
    .pipe(sass())
//    .pipe(postcss([
//        autoprefixer({browsers: [
//            'last 10 version',
//            'last 10 Chrome versions',
//            'last 10 Firefox versions',
//            'last 10 Opera versions',
//            'last 10 Edge versions'
//        ]
//            
//        }),
//        mqpacker({
//            sort: true
//        })
//    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename('responsive.min.css'))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({stream: true}));
    
});

gulp.task('serve', ['sass'], function() {
    server.init({
        server: '.'
    });
    
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('*.html')
    on('change', server.reload);
});


//Минификация картинок
gulp.task('images', function(){
    return gulp.src('img/**/*.{png,jpg,gif}', {cwd: process.cwd()}) 
    
    .pipe(imagemin([
         imagemin.optipng({optimizationLevel: 3}), // 1- max 10 - не сжимать
         imagemin.jpegtran({progressive: true})
         ]))
    
    .pipe(gulp.dest('img',{cwd: process.cwd()}));картинки
});




gulp.task('default', [ 'html', 'css', 'js' ]);