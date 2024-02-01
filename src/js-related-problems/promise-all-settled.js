// Promise.allSettled implementation
// Given an array of asynchronous functions, return a new promise.
// Each function in the array accepts no arguments and returns a promise.
// All the promises should be executed in parallel.
// This promise fulfills when all the input's promises settle
// with an array of objects that describe the outcome of each promise.

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
const promiseAllSettled = function (functions) {
  if (!functions.length) {
    return Promise.resolve([]);
  }
  const results = [];
  let resolvedPromisesCount = 0;
  return new Promise((resolve) => {
    functions.forEach((fn, i) => {
      fn().then(res => {
        results[i] = {
          status: 'fulfilled',
          value: res
        };
        if (++resolvedPromisesCount === functions.length) {
          resolve(results);
        }
      }).catch(err => {
        results[i] = {
          status: 'rejected',
          reason: err
        };
        if (++resolvedPromisesCount === functions.length) {
          resolve(results);
        }
      });
    });
  });
};

promiseAllSettled([() => new Promise(resolve => resolve(42))])
  .then(console.log);
// [ { status: 'fulfilled', value: 42 } ]

promiseAllSettled([
  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))
]).then(console.log);
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   {
//     status: 'rejected',
//     reason: Error: Error
//   }
// ]

promiseAllSettled([
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200))
]).then(console.log);
// [
//   {
//     status: 'rejected',
//     reason: Error: Error1
//   },
//   {
//     status: 'rejected',
//     reason: Error: Error2
//   }
// ]
