(function main($gulp) {

    var babel  = require('gulp-babel'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        path   = require('path'),
        yaml   = require('js-yaml'),
        fs     = require('fs'),
        config = yaml.safeLoad(fs.readFileSync('./droplet.yml', 'utf8'));

    $gulp.task('compile', function() {

        return $gulp.src(config.module)
                    .pipe(babel())
                    .pipe(rename(config.name + '.js'))
                    .pipe($gulp.dest(config.locations.release))
                    .pipe($gulp.dest(config.locations.vendor + '/' + config.name))
                    .pipe(uglify())
                    .pipe(rename(function (path) {
                        path.basename += '.min';
                    }))
                    .pipe($gulp.dest(config.locations.release));

    });

    $gulp.task('lint', function() {

        return $gulp.src(config.module)
                    .pipe(jshint())
                    .pipe(jshint.reporter(require('jshint-stylish')));

    });

    $gulp.task('test', ['lint']);
    $gulp.task('build', ['compile']);
    $gulp.task('default', ['test', 'build']);

})(require('gulp'));
