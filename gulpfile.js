var gulp = require('gulp');

// Includes plugins
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');


// HTML
gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(plugins.livereload());
});

//  CSS
gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(plugins.wiredep())
        .pipe(plugins.plumber())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.livereload());
});

// JS
gulp.task('js', function() {
    return gulp.src('src/js/site.js')
        .pipe(plugins.plumber())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.livereload());
});

// Vendors
gulp.task('vendors', ['vendors_js', 'vendors_fonts']);
gulp.task('vendors_js', function(){
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles())
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('vendors.js'))
        .pipe(gulp.dest('dist/vendors'));
});
gulp.task('vendors_fonts', function(){
    return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/fonts/'));
});


// CSS optimisation
gulp.task('css_optimisation', function () {
    return gulp.src('dist/style.css')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.csso())
        .pipe(plugins.uncss({
            html: ['src/*.html'],
            ignore: [
                ".fade",
                ".fade.in",
                ".collapse",
                ".collapse.in",
                ".collapsing",
                /\.open/
            ]
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
});
gulp.task('css_vendors_optimisation', function () {
    return gulp.src('dist/vendors/vendors.css')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.csso())
        .pipe(plugins.uncss({html: ['src/*.html']}))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/vendors'))
});

// JS Optimisation
gulp.task('js_optimisation', function() {
    return gulp.src('dist/site.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
});
gulp.task('js_vendors_optimisation', function() {
    return gulp.src('dist/vendors/vendors.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/vendors'))
});

// Images optimisation
gulp.task('img', function () {
    return gulp.src('src/img/*.{png,jpg,svg}')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(plugins.clean());
});

// Build
gulp.task('build', ['img', 'js', 'css', 'vendors', 'html']);
gulp.task('build:optimized', function(done) {
    runSequence(
        'clean', [
            'build',
            'css_optimisation',
            'css_vendors_optimisation',
            'js_optimisation',
            'js_vendors_optimisation'
        ], function() {
            done();
        }
    );
});


// Watch
gulp.task('watch', function(){
    plugins.livereload.listen();
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/sass/**/*.scss',['css']);
    gulp.watch('src/js/site.js',['js']);
});

// Default
gulp.task('default', ['prod']);