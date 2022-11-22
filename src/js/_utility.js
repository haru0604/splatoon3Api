export function debounce(fn, interval) {
  let timerId;
  return () => {
    clearTimeout(timerId);
    const context = this;
    const args = arguments;
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, interval);
  };
}

export function setupCSSCustomProperties() {
  let prevVw = 0;

  setVw();
  setSvh();

  window.addEventListener("resize", () => {
    if (prevVw === document.body.clientWidth * 0.01) {
      return;
    }
    setVw();
    setSvh();
  });

  function setVw() {
    const vw = document.body.clientWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    prevVw = vw;
  }
  function setSvh() {
    const svh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--svh", `${svh}px`);
  }
}
