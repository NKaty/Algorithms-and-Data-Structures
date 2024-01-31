// Promise.any implementation
// Given an array of asynchronous functions, return a new promise.
// Each function in the array accepts no arguments and returns a promise.
// Any promise resolves with the value of the first promise to fulfill.
// If no promise was resolved any promise rejects with AggregateError
// containing an array of rejection reasons in its errors property.
// Any promise rejects upon receiving an empty iterable

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
const promiseAny = function (functions) {
  if (!functions.length) {
    return Promise.reject(new AggregateError([], 'No Promise in promiseAny was resolved'));
  }
  const rejects = [];
  let rejectedPromisesCount = 0;
  return new Promise((resolve, reject) => {
    functions.forEach((fn, i) => {
      fn()
        .then(resolve)
        .catch(error => {
          rejects[i] = error;
          if (++rejectedPromisesCount === functions.length) {
            reject(new AggregateError(rejects, 'No Promise in promiseAny was resolved'));
          }
        });
    });
  });
};

promiseAny([])
  .catch(err => console.log(err.message)); // No Promise in promiseAny was resolved
promiseAny([() => new Promise(resolve => resolve(42))])
  .then(console.log); // 42
promiseAny([
  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))
]).then(console.log).catch(err => console.log(err.message)); // 2
promiseAny([
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200)),
  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error3')), 300))
]).then(console.log).catch(errors => errors.errors.forEach(error => console.log(error.message))); // Error1 Error2 Error3
