var gulp=require('gulp'),
    gulputil=require('gulp-util'),
    path=require('path'),
    fs = require('fs-extra'),
    concat=require('gulp-concat'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    build=require('./build.json'),
    release=require('./build/dist.json'),
    src='./src',
    dist='./dist';




gulp.task('default',function(){
    console.log('Object.observe shim build..."tasks: gulp build|gulp minify"');
});

gulp.task('build',function(){

    var build_=srcStream(build)
        .pipe(concat('Object.observe.js'))
        .pipe(gulp.dest(src));

    var release_=srcStream(release)
        .pipe(concat('Object.observe.js'))
        .pipe(gulp.dest(dist));

    return merge(build_, release_);

});

gulp.task('minify',function(){

    var build_=srcStream(build)
        .pipe(concat('Object.observe.js'))
        .pipe(gulp.dest(src));

    var minify_=srcStream(release)
        .pipe(concat('Object.observe.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist));

    return merge(build_, minify_);
});

function srcStream(src){
    return gulp.src(src);
}


