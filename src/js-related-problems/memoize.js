// Given a function fn, return a memoized version of that function.
// A memoized function is a function that will never be called twice with the same inputs.
// Instead, it will return a cached value.
// fn can be any function and there are no constraints on what type of values it accepts.
// Inputs are considered identical if they are === to each other.

/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const cache = new Map();
  const result = Symbol('result');
  return function (...args) {
    let currentCacheLevel = cache;
    args.forEach(arg => {
      if (!currentCacheLevel.has(arg)) {
        currentCacheLevel.set(arg, new Map());
      }
      currentCacheLevel = currentCacheLevel.get(arg);
    });
    if (!currentCacheLevel.has(result)) {
      currentCacheLevel.set(result, fn(...args));
    }
    return currentCacheLevel.get(result);
  };
}

let callCount = 0;
const memoizedFn = memoize(function (...arr) {
  ++callCount;
  return arr.reduce((a, b) => a + b, 0);
});
console.log(memoizedFn(1, 1, 1)); // 3
console.log(memoizedFn(1, 1)); // 2
console.log(memoizedFn(1)); // 1
console.log(memoizedFn(1, 1)); // 2
console.log(memoizedFn(1, 1, 1)); // 3
console.log(callCount); // 3
