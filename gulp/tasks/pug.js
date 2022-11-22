"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSync from "browser-sync";
import config from "../config.js";
import path from "path";
import fs from "fs";
import imageSize from "image-size";

const $ = gulpLoadPlugins();

const pug = () => {
  // JSONファイルの読み込み。
  const locals = {
    data: JSON.parse(fs.readFileSync(config.pug + "/pages.json")),
  };
  return (
    gulp
      .src([config.src + "/**/*.pug", "!" + config.src + "/**/_*.pug"])
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe($.changed(config.dist))
      // 各ページごとの`/`を除いたルート相対パスを取得します。
      .pipe(
        $.data(function (file) {
          locals.relativePath = path.relative(
            file.base,
            file.path.replace(/.pug$/, ".html")
          );
          return locals;
        })
      )
      .pipe(
        $.data(function (file) {
          return {
            // https://zenn.dev/ko_yelie/articles/2d040d2750b751
            // imageSizeという名前の関数をPug内で使えるようにする
            imageSize: (src) => {
              // imgタグのsrc属性のパスを基にファイルパスを生成する
              const filePath = src.startsWith("/")
                ? path.resolve(sourcePath, src.slice(1)) // /から始まるルート相対パスの場合
                : path.resolve(file.dirname, src); // 相対パスの場合
              // ファイルパスに該当する画像のサイズをimage-sizeで取得する
              return imageSize(filePath);
            },
          };
        })
      )
      .pipe(
        $.pug({
          // JSONファイルとルート相対パスの情報を渡します。
          locals: locals, // `/_includes/_layout`のようにルート相対パスで指定することができます。 // Pugファイルのルートディレクトリを指定します。
          basedir: config.src,
          pretty: true,
        })
      )
      .pipe($.cached("html-cache"))
      .pipe($.htmlBeautify({ indent_size: 2 }))
      .pipe(gulp.dest(config.dist))
      .pipe(browserSync.reload({ stream: true }))
  ); // ブラウザリロードなし
};

exports.pug = pug;
