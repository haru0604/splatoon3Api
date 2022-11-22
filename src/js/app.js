"use strict";

document.querySelectorAll(".header-menu, .header-links").forEach(target => {
  target.addEventListener("click", () => {
    document.querySelector(".header").classList.toggle("is-header-active");
  });
});
