// Given two integers a and b, return the sum
// of the two integers without using the operators + and -.

// Constraints:
// -1000 <= a, b <= 1000

const getSum = (a, b) => {
  // Adding numbers in binary representation works
  // the same way as adding numbers in decimal representation
  // For example, in decimal representation: 1487 + 2444
  //   1 4 8 7
  // + 2 4 4 4
  //   3 9 3 1
  //      1 1 - carry
  // In binary representation: 010111001111 + 100110001100
  //   0 1 0 1 1 1 0 0 1 1 1 1 - 1487
  // + 1 0 0 1 1 0 0 0 1 1 0 0 - 2444
  //   1 1 0 0 0 1 0 0 0 0 1 1 - without carrying (1487 ^ 2444)
  //        1 1       1 1      - carry
  //   1 1 1 1 0 1 0 1 1 0 1 1 - 3931 with carrying

  // While we have bits to add
  while (b) {
    // We find a carry
    // In our example:
    // 1 iteration: carry == 010111001111 & 100110001100 == 000110001100
    // 2 iteration: carry == 110001000011 & 001100011000 == 000000000000
    const carry = a & b;

    // We find all the bits that don't need to be carried
    // (the sum without carrying) and we keep our sum in the variable a
    // In our example:
    // 1 iteration: a ^ b == 010111001111 ^ 100110001100 == 110001000011
    // 2 iteration: a ^ b == 110001000011 ^ 001100011000 == 111101011011
    a = a ^ b;

    // We left shift the carry by one in order to add the carried bits
    // to the a on the next iteration
    // In our example:
    // 1 iteration: carry << 1 == 000110001100 << 1 == 001100011000
    // 2 iteration: carry << 1 == 000000000000 << 1 == 000000000000
    b = carry << 1;
  }

  // When we are succeeded in adding all the carried bits,
  // we return the result
  return a;
};

console.log(getSum(1487, 2444)); // 3931
console.log(getSum(20, -59)); // -39
console.log(getSum(20, 0)); // 20

// Recursive version
const getSumRecursive = (a, b) => {
  if (b === 0) return a;
  return getSum(a ^ b, (a & b) << 1);
};

console.log(getSumRecursive(1487, 2444)); // 3931
console.log(getSumRecursive(20, -59)); // -39
console.log(getSumRecursive(20, 0)); // 20
