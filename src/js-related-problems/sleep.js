// Given a positive integer millis,
// write an asynchronous function that sleeps for millis milliseconds.
// It can resolve any value.

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}

const start = Date.now();
sleep(100).then(() => console.log(Date.now() - start)); // ~100
