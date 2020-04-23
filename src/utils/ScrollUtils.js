function _easeInOutQuad(x, t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

export const scrollToLink = function (href, callback) {
  const anchor = href.replace('#', '');
  const elem = document.getElementById(anchor);
  if (!elem) {
    console.error('No such ID: ', anchor);
    return;
  }

  const offset = elem.offsetTop;
  scrollTo(offset, 500, null);

  if (callback) {
    callback();
  }
};

export const scrollTo = function (offset, scrollDuration, cb) {
  cb = cb || function () {};
  var startT = Date.now();
  var startY = window.scrollY;
  var distanceToTravel = offset - startY;
  var percentComplete = 0;
  var elapsed;
  var scrollToPercent;
  var scrollToY;

  function step() {
    setTimeout(function () {
      if (percentComplete < 1) {
        elapsed = Date.now() - startT;
        percentComplete = elapsed / scrollDuration;
        scrollToPercent = _easeInOutQuad(
          percentComplete,
          elapsed,
          0,
          1,
          scrollDuration,
        );
        scrollToY = scrollToPercent * distanceToTravel + startY;
        window.scrollTo(0, scrollToY);
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, offset);
        cb();
      }
    }, 15);
  }

  step();
};
