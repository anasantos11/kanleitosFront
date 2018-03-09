var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('gulp-main-bower-files');
var replace = require('gulp-replace');


//Arquivos JS que serão concatenados e salvo em dist
var jsAppConcat = [
    "src/app.js",
    "src/resources/routes/*.js",
    "src/resources/factorys/*.js",
    "src/resources/services/*.js",
    "src/resources/controllers/*.js",
    "src/resources/controllers/**/*/*.js",
];

//Arquivos HTML que serão apenas copiados para dist
var htmlAppCopy = [
    "src/templates/**/*"
];

//Arquivos kan libs que serão apenas copiados para dist
var libsAppCopy = [
    "src/resources/libs/**/*"
];

///Tarefas para copiar templates para dist
gulp.task('copy-templates', function () {
    gulp.src(htmlAppCopy)
        .pipe(gulp.dest('dist/templates'));
});

///Tarefas para copiar index.html para dist
gulp.task('copy-index-html', function () {
    gulp.src("src/index.html")
        .pipe(replace('../dist/', ''))
        .pipe(gulp.dest('dist/'));
});

///Tarefas para copiar pasta img para dist
gulp.task('copy-img', function () {
    gulp.src("src/img/**/*")
        .pipe(gulp.dest('dist/img'));
});

///Tarefa de concatenação dos arquivos JS - Verificar array jsAppConcat
gulp.task('concat-kan-js', function () {
    gulp.src(jsAppConcat)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/'));
});

///Tarefa para copiar libs kan para dist
gulp.task('copy-kan-libs', function () {
    gulp.src(libsAppCopy)
        .pipe(gulp.dest('dist/libs'));

});

//Tarefa para copiar as fonts do font-awesome para pasta dist/libs/fonts 
gulp.task('libs-fonts', function () {
    gulp.src('./bower_components/components-font-awesome/fonts/**/*')
        .pipe(gulp.dest('dist/libs/fonts'));
});

//Tarefa para copiar os arquivos .css para pasta dist/libs/css  em um unico arquivo e minificar o codigo
gulp.task('libs-css', function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles(("**/*.css"), {
            overrides: {
                bootstrap: {
                    main: [
                        './dist/css/bootstrap.min.css'
                    ]
                }
            }
        }))
        .pipe(concat('public-libs.css'))
        .pipe(gulp.dest('dist/libs/css'))
});

//Tarefa para copiar os arquivos .js para pasta dist/libs/js  em um unico arquivo e minificar o codigo
gulp.task('libs-js', function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles(("**/*.js"), {
            overrides: {
                bootstrap: {
                    main: [
                        './assets/js/vendor/popper.min.js',
                        './dist/js/bootstrap.min.js'
                    ]
                },
                sweetalert: {
                    main:
                        [
                            './docs/assets/sweetalert/sweetalert.min.js'
                        ]
                }
            }
        }))
        .pipe(concat('public-libs.js'))
        .pipe(gulp.dest('dist/libs/js'))
});

// Tarefa de monitoração caso algum arquivo seja modificado
gulp.task('watch', function () {
    gulp.watch("src/**/*", ["files-src"]);

});


gulp.task("files-src", [
    "copy-templates",
    "copy-index-html",
    "copy-img",
    "concat-kan-js",
    "copy-kan-libs"
]);

gulp.task("public-libs", [
    "libs-css",
    "libs-js",
    "libs-fonts"]
);

// Tarefa padrão quando executado o comando GULP
gulp.task('default', [
    "public-libs",
    "files-src",
    "watch"]
);




