// Given a function fn and a time in milliseconds t,
// return a debounced version of that function.
// A debounced function is a function whose execution is delayed by t milliseconds
// and whose execution is cancelled if it is called again within that window of time.
// The debounced function should also receive the passed parameters.
// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms.
// The first 2 function calls would be cancelled, and the 3rd function call
// would be executed at 150ms. If instead t = 35ms, The 1st call would be cancelled,
// the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.

// In the debouncing technique, no matter how many times the user fires the event,
// the attached function will be executed only after the specified time
// once the user stops firing the event.

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
const debounce = function (fn, t) {
  let timer;
  return (...args) => {
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, t);
  };
};

const debounceImmediate = function (fn, t, immediate = false) {
  let timer;
  return function (...args) {
    const callNow = immediate && !timer;
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
        timer = undefined;
      }
    }, t);
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
imitateCalls(debounce((str) => {
  console.log('Case debounce:', str, Date.now() - start);
}, 300)); // Hello10 logged at t = ~1200ms
imitateCalls(debounceImmediate((str) => {
  console.log('Case debounce immediate - false:', str, Date.now() - start);
}, 300)); // Hello10 logged at t = ~1200ms
imitateCalls(debounceImmediate((str) => {
  console.log('Case debounce immediate - true:', str, Date.now() - start);
}, 300, true)); // Hello1 logged at t = ~0ms
