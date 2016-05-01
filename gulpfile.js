var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('api', function() {
    $.nodemon({
        script: 'src/server/app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting API...');
    });
});