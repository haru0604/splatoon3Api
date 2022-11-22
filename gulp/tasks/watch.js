"use strict";

import gulp from "gulp";
import config from "../config.js";

import { pug } from "./pug";
import { htmlValidate } from "./lint";
import { compileSass } from "./sass";
import { bundleWebpack } from "./webpack";
import { copy } from "./copy";

const watch = () => {
  // ファイル監視 ＆ 自動リロード
  gulp.watch([config.src + "/**/*.pug"], gulp.series(pug, htmlValidate));
  gulp.watch([config.src + "/**/*.scss"], compileSass);
  gulp.watch([config.src + "/**/**.js"], bundleWebpack);
  gulp.watch(
    [
      config.src + `/**/*+(.png|.jpeg|.jpg|.gif|.svg)`,
      config.src + `/**/*.ico`,
      config.src + `/**/fonts/**/*`,
      config.src + `/**/*.js`,
      config.src + `/**/*.css`,
      config.src + `/**/*.html`,
      config.src + `/**/*.json`,
    ],
    copy
  );
};
exports.watch = watch;
