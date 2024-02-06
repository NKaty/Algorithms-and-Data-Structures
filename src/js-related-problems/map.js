// Map implementation

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object?} thisArg
 * @return {Array}
 */
const map = function (arr, fn, thisArg) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Object.hasOwn(arr, i)) {
      result[i] = fn.call(thisArg, arr[i], i, arr);
    }
  }
  return result;
};

console.log(map([1, 2, 3], num => num * 2)); // [ 2, 4, 6 ]
console.log(map([1, 2, 3], function(num) { return this.a + num; }, { a: 10 })); // [ 11, 12, 13 ]
