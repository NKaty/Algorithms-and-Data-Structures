// Write a function that takes a 32 bits unsigned integer and
// returns the number of '1' bits it has (also known as the Hamming weight).

// Time complexity - O(32)
const hammingWeight = function(n) {
  // Turn into an unsigned integer (just in case)
  n = n >>> 0;

  let count = 0;
  for (let i = 0; i < 32; i++) {
    count += n & 1;
    n = n >> 1;
  }

  return count;
};

console.log(hammingWeight(11)); // 3
console.log(hammingWeight(4294967285)); // 30

// Time complexity - O(K), where K is the number of ones
// present in the binary form of the given number
const hammingWeightQuick = function(n) {
  // Turn into an unsigned integer (just in case)
  n = n >>> 0;

  let count = 0;
  while (n !== 0) {
    // n & (n - 1) flips the least-significant bit to 0
    n = n & (n - 1);
    count++;
  }

  return count;
};

console.log(hammingWeightQuick(11)); // 3
console.log(hammingWeightQuick(4294967285)); // 30
