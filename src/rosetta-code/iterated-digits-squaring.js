// If you add the square of the digits of a Natural number
// (an integer bigger than zero), you always end with either 1 or 89:
// 15 -> 26 -> 40 -> 16 -> 37 -> 58 -> 89
// Write a function that takes a number as a parameter and returns
// 1 or 89 after performing the mentioned process.
// Count how many number chains for integers 1 <= n < 1_000_000
// (1 <= n < 100_000_000) end with a value 89.

function iteratedSquare (n) {
  while (true) {
    if (n === 1 || n === 89) return n;
    n = `${n}`.split('').reduce((acc, item) => acc + Math.pow(parseInt(item), 2), 0);
  }
}

console.log(iteratedSquare(70)); // 1

function getNumberOfChains () {
  const memo = {};

  function iteratedSquare (n) {
    let number = n;

    while (true) {
      if (number === 1 || number === 89) {
        memo[n] = number;
        return number;
      }

      if (memo[number]) {
        memo[n] = memo[number];
        return memo[number];
      }

      number = `${number}`.split('').reduce((acc, item) => acc + Math.pow(parseInt(item), 2), 0);
    }
  }

  let count = 0;

  for (let i = 1; i < 1000000; i++) {
    if (iteratedSquare(i) === 89) count++;
  }

  return count;
}

console.log(getNumberOfChains()); // 856929
