/* Version 5.1.0 */
"use strict";

const gulpconfig = require("./.gulpconfig");
const gulp       = require("gulp");
const path       = require("path"); // used to standardize path syntax across multiple platforms/OS's
const fs         = require("fs"); // used to access file system
// const del        = require("del"); // delete files
const glob       = require("glob");
const webpack    = require("webpack"); // JS module bundler
const wstream    = require("webpack-stream"); // gulp plugin for webpack
const wconfig    = createWebpackConfig(webpack, gulpconfig);
// const gutil      = require("gulp-util"); // better error msgs
const fancylog   = require("fancy-log");
const rename     = require("gulp-rename");
// const watch      = require("gulp-watch");
const gsass      = require("gulp-sass");
const gulpif     = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const plumber    = require("gulp-plumber"); // graceful compile time errors
const prefix     = require("gulp-autoprefixer");
const minify     = require("gulp-clean-css");
const wait       = require("gulp-wait"); // adds delay for async/slow tasks
const eslint     = require("gulp-eslint");
const imagemin   = require("gulp-imagemin");
const imPngquant = require("imagemin-pngquant");
const imMozjpeg  = require("imagemin-mozjpeg");
// const imGiflossy = require("imagemin-giflossy");


if (gulpconfig.settings.smartFind === true) {
    findDirs("sass").forEach(dir => {
        if (gulpconfig.css.find(v => v.src !== dir + "/")) {
            gulpconfig.css.push({
                "src" : dir + "/",
                "dest": dir.replace("sass", "css") + "/"
            });
        }
    });
    findDirs("js_dev").forEach(dir => {
        if (gulpconfig.js.find(v => v.src !== dir + "/")) {
            gulpconfig.js.push({
                "src" : dir + "/",
                "dest": dir.replace("js_dev", "js") + "/"
            });
        }
    });
}

gulpconfig.js && (function transformJSConfig (gulpconfig) { // transform JS task configs to fit Webpack requirements
    gulpconfig.groupJS = gulpconfig.js.map(conf => ({"src": conf.src, "dest": conf.dest})); // create a separate, simpler config for ES Lint
    const transpileConfigJS = []; // JS config has to be transformed to have individual files for every source (for Webpack)
    gulpconfig.js.forEach((taskConfig, i) => {
        const sourceFilePaths = getFiles(taskConfig.src);
        sourceFilePaths.forEach(sourceFilePath => {
            const updatedTaskConfig = {
                "src": sourceFilePath,
                "dest": taskConfig.dest,
                "watch": taskConfig.watch || "entry",
                "srcDir": taskConfig.src,
                "groupId": i
            };
            transpileConfigJS.push(updatedTaskConfig);
        });
    });
    gulpconfig.js = transpileConfigJS;
}(gulpconfig));

gulpconfig.copy && (function addCopySrcGlob (gulpconfig) {
    const jsSources       = gulpconfig.groupJS ? gulpconfig.groupJS.map(v => v.src) : [];
    const cssSources      = gulpconfig.css ? gulpconfig.css.map(v => v.src) : [];
    const imgSources      = gulpconfig.img ? gulpconfig.img.map(v => v.src) : [];
    const excludePatterns = [...jsSources, ...cssSources, ...imgSources].map(v => "!" + v + "**/**");
    gulpconfig.copy.forEach(conf => conf.srcGlob = [conf.src + "**/**", ...excludePatterns])
    const exclude = glob.sync(excludePatterns);
}(gulpconfig));

// console.log(JSON.stringify(gulpconfig, null, 2));

(function verifyDirectories (gulpconfig) {
    const missing = [];
    Object.keys(gulpconfig)
        .filter(v => !["settings", "groupJS"].includes(v))
        // verify directories
        .forEach(taskType => {
            gulpconfig[taskType].forEach((taskConfig, i) => {
                if (!fs.existsSync(taskConfig.src)) {
                    gulpconfig[taskType].splice(i, 1);
                    missing.push(taskConfig.src);
                }
            });
        });
    if (missing.length) {
        console.log("\n");
        Array.from(new Set(missing)).forEach(dirName => {
            console.log(`Directory not found: '${dirName}'`);
        });
        console.log("\n");
    }
}(gulpconfig));

(function generateTaskIds (gulpconfig) {
    Object.keys(gulpconfig)
        .filter(v => !["settings"].includes(v))
        .forEach(taskType => {
            gulpconfig[taskType].forEach((taskConfig, i) => {
                if (!taskConfig.hasOwnProperty("id")) {
                    taskConfig["id"] = (taskType === "js" ? (i + ":" + basename(taskConfig.src)) : i);
                }
            });
        });
}(gulpconfig));


// const taskMap = {
//     "copy": "copyFiles",
//     "css" : "processCSS",
//     "js"  : "transpileJS",
//     "img" : "compressImages"
// };
// const configured = Object.keys(gulpconfig).filter(conf => gulpconfig[conf].length > 0); // ignore not configured / empty

// configured.forEach(confName => { // i.e. "copy"
//     const taskName = taskMap[confName]; // i.e. "copyFiles"
//     gulp.task(confName, gulpconfig[confName].map(conf => taskName + conf.id));
// });
// gulp.task("all", configured);
// gulp.task("build", configured);


