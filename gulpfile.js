const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
// const webp = require('gulp-webp');
// const webphtml = require('gulp-webp-html');
// const webpCss = require('gulp-webp-css');
// const webpcss = require("gulp-webpcss");
// const svgo = require('gulp-svg-sprite');
// const svgSprite = require('gulp-svg-sprite');



const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

task('del', function () {
    return src(`${DIST_PATH}/*`, { read: false })
        .pipe(clean());
});

task('copy:html', function () {
    return src(`${SRC_PATH}/*.html`)
        // .pipe(webphtml())            // авто префикс для webp
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});


task('styles', function () {
    return src([...STYLES_LIBS, `${SRC_PATH}/css/main.scss`])
        // .pipe(sourcemaps.init())
        .pipe(concat('main.min.scss'))          // склеиваем файлы
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))   // компилируем sass
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())                     // media запрос
        .pipe(cleanCSS())                 // сжимает css файл
        // .pipe(sourcemaps.write())
        // .pipe(webpCss())
        .pipe(dest(`${DIST_PATH}/css/`))  // !!! /css
        .pipe(reload({ stream: true }));
});


task('scripts', function () {
    return src([
        // ...JS_LIBS, `${SRC_PATH}/scripts/*.js`
        `${SRC_PATH}/scripts/*.js`
    ])
        // .pipe(sourcemaps.init())
        .pipe(concat(`main.min.js`))             // куда клеим
        .pipe(babel({
            presets: ['@babel/env']              // поддержка старых версий браузеров
        }))
        .pipe(uglify())                         // сжимаем js
        // .pipe(sourcemaps.write())
        .pipe(dest(`${DIST_PATH}/scripts/`))      // в какую папу
        .pipe(reload({ stream: true }));
});

task('images', function () {
    return src(`${SRC_PATH}/img/**/*`)
        // .pipe(webp({
        //     quality: 70
        // }))
        .pipe(dest(`${DIST_PATH}/img/`))
        .pipe(src(`${SRC_PATH}/img/**/*`))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 - 7 lvl
            })
        )
        .pipe(dest(`${DIST_PATH}/img/`))   // !!! /img
        .pipe(reload({ stream: true }));
});


task('copy:svg', function () {
    return src(`${SRC_PATH}/*.svg`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task('copy:video', function () {
    return src(`${SRC_PATH}/video/*`)
        .pipe(dest(`${DIST_PATH}/video/`))
        .pipe(reload({ stream: true }));
});

task('server', function () {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

watch(`${SRC_PATH}/css/**/*.scss`, series('styles'));
watch(`${SRC_PATH}/*.html`, series('copy:html'));
watch(`${SRC_PATH}/scripts/*.js`, series('scripts'));
// watch(`${SRC_PATH}/img/**/*`, series('images'));
// watch('src/images/icons/*.svg', series('icons')); SVG


task('default', series('del', parallel('copy:html', 'scripts', 'images', 'styles', 'copy:svg', 'copy:video'), 'server'));




// svg sprite

// task('icons', function () {
//     return src('src/img/sprite.svg')
//         .pipe(svgo({
//             plugins: [
//                 {
//                     removeAttrs: {
//                         attrs: "(fill|stroke|style|width|height|data.*)"
//                     }
//                 }

//             ]
//         })
//         )
//         .pipe(svgSprite({
//             mode: {
//                 symbol: {
//                     sprite: "../sprite.svg"
//                 }
//             }
//         }))
//         .pipe(dest('dist/images/icons'))

// })