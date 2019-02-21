var gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    del             = require('del'),
    renameCSS       =require('gulp-rename'),
    rename          =require('gulp-rename'),
    cleanCSS        =require('gulp-clean-css'),
    concat          =require('gulp-concat'),
    cleanJS         =require('gulp-uglify'),
    imagemin        =require('gulp-imagemin'),
    filesize        =require('gulp-filesize'),
    cache           =require('gulp-cache'),
    minpng          =require('imagemin-pngquant'),
    minsvg          =require('imagemin-svgo'),
    minjpg          =require('imagemin-mozjpeg'),
    mingif          =require('imagemin-gifsicle'),
    uglify          =require('gulp-uglify');


    gulp.task('scss', () => {
       return gulp.src(['app/scss/reset.scss', 'app/scss/main.scss'])
           .pipe(scss({
               includePaths: require('node-normalize-scss').includePaths
           }).on('error', scss.logError))
           .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
           .pipe(gulp.dest('app/css'))
           .pipe(browserSync.reload({stream: true}))
    });

    gulp.task('fonts', () => {
       return gulp.src('node_modules/video.js/dist/font/*')
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

    gulp.task('minMainCSS', ['scss'], () => {
      return gulp.src('app/css/main.css')
        .pipe(cleanCSS())
        .pipe(filesize())
        .pipe(renameCSS({suffix: '.min'}))
        .pipe(filesize())
        .pipe(gulp.dest('app/css'))
    });

    gulp.task('minJS', () => {
        return gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/libs/ion.rangeSlider/js/ion.rangeSlider.min.js', "node_modules/video.js/dist/video.min.js"])
            .pipe(filesize())
            .pipe(concat('libs.min.js'))
            .pipe(cleanJS())
            .pipe(filesize())
            .pipe(gulp.dest('app/js'))
    });

    gulp.task('minMainJS', ['scss'], () => {
      return gulp.src('app/js/main.js')
        .pipe(filesize())
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(filesize())
        .pipe(gulp.dest('app/js'))
    });

    gulp.task('minFiles', ['minCSS', 'minJS', 'minImage', 'minMainCSS']);

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
       var buildCSS = gulp.src(['app/css/main.min.css', 'app/css/libs.min.css', 'app/css/reset.css'])
           .pipe(gulp.dest('dist/css'));
       var buildJS = gulp.src(['app/js/main.min.js', 'app/js/libs.min.js'])
           .pipe(gulp.dest('dist/js'));
       var buildFonts = gulp.src('app/fonts/**/*.*')
           .pipe(gulp.dest('dist/fonts'));
       var buildMedia = gulp.src('app/media/*')
           .pipe(gulp.dest('dist/media'));
        var buildImages = gulp.src('app/img/*')
            .pipe(gulp.dest('dist/img'));
    });


    gulp.task('default', ['watch']);