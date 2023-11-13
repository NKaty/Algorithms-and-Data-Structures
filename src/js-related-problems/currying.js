// Currying
// Converts a function to a set of functions with a single parameter

/**
 * @param {Function} fn
 * @return {Function}
 */
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return curried.bind(this, ...args);
  };
};

const obj = {
  num: 50,
  sum: function (a, b, c, d) {
    return this.num + a + b + c + d;
  }
};
obj.curriedSum = curry(obj.sum);
console.log(obj.curriedSum(1, 2, 3, 4)); // 60
console.log(obj.curriedSum(1)(2, 3, 4)); // 60
console.log(obj.curriedSum(1)(2, 3)(4)); // 60
console.log(obj.curriedSum(1)(2)(3)(4)); // 60
