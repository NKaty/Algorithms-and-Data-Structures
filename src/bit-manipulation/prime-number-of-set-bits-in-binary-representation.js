// Given two integers L and R, find the count of numbers in the range [L, R]
// (inclusive) having a prime number of set bits in their binary representation.
// (Recall that the number of set bits an integer has is the number of 1s
// present when written in binary. For example, 21 written in binary is 10101
// which has 3 set bits. Also, 1 is not a prime.)

// Note:
// L, R will be integers L <= R in the range [1, 10 ^ 6].
// R - L will be at most 10000.

const isPrime = (n) => {
  for (let i = 3; i * i <= n; i += 2) {
    if (!(n % i)) return false;
  }

  return true;
};

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

const countPrimeSetBits = (l, r) => {
  // We find all the prime numbers from 1 to 31
  // (We could find the prime numbers only from 1 to 20
  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])
  const primes = new Set([2]);
  for (let num = 3; num < 32; num += 2) {
    if (isPrime(num)) primes.add(num);
  }

  let count = 0;

  for (let num = l; num <= r; num++) {
    // If the number of bits is a prime number, we increase count by one
    if (primes.has(countBits(num))) count++;
  }

  return count;
};

console.time('countPrimeSetBits');
console.log(countPrimeSetBits(842, 888)); // 23
console.log(countPrimeSetBits(1, 100000000)); // 33601854
console.timeEnd('countPrimeSetBits');

// Attempt to improve countPrimeSetBits by memoization
// But it doesn't work
// countPrimeSetBitsMemoization is two-three times slower than countPrimeSetBits
// It works in Python though
const countPrimeSetBitsMemoization = (l, r) => {
  // We find all the prime numbers from 1 to 31
  // (We could find the prime numbers only from 1 to 20
  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])
  const primes = new Set([2]);
  for (let num = 3; num < 32; num += 2) {
    if (isPrime(num)) primes.add(num);
  }

  // We use memoization in order to reduce the number of countBits calls
  // If we know how many bits num & (num - 1) has, we can just add 1 to this value
  // to get the number of bits in num
  const memo = {};
  let count = 0;

  for (let num = l; num <= r; num++) {
    const memoKey = num & (num - 1);
    if (memoKey in memo) memo[num] = memo[memoKey] + 1;
    else memo[num] = countBits(num);

    // If the number of bits is a prime number, we increase count by one
    if (primes.has(memo[num])) count++;
  }

  return count;
};

console.time('countPrimeSetBitsMemoization');
console.log(countPrimeSetBitsMemoization(842, 888)); // 23
console.log(countPrimeSetBitsMemoization(1, 100000000)); // 33601854
console.timeEnd('countPrimeSetBitsMemoization');
