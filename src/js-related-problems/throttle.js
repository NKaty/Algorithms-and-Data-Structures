// Throttling is a technique in which,
// no matter how many times the user fires the event,
// the attached function will be executed only once in a given time interval.

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
const throttle = function (fn, t) {
  let timer;
  return (...args) => {
    const context = this;
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = undefined;
    }, t);
  };
};

const throttleImmediate = function (fn, t, immediate = false) {
  let timer;
  return (...args) => {
    const context = this;
    const callNow = immediate && !timer;
    if (!timer) {
      timer = setTimeout(() => {
        if (!immediate) {
          fn.apply(context, args);
        }
        timer = undefined;
      }, t);
    }
    if (callNow) {
      fn.apply(context, args);
    }
  };
};

const imitateCalls = function (fn) {
  let i = 0;
  fn(`Hello${++i}`);
  const timer = setInterval(function () {
    if (i >= 9) {
      clearInterval(timer);
    }
    fn(`Hello${++i}`);
  }, 100);
};

const start = Date.now();
imitateCalls(throttle((str) => {
  console.log('Case throttle:', str, Date.now() - start);
}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms
imitateCalls(throttleImmediate((str) => {
  console.log('Case throttle immediate - false:', str, Date.now() - start);
}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms
imitateCalls(throttleImmediate((str) => {
  console.log('Case throttle immediate - true:', str, Date.now() - start);
}, 500, true)); // Hello1 logged at t = ~0ms, Hello6 logged at t = ~500ms
