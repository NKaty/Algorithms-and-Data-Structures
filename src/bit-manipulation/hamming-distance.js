// The Hamming distance between two integers is the number
// of positions at which the corresponding bits are different.
// Given two integers x and y, calculate the Hamming distance.

// Note:
// 0 ≤ x, y < 2 ^ 31

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

const hammingDistance = (x, y) => {
  // Gets the difference
  const diff = x ^ y;
  // Counts ones in the binary representation of the difference
  return countBits(diff);
};

console.log(hammingDistance(1, 4)); // 2
console.log(hammingDistance(458, 29757573)); // 12