gulp.task("css", gulpconfig.css.map(conf => "processCSS" + conf.id));
gulp.task("js", gulpconfig.js.map(conf => "transpileJS:" + conf.id));
gulp.task("img", gulpconfig.img.map(conf => "compressImages:" + conf.id));

gulp.task("all", ["css", "js", "img"]);
gulp.task("build", ["css", "js", "img"]);

gulp.task("snapshot", () => {
    const display = [];
    Object.keys(gulpconfig).filter(v => !["settings", "js"].includes(v)).forEach(taskType => {
        gulpconfig[taskType].forEach(taskConfig => {
            display.push((taskType === "groupJS" ? "js" : taskType) + ": " + taskConfig.src + " => " + taskConfig.dest);
        });
    });
    console.log(JSON.stringify(display, null, 2));
});

gulp.task("default", ["snapshot"], () => {

    if (configExists(gulpconfig, "copy")) {
        // Sass watches all files intelligently for changes, compiles all
        gulpconfig.copy.forEach(conf => {
            gulp.watch(conf.srcGlob, ["copyFiles" + conf.id]);
                // .on("error", handleErrors);
        });
    }

    if (configExists(gulpconfig, "css")) {
        // Sass watches all files intelligently for changes, compiles all
        gulpconfig.css.forEach(conf => {
            gulp.watch(conf.src + "**/*.scss", ["processCSS:" + conf.id]);
        });
    }

    if (configExists(gulpconfig, "js")) {
        // Webpack with Babel is expensive (slow) to run, so we have two settings to manage this
        // 1. watches entry point for changes, compiles entry point
        gulpconfig.js.filter(conf => conf.watch === "entry").forEach(conf => {
            gulp.watch(conf.src, ["transpileJS:" + conf.id]); // only watches entry point
        });
        // 2. groups JS tasks with the same src dir and compiles all entry points on change of ANY file in that src dir
        gulpconfig.js.filter(conf => conf.watch === "all")
            .reduce((acc, conf) => {
                const matchingWatchDirIndex = acc.findIndex(v => v.watchDir === conf.srcDir);
                if (matchingWatchDirIndex > -1) { // entry w/ same srcDir doesn't exist
                    acc[matchingWatchDirIndex]["taskIds"].push(conf.id);
                } else {
                    acc.push({"watchDir": conf.srcDir, "taskIds": [conf.id]});
                }
                return acc;
            }, [])
            .forEach(groupConfig => {
                gulp.watch(groupConfig.watchDir + "**/*.js", groupConfig.taskIds.map(id => "transpileJS:" + id)); // watches entire src dir
            });
    }

    if (configExists(gulpconfig, "img")) {
        // need to find a way to make this less expensive
        gulpconfig.img.forEach(conf => {
            gulp.watch(conf.src + "**/*.{jpg,jpeg,png,gif,svg}", ["compressImages:" + conf.id]);
        });
    }
});

(function generateCopyTasks (gulpconfig) {
    gulpconfig.copy && gulpconfig.copy.forEach(conf => {
        gulp.task("copyFiles" + conf.id, () => copyFiles(conf));
    });
    function copyFiles (conf) {
        return gulp.src(conf.srcGlob, {"dot": true, "source": conf.src})
            .pipe(gulp.dest(conf.dest));
    }
}(gulpconfig)); // generateCopyTasks

(function generateCSStasks (gulpconfig) {
    gulpconfig.css && gulpconfig.css.forEach(conf => {
        gulp.task("processCSS:" + conf.id, () => processCSS(conf));
    });
    function processCSS (conf) {
        const maps = gulpconfig.settings.sourcemapCSS === true;
        return gulp.src(conf.src + "**/*.scss", {"base": conf.src})
            .pipe(wait(500))
            .pipe(plumber(function (error) {
                fancylog.error(error.message);
                this.emit("end");
            }))
            .pipe(gulpif(maps, sourcemaps.init()))
            .pipe(gsass({
                "outputStyle": (gulpconfig.settings.minifyCSS ? "compressed" : "expanded")
            }).on("error", fancylog.error))
            .pipe(gulpif(maps, sourcemaps.write()))
            .pipe(prefix({
                "browsers": [
                    "last 4 versions",
                    "> 1%"
                ]
            })
            .pipe(rename({
                "extname": ".min.css"
            })).on("error", fancylog.error))
            .pipe(gulp.dest(conf.dest));
    }
}(gulpconfig)); // generateCSStasks

