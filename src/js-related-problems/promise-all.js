// Promise.all implementation
// Given an array of asynchronous functions, return a new promise.
// Each function in the array accepts no arguments and returns a promise.
// All the promises should be executed in parallel.
// Promise resolves:
// When all the promises returned from functions were resolved successfully in parallel.
// The resolved value of promise should be an array of all the resolved values
// of promises in the same order as they were in the functions.
// The promise should resolve when all the asynchronous functions
// in the array have completed execution in parallel.
// Promise rejects:
// When any of the promises returned from functions were rejected.
// Promise should also reject with the reason of the first rejection.

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
const promiseAll = function (functions) {
  if (!functions.length) {
    return Promise.resolve([]);
  }
  const results = [];
  let resolvedPromisesCount = 0;
  return new Promise((resolve, reject) => {
    functions.forEach((fn, i) => {
      fn().then(res => {
        results[i] = res;
        if (++resolvedPromisesCount === functions.length) {
          resolve(results);
        }
      }).catch(reject);
    });
  });
};

promiseAll([() => new Promise(resolve => resolve(42))])
  .then(console.log); // [42]
promiseAll([
  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 100))
]).catch(err => console.log(err.message)); // Error
promiseAll([
  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
  () => new Promise(resolve => setTimeout(() => resolve(16), 100))
]).then(console.log); // [4, 10, 16]
