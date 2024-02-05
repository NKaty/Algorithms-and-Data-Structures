// Promise.race implementation
// Given an array of asynchronous functions, return a new promise.
// Each function in the array accepts no arguments and returns a promise.
// Race promise resolves or rejects with the first promise to settle.

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
const promiseRace = function (functions) {
  if (!functions.length) {
    return new Promise(() => {});
  }
  return new Promise((resolve, reject) => {
    functions.forEach(fn => {
      fn().then(result => resolve(result)).catch(reject);
    });
  });
};

promiseRace([() => new Promise(resolve => resolve(42))])
  .then(console.log); // 42
promiseRace([
  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))
]).then(console.log).catch(err => console.log(err.message)); // Error
promiseRace([
  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
  () => new Promise(resolve => setTimeout(() => resolve(16), 100)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 70))
]).then(console.log).catch(err => console.log(err.message)); // 4