(function generateJStasks (gulpconfig) {
    // EFFICIENT BUT PROBLEMATIC:
    // gulpconfig.groupJS && gulpconfig.groupJS.forEach(conf => {
    //     gulp.task("lintJS:" + conf.id, () => lintJS(conf));
    // });
    // gulpconfig.js && gulpconfig.js.forEach(conf => {
    //     gulp.task("transpileJS:" + conf.id, ["lintJS" + conf.groupId], () => transpileJS(conf));
    // });
    gulpconfig.js && gulpconfig.js.forEach(conf => {
        if (gulpconfig.settings.lintJS === true) {
            gulp.task("lintJS:" + conf.id, () => lintJS(conf));
            gulp.task("transpileJS:" + conf.id, ["lintJS:" + conf.id], () => transpileJS(conf));
        } else {
            gulp.task("transpileJS:" + conf.id, () => transpileJS(conf));
        }
    });
    function lintJS (conf) {
        const src = conf.watch === "all" ? (conf.srcDir + "**/*.js") : conf.src;
        return gulp.src(src)
            .pipe(eslint().on("error", fancylog.error))
            .pipe(eslint.format().on("error", fancylog.error))
            .pipe(eslint.failAfterError().on("error", fancylog.error));
    }
    function transpileJS (conf) {
        const minFileName = basename(conf.src) + ".min.js";
        return gulp.src(conf.src, {"base": conf.src})
            .pipe(wstream(wconfig, webpack))
            .pipe(rename(minFileName))
            .pipe(gulp.dest(conf.dest));
    }
}(gulpconfig)); // generateJStasks

(function generateIMGtasks (gulpconfig) {
    gulpconfig.img && gulpconfig.img.forEach(conf => {
        gulp.task("compressImages:" + conf.id, () => compressImages(conf));
    })
    function compressImages (conf) {
        const src = conf.src + "**/*.{jpg,jpeg,png,gif,svg}";
        return gulp.src(src, {"base": conf.src})
            .pipe(imagemin([
                imPngquant({
                    "speed"  : 10,
                    "quality": [0.8, 0.9] // lossy settings
                }),
                imagemin.svgo({
                    "plugins": [{
                        "removeViewBox": false
                    }]
                }),
                imagemin.jpegtran({ // lossless
                    "progressive": true
                }),
                imMozjpeg({ // light lossy
                    "quality": 90
                })
            ], {
                "verbose": true
            }))
            .pipe(gulp.dest(conf.dest));
    }
}(gulpconfig)); // generateIMGtasks

function handleErrors (err) {
    console.log("Caught error.");
    if (err.code === "ENOENT") {
        cleanDirectories();
        return;
    } else {
        console.log("Error code: ", err.code);
    }
}

function basename (path) {
    return path.replace(/\\/g,'/').replace(/.*\//, '').replace(/\.[^/.]+$/, "");
}

function configExists (conf, confType) {
    if (!conf.hasOwnProperty(confType) || conf[confType].length === 0) {
        // console.log(`Your ${confType.toUpperCase()} configuration is missing or invalid.`);
        return false;
    } else {
        console.log(`Settings up tasks for: '${confType.toUpperCase()}'...`);
        return true;
    }
}

function getFiles (dir, recursive=false) {
    if (!fs.existsSync(dir)) {
        console.log(`No directory '${dir}' found.`);
        return [];
    }
    const entries = [];
    (function getFilePaths (dir) {
        fs.readdirSync(dir)
            .forEach(fileName => {
                const file = path.join(dir, fileName); // get full path and ensure compatibility with fs
                if (fileName.endsWith(".js") && !fs.statSync(file).isDirectory()) { // if file is JS and NOT a directory
                    entries.push(file); // push files to array
                } else if (fs.statSync(file).isDirectory() && recursive === true) {
                    getFilePaths(file);
                }
            });
    }(dir));
    if (entries.length < 1) {
        console.log(`No files found in directory '${dir}'.`);
    }
    return entries.map(v => v.replace(/\\/g, "/")); // convert to forward slashes for consistency
}

function findDirs (dirToFind, searchDir=__dirname) {
    const blacklist = ["node_modules", ".git", "src", "legacy", "integrations", "components", "images"];
    if (blacklist.includes(dirToFind)) {
        blacklist.splice(blacklist.findIndex(v => v === dirToFind), 1);
    }
    const results = [];
    (function getFilePaths (dir) {
        fs.readdirSync(dir)
            .forEach(fileName => {
                const file = path.join(dir, fileName); // get full path and ensure compatibility with fs
                if (fs.statSync(file).isDirectory()) {
                    if (fileName === dirToFind) {
                        results.push(file);
                    } else if (!blacklist.includes(fileName)) {
                        getFilePaths(file);
                    }
                }
            });
    }(searchDir));
    if (results.length < 1) {
        console.log(`No directories found by the name '${dirToFind} in ${searchDir}'.`);
    }
    return results
        .map(v => path.relative(__dirname, v))
        .map(v => v.replace(/\\/g, "/")); // convert to forward slashes for consistency
}

function createWebpackConfig (webpack, gulpconfig) {
    const config = {
        "mode": "development",
        "module": {
            "rules": [
                {
                    "test": /\.js$/,
                    "exclude": /node_modules/,
                    "loader": "babel-loader"
                }
            ]
        }
    };
    if (gulpconfig.settings.minifyJS) {
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
        config["optimization"] = {
            "minimizer": [
                new UglifyJsPlugin({
                    "uglifyOptions": {
                        "warnings": false,
                        "mangle": true,
                        "output": null,
                        "compress": {
                            "warnings": false,
                        }
                    },
                    "sourceMap": false,
                }),
            ]
        }
    }

    return config;
}
