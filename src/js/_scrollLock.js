let scrollY;
export function scrollLock() {
  if (document.body.classList.contains("scroll-locked")) {
    document.body.style.top = "";
    document.body.classList.remove("scroll-locked");

    window.scrollTo(0, scrollY);

    return false;
  }

  scrollY = document.documentElement.scrollTop || document.body.scrollTop;

  // メニューを開いたときにスクロール位置が一番上に戻らないように
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add("scroll-locked");
}
