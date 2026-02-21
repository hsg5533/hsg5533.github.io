export function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /android|iphone|ipad|ipod|blackberry|bb10|opera mini|windows phone/;
  const isUA = mobileRegex.test(ua);
  const hasTouch = "ontouchstart" in window;
  const narrowScreen = window.innerWidth <= 1024;
  return isUA || (hasTouch && narrowScreen);
}
