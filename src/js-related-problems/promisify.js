// Promisify implementation
// Implement a promisify function that turns a function
// using the callback pattern into a function that returns a Promise

const promisify = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function cb(err, ...results) {
        if (err) {
          return reject(err);
        }
        return resolve(results.length === 1 ? results[0] : results);
      }

      args.push(cb);
      fn.call(this, ...args);
    });
  };
};

const obj = {
  a: 100,
  sumAsync: function (num1, num2, callback) {
    if (!(num1 && num2)) {
      return callback(new Error('Error'), null);
    }
    return callback(null, this.a + num1 + num2);
  },
  sumAsyncManyResults: function (num1, num2, callback) {
    if (!(num1 && num2)) {
      return callback(new Error('Error'), null);
    }
    return callback(null, this.a + num1 + num2, num1 + num2);
  }
};

obj.promisifiedSumAsync = promisify(obj.sumAsync);
obj.promisifiedSumAsync(5, 10).then(console.log); // 115
obj.promisifiedSumAsync(5, null).catch(err => console.log(err.message)); // Error

obj.promisifiedSumAsyncManyResults = promisify(obj.sumAsyncManyResults);
obj.promisifiedSumAsyncManyResults(5, 10).then(console.log); // [ 115, 15 ]
obj.promisifiedSumAsyncManyResults(5, null).catch(err => console.log(err.message)); // Error
