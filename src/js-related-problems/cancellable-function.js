// Sometimes you have a long-running task,
// and you may wish to cancel it before it completes.
// To help with this goal, write a function cancellable
// that accepts a generator object and returns an array of two values:
// a cancel function and a promise.
// You may assume the generator function will only yield promises.
// It is your function's responsibility to pass the values resolved
// by the promise back to the generator. If the promise rejects,
// your function should throw that error back to the generator.
// If the cancel callback is called before the generator is done,
// your function should throw an error back to the generator.
// That error should be the string "Cancelled" (Not an Error object).
// If the error was caught, the returned promise should resolve
// with the next value that was yielded or returned.
// Otherwise, the promise should reject with the thrown error.
// No more code should be executed.
// When the generator is done, the promise your function returned
// should resolve the value the generator returned.
// If, however, the generator throws an error,
// the returned promise should reject with the error.

/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
const cancellable = function (generator) {
  let cancel;
  const rejectPromise = new Promise((resolve, reject) => {
    cancel = () => reject(new Error('Cancelled'));
  });
  const getPromise = async () => {
    let nextObj = generator.next();
    while (!nextObj.done) {
      try {
        nextObj = generator.next(await Promise.race([nextObj.value, rejectPromise]));
      } catch (err) {
        nextObj = generator.throw(err);
      }
    }
    return nextObj.value;
  };
  return [cancel, getPromise()];
};

function * tasks() {
  const val = yield new Promise(resolve => resolve(2 + 2));
  yield new Promise(resolve => setTimeout(resolve, 100));
  return val + 1;
}

const canceledTasks = cancellable(tasks());
setTimeout(canceledTasks[0], 50);
canceledTasks[1].catch(err => console.log(err.message)); // logs "Cancelled" at t=50ms

const successfulTasks = cancellable(tasks());
successfulTasks[1].then(console.log); // 5
