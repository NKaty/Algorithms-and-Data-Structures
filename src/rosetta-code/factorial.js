// Write a function to return the factorial of a number.

function factorial(num) {
  if (num < 0) throw new Error('The number must not be negative');

  let result = 1;

  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}

console.log(factorial(20)); // 2432902008176640000
