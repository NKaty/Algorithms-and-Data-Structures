// Write a function to calculate the binomial coefficient for the given value of n and k.
// This formula is recommended: (nk) = n!/((n−k)!k!) = n(n−1)(n−2)…(n−k+1)/k(k−1)(k−2)…1

function binom (n, k) {
  if (k < 0 || k > n) return 0;

  let factorialN = 1;
  let factorialK;
  let factorialNK;

  for (let i = 1; i <= n; i++) {
    factorialN *= i;

    if (i === k) factorialK = factorialN;
    if (i === n - k) factorialNK = factorialN;
  }

  return factorialN / (factorialNK * factorialK);
}

console.log(binom(12, 8)); // 495
console.log(binom(6, 1)); // 6
console.log(binom(10, 4)); // 210
