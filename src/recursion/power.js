// power
// Write a function called power which accepts a base and an exponent.
// The function should return the power of the base to the exponent.
// This function should mimic the functionality of Math.pow().
// Do not worry about negative bases and exponents.

function power(num, pow) {
  if (pow === 0) return 1;

  return num * power(num, pow - 1);
}

console.log(power(2, 0)); // 1
console.log(power(2, 2)); // 4
console.log(power(2, 4)); // 16
