"use strict";
import { slideDown, slideUp } from "slide-anim";

export function init() {
  // トリガークラス'.js-accordion'を持つ要素を取得
  const accordionTrigger = document.querySelectorAll(".js-accordion");
  for (let i = 0; i < accordionTrigger.length; i++) {
    // トリガーを押した時のアクション
    let accordionTargetisOpened = false;
    accordionTrigger[i].addEventListener("click", (e) => {
      // クリックされた要素（トリガー要素）を取得
      let currentElement = e.currentTarget;

      // 同じ親要素を持つ隣接した次の要素'.js-accordion'（展開対象の要素）を取得
      let accordionTarget = currentElement.nextElementSibling;
      if (accordionTargetisOpened) {
        //トリガーの'is-active'クラスを削除
        currentElement.classList.remove("is-active");
        slideUp(accordionTarget).then(function () {
          accordionTargetisOpened = false;
        });
      } else {
        //トリガーの'is-active'クラスを追加
        currentElement.classList.add("is-active");
        slideDown(accordionTarget).then(function () {
          accordionTargetisOpened = true;
        });
      }
    });
  }
}
