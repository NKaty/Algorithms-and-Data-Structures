// Call implementation
// Enhance all functions to have the callPolyfill method.
// The method accepts an object obj as it's first parameter
// and any number of additional arguments.
// The obj becomes the this context for the function.
// The additional arguments are passed to the function
// (that the callPolyfill method belongs on).

/**
 * @param {Object} context
 * @param {...*?} args
 * @return {null|boolean|number|string|Array|Object}
 */
// eslint-disable-next-line no-extend-native
Function.prototype.callPolyfill = function (context, ...args) {
  const call = Symbol('call');
  context[call] = this;
  const result = context[call](...args);
  delete context[call];
  return result;
};

function add(b, c) {
  return this.a + b + c;
}
console.log(add.callPolyfill({ a: 5 }, 7, 10)); // 22
