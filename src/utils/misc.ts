// https://github.com/vuejs/vue/issues/9713
export function beforeAbsoluteLeave(el: HTMLElement) {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);

  Object.assign(el.style, {
    left: `${el.offsetLeft - parseFloat(marginLeft)}px`,
    top: `${el.offsetTop - parseFloat(marginTop)}px`,
    width: width,
    height: height,
  });
}
