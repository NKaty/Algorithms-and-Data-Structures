// The Hamming distance between two integers is the number
// of positions at which the corresponding bits are different.
// Now your job is to find the total Hamming distance between
// all pairs of the given numbers.

// Note:
// Elements of the given array are in the range of 0 to 10 ^ 9
// Length of the array will not exceed 10 ^ 4.

const findTotalHammingDistance = (nums) => {
  let mask = 1;
  let totalHammingDistance = 0;

  // We iterate over every bit
  for (let i = 0; i <= 31; i++) {
    let ones = 0;
    let zeros = 0;

    // For every number in the array we check if the bit is set
    for (const num of nums) {
      const bit = num & mask;
      // We count how many numbers have the bit set
      ones += (bit !== 0);
      // and how many don't
      zeros += (bit === 0);
    }

    // We count how many possible combinations of the numbers there can be
    // For example: [4, 14, 2]
    // 0100 (4)
    // 1110 (14)
    // 0010 (2)
    // 1220 ones
    // 2113 zeros
    // 2220 == 6 - totalHammingDistance
    // The third bit: we can have two combinations of the numbers
    // where the bits are different --> 4 and 14, 14 and 2
    // The second bit: 4 and 2, 14 and 2
    // The first bit: 4 and 14, 4 and 2
    // The zeroth bit: we don't have any combinations
    totalHammingDistance += ones * zeros;
    mask = mask << 1;
  }

  return totalHammingDistance;
};

console.log(findTotalHammingDistance([4, 14, 2])); // 6
console.log(findTotalHammingDistance([10, 49, 37, 0, 107, 45, 675])); // 78
