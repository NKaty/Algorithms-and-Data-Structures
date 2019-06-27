// These define three classifications of positive integers based on their proper divisors.
// Let P(n) be the sum of the proper divisors of n where proper divisors are
// all positive integers n other than n itself.
// If P(n) < n then n is classed as "deficient"
// If P(n) === n then n is classed as "perfect"
// If P(n) > n then n is classed as "abundant"
// Implement a function that calculates how many of the integers
// from 1 to 20,000 (inclusive) are in each of the three classes.
// Output the result as an array in the following format [deficient, perfect, abundant].

function getDPA (num) {
  let deficient = 1;
  let perfect = 0;
  let abundant = 0;
  let sum;

  for (let i = 2; i <= num; i++) {
    sum = 0;

    for (let j = 1; j <= i / 2; j++) {
      if (i % j === 0) sum += j;
      if (sum > i) break;
    }

    if (sum < i) deficient++;
    else if (sum > i) abundant++;
    else perfect++;
  }

  return [deficient, perfect, abundant];
}

console.log(getDPA(20000)); // [ 15043, 4, 4953 ]
