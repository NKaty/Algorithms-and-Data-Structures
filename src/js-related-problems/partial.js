// Partial
// Converts a function into a single function with fewer parameters

/**
 * @param {Function} fn
 * @param {...*} apply
 * @return {Function}
 */
const partial = (fn, ...apply) => {
  return function (...args) {
    return fn.call(this, ...apply, ...args);
  };
};

const obj = {
  num: 50,
  sum: function (a, b, c, d) {
    return this.num + a + b + c + d;
  }
};
obj.partialSum = partial(obj.sum, 10, 4);
console.log(obj.partialSum(1, 5)); // 70
