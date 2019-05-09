// Write a function that returns the factors of a positive integer.
// These factors are the positive integers by which the number
// being factored can be divided to yield a positive integer result.

function factors (num) {
  const resultLeft = [];
  const resultRight = [];
  const squareRoot = Math.sqrt(num);

  for (let i = 1; i <= squareRoot; i++) {
    if (num % i === 0) {
      resultLeft.push(i);
      if (num / i !== i) resultRight.unshift(num / i);
    }
  }

  return [...resultLeft, ...resultRight];
}

console.log(factors(45)); // [ 1, 3, 5, 9, 15, 45 ]
console.log(factors(64)); // [ 1, 2, 4, 8, 16, 32, 64 ]
