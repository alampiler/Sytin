var gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    del             = require('del'),
    renameCSS       =require('gulp-rename'),
    cleanCSS        =require('gulp-clean-css'),
    concat          =require('gulp-concat'),
    cleanJS         =require('gulp-uglify'),
    // rigger          =require('gulp-rigger'),
    imagemin        =require('gulp-imagemin'),
    filesize        =require('gulp-filesize'),
    cache           =require('gulp-cache'),
    minpng          =require('imagemin-pngquant'),
    minsvg          =require('imagemin-svgo'),
    minjpg          =require('imagemin-mozjpeg'),
    mingif          =require('imagemin-gifsicle');


    // gulp.task('htmlBuild', function () {
    //     gulp.src('app/**/*.html')
    //         .pipe(rigger())
    //         .pipe(gulp.dest('dist/'))
    // });


    gulp.task('scss', () => {
       return gulp.src(['app/scss/reset.scss', 'app/scss/main.scss', 'app/scss/fonts.scss', 'app/scss/all-ie.scss'])
           .pipe(scss({
               includePaths: require('node-normalize-scss').includePaths
           }).on('error', scss.logError))
           .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
           .pipe(gulp.dest('app/css'))
           .pipe(browserSync.reload({stream: true}))
    });

    gulp.task('fonts', () => {
       return gulp.src('app/libs/font-awesome/webfonts/*')
           .pipe(gulp.dest('app/fonts'))
    });

    gulp.task('server', () => {
        browserSync({
            server: {
                baseDir: './app/'
            }
        });
    });
    gulp.task('minImage', () => {
        return gulp.src('app/img/*')
            .pipe(cache(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use:[minpng(), mingif(), minjpg(), minsvg()]
            })))
           .pipe(gulp.dest('app/img'))
    });

    gulp.task('minCSS', ['scss'], () => {
       return gulp.src('app/css/libs.css')
           .pipe(cleanCSS())
           .pipe(filesize())
           .pipe(renameCSS({suffix: '.min'}))
           .pipe(filesize())
           .pipe(gulp.dest('app/css'))
    });

    gulp.task('minJS', () => {
        return gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/libs/font-awesome/js/all.min.js'])
            .pipe(filesize())
            .pipe(concat('libs.min.js'))
            .pipe(cleanJS())
            .pipe(filesize())
            .pipe(gulp.dest('app/js'))
    });

    gulp.task('minFiles', ['minCSS', 'minJS', 'minImage']);

    gulp.task('cleanDist', () => {
       return del.sync('dist')
    });

    gulp.task('cleanCache', () => {
       return cache.clearAll('dist')
    });

    gulp.task('watch', ['server', 'minFiles'], () => {
        gulp.watch('app/**/*.html', browserSync.reload);
        gulp.watch('app/scss/**/*.scss', ['scss']);
        gulp.watch('app/js/**/*.js', browserSync.reload);
    });

    gulp.task('build', ['cleanDist', 'minFiles'], () => {
       var buildHTML = gulp.src('app/**/*.html')
            .pipe(gulp.dest('dist'));
       var buildCSS = gulp.src(['app/css/main.css', 'app/css/libs.min.css', 'app/css/reset.css'])
           .pipe(gulp.dest('dist/css'));
       var buildJS = gulp.src(['app/js/main.js', 'app/js/libs.min.js'])
           .pipe(gulp.dest('dist/js'));
       var buildFonts = gulp.src('app/fonts/**/*.*')
           .pipe(gulp.dest('dist/fonts'));
        var buildImages = gulp.src('app/img/*')
            .pipe(gulp.dest('dist/img'));
    });


    gulp.task('default', ['watch']);