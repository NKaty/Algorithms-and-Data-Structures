// Write a function that checks if a given value is an instance
// of a given class or superclass. For this problem,
// an object is considered an instance of a given class
// if that object has access to that class's methods.
// There are no constraints on the data types that can be passed to the function.
// For example, the value or the class could be undefined.

/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
const checkIfInstanceOf = function (obj, classFunction) {
  if (obj === null || obj === undefined || typeof classFunction !== 'function') {
    return false;
  }
  return Object(obj) instanceof classFunction;
};

console.log(checkIfInstanceOf(new Date(), Date)); // true
console.log(checkIfInstanceOf(Date, Date)); // false
console.log(checkIfInstanceOf(Number.NaN, Number)); // true
console.log(checkIfInstanceOf(5, Number)); // true
class Animal {}
console.log(checkIfInstanceOf(new (class Dog extends Animal {})(), Animal)); // true
