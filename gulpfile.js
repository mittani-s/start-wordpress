// モジュール、プラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const sassGlob = require("gulp-sass-glob");
const gcmq = require("gulp-group-css-media-queries");
const mode = require("gulp-mode")({
    modes: ["production", "development"],
    default: "development",
    verbose: false,
});
const browserSync = require("browser-sync");

// scssのコンパイル
const compileSass = (done) => {
    const postcssPlugins = [autoprefixer(), cssdeclsort({ order: "alphabetical" })];
    gulp.src("./sass/style.scss", { sourcemaps: true })
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(postcss(postcssPlugins))
        .pipe(mode.production(gcmq()))
        .pipe(gulp.dest("./css", { sourcemaps: "./sourcemaps" }));
    done();
};

// ローカルサーバ起動
const buildServer = (done) => {
    browserSync.init({
        port: 80,
        notify: false,
        files: ["./**/*.php"],
        proxy: "http://tateuri-guide.local/",
    });
    done();
};

// ブラウザ自動リロード
const browserReload = (done) => {
    browserSync.reload();
    done();
};

// ファイル監視
const watchFiles = () => {
    gulp.watch("./sass/**/_*.scss", gulp.series(compileSass, browserReload));
    gulp.watch("./sass/_*.scss", gulp.series(compileSass, browserReload));
};

// コマンド設定
exports.sass = compileSass;
exports.default = gulp.parallel(buildServer, compileSass, watchFiles);
