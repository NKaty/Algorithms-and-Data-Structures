// Given a positive integer num, output its complement number.
// The complement strategy is to flip the bits of its binary representation.

// Constraints:
// The given integer num is guaranteed to fit within the range of a 32-bit signed integer.
// num >= 1
// You could assume no leading zero bit in the integer’s binary representation.

const findComplement = (num) => {
  // For example 100 --> 27:
  // 100 =                              00000000000000000000000001100100
  // mostSignificantBit =               00000000000000000000000001000000
  // mostSignificantBit - 1 =           00000000000000000000000000111111
  // ~num                               11111111111111111111111110011011
  // ~num & (mostSignificantBit - 1) =  00000000000000000000000000011011
  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));
  return ~num & (mostSignificantBit - 1);
};

console.log(findComplement(100)); // 27
console.log(findComplement(967)); // 56
console.log(findComplement(1)); // 0

const findComplementXOR = (num) => {
  // For example 100 --> 27:
  // 100 =                                 00000000000000000000000001100100
  // mostSignificantBit =                  00000000000000000000000001000000
  // mostSignificantBit << 1 =             00000000000000000000000010000000
  // (mostSignificantBit << 1) - 1 =       00000000000000000000000001111111
  // num ^ (mostSignificantBit << 1) - 1 = 00000000000000000000000000011011
  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));
  return num ^ ((mostSignificantBit << 1) - 1);
};

console.log(findComplementXOR(100)); // 27
console.log(findComplementXOR(967)); // 56
console.log(findComplementXOR(1)); // 0

const findComplementIterative = (num) => {
  // After while loop: i == ((mostSignificantBit << 1) - 1) from findComplementXOR
  // For example 100 --> 27:
  // 100 =     00000000000000000000000001100100
  // i =       00000000000000000000000001111111
  // num ^ i = 00000000000000000000000000011011
  let i = 1;

  while (i < num) {
    i <<= 1;
    i++;
  }

  return num ^ i;
};

console.log(findComplementIterative(100)); // 27
console.log(findComplementIterative(967)); // 56
console.log(findComplementIterative(1)); // 0
