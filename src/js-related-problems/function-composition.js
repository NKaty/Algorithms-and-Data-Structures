// Function composition
// Given functions f1, f2, f3, ..., fn, return a new function fn
// that is the function composition of the array of functions.
// compose (from right to left)
// pipe (from left to right)

/**
 * @param {...Function} functions
 * @return {Function}
 */
const compose = (...functions) => {
  if (functions.length === 0) {
    throw new Error('Requires at least one function');
  }
  return function (...args) {
    let accResult = args;
    for (let i = functions.length - 1; i >= 0; i--) {
      accResult = [functions[i].call(this, ...accResult)];
    }
    return accResult[0];
  };
};

/**
 * @param {...Function} functions
 * @return {Function}
 */
const composeUsingReduce = (...functions) => {
  if (functions.length === 0) {
    throw new Error('Requires at least one function');
  }
  return function (...args) {
    return functions.reduceRight((accArg, fn, i) => {
      return i === functions.length - 1 ? fn.call(this, ...accArg) : fn.call(this, accArg);
    }, args);
  };
};

/**
 * @param {...Function} functions
 * @return {Function}
 */
const pipe = (...functions) => {
  if (functions.length === 0) {
    throw new Error('Requires at least one function');
  }
  return function (...args) {
    let accResult = args;
    for (const fn of functions) {
      accResult = [fn.call(this, ...accResult)];
    }
    return accResult[0];
  };
};

/**
 * @param {...Function} functions
 * @return {Function}
 */
const pipeUsingReduce = (...functions) => {
  if (functions.length === 0) {
    throw new Error('Requires at least one function');
  }
  return function (...args) {
    return functions.reduce((accArg, fn, i) => {
      return i === 0 ? fn.call(this, ...accArg) : fn.call(this, accArg);
    }, args);
  };
};

const obj = {
  a: 5,
  composedFn: compose(function (x) {
    return x + this.a;
  }, (x, y) => 2 * x + y),
  composedReduceFn: composeUsingReduce(function (x) {
    return x + this.a;
  }, (x, y) => 2 * x + y),
  pipedFn: pipe((x, y) => 2 * x + y, function (x) {
    return x + this.a;
  }),
  pipedReduceFn: pipeUsingReduce((x, y) => 2 * x + y, function (x) {
    return x + this.a;
  })
};
console.log(obj.composedFn(4, 3)); // 16
console.log(obj.composedReduceFn(4, 3)); // 16
console.log(obj.pipedFn(4, 3)); // 16
console.log(obj.pipedReduceFn(4, 3)); // 16
