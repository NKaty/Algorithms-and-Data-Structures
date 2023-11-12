// Reduce implementation
// Reduce Right implementation

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {*?} init
 * @return {*}
 */
const reduce = function(arr, fn, init) {
  let result = init;
  let i = 0;
  if (init === undefined) {
    if (!arr.length) {
      throw TypeError('Reduce of empty array with no initial value');
    }
    i = 1;
    result = arr[0];
  }
  for (; i < arr.length; i++) {
    result = fn(result, arr[i], i, this);
  }
  return result;
};

// Simplified recursive version of reduce
/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {*} init
 * @return {*}
 */
const recursiveReduce = function(arr, fn, init) {
  if (!arr.length) {
    return init;
  }
  const [item, ...rest] = arr;
  return recursiveReduce(rest, fn, fn(init, item));
};

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {*?} init
 * @return {*}
 */
const reduceRight = function(arr, fn, init) {
  let result = init;
  let i = arr.length - 1;
  if (init === undefined) {
    if (!arr.length) {
      throw TypeError('Reduce of empty array with no initial value');
    }
    i = arr.length - 2;
    result = arr[arr.length - 1];
  }
  for (; i >= 0; i--) {
    result = fn(result, arr[i], i, this);
  }
  return result;
};

// Simplified recursive version of reduceRight
/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {*} init
 * @return {*}
 */
const recursiveReduceRight = function(arr, fn, init) {
  if (!arr.length) {
    return init;
  }
  const rest = [...arr];
  const item = rest.pop();
  return recursiveReduceRight(rest, fn, fn(init, item));
};

console.log(reduce([1, 2, 3], (acc, item) => {
  acc[item] = item + 10;
  return acc;
}, {})); // { '1': 11, '2': 12, '3': 13 }
console.log(reduce([1, 2, 3], (acc, item) => {
  acc += item;
  return acc;
})); // 6
console.log(recursiveReduce([1, 2, 3], (acc, item) => {
  acc[item] = item + 10;
  return acc;
}, {})); // { '1': 11, '2': 12, '3': 13 }
console.log(reduceRight([1, 2, 3], (acc, item) => {
  acc.push(item + 10);
  return acc;
}, [])); // [ 13, 12, 11 ]
console.log(reduceRight([1, 2, 3], (acc, item) => {
  acc += item;
  return acc;
})); // 6
console.log(recursiveReduceRight([1, 2, 3], (acc, item) => {
  acc.push(item + 10);
  return acc;
}, [])); // [ 13, 12, 11 ]
