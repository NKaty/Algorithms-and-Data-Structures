// Given an asynchronous function fn and a time t in milliseconds,
// return a new time limited version of the input function.
// fn takes arguments provided to the time limited function.
// The time limited function should follow these rules:
// If the fn completes within the time limit of t milliseconds,
// the time limited function should resolve with the result.
// If the execution of the fn exceeds the time limit,
// the time limited function should reject with the error Time Limit Exceeded.

/**
 * @param {Function} fn
 * @param {number} millis
 * @return {Function}
 */
const timeLimit = function (fn, millis) {
  return function (...args) {
    return Promise.race([
      fn(...args),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Time Limit Exceeded')), millis);
      })
    ]);
  };
};

timeLimit((t) => new Promise(resolve => setTimeout(() => resolve('value'), t)), 100)(50)
  .then(console.log); // value at t = ~50ms
timeLimit((t) => new Promise(resolve => setTimeout(resolve, t)), 100)(150)
  .catch(console.log); // Error: Time Limit Exceeded at t = ~100ms
