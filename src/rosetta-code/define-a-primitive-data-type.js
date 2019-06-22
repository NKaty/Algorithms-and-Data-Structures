// Define a type that behaves like an integer but has
// a lowest valid value of 1 and a highest valid value of 10.
// Errors:
// If you try to instantiate a Num with a value outside of 1 - 10
// it should throw a TypeError with an error message of 'Out of range'.
// If you try to instantiate a Num with a value that is not a number
// it should throw a TypeError with an error message of 'Not a Number'.

class Num {
  constructor(n) {
    if (typeof n !== 'number' || isNaN(n)) throw new TypeError('Not a Number');
    n = Math.floor(n);
    if (n < 1 || n > 10) throw new TypeError('Out of range');
    this.number = Math.floor(n);
  }

  valueOf() {
    return this.number;
  }

  toString() {
    return `${this.number}`;
  }
}

console.log(new Num(3) * new Num(4)); // 12
console.log(new Num(3.5) + new Num(1.8)); // 4
console.log(new Num('error')); // TypeError: Not a Number
console.log(new Num(11)); // TypeError: Out of range
