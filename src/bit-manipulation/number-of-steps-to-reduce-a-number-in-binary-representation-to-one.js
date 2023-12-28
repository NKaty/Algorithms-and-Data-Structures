// Given a number s in their binary representation.
// Return the number of steps to reduce it to 1 under the following rules:
// 1. If the current number is even, you have to divide it by 2.
// 2. If the current number is odd, you have to add 1 to it.
// It's guaranteed that you can always reach to one for all testcases.

// Constraints:
// 1 <= s.length <= 500
// s consists of characters '0' or '1'
// s[0] == '1'

const numSteps = (s) => {
  if (!+s) throw new Error('The binary string does not have ones.');

  let count = 0;
  let prev = 0;

  // We iterate over the binary string
  // We start from the least significant bits
  // We don't reduce the most significant bit
  for (let i = s.length - 1; i > 0; i--) {
    // We check if the current bit is 1 or 0 (s[i] ^ prev)
    // taking into account that we could add 1 to the number to
    // make it even on the previous iterations
    // If the current bit is 1, that means that we have to add 1
    // to make the number even, and we have to divide it by 2 in any case
    // (s[i] ^ prev)            +             1
    // For example, 110100011
    // 110100011
    //  11111110 prev
    //  01011101 == 5 odd steps
    //  11111111 == 8 even steps
    // 8 even steps + 5 odd steps + 1 step from prev == 14 steps
    count += (s[i] ^ prev) + 1;
    // We store the current bit as a previous value for
    // the next iteration taking into account carrying
    // In fact, once we get prev == 1, we will never change it,
    // because we will always need to carry 1
    // (in case of the current bit == 0 we carry a new one
    // we need to add, in case of the current bit == 1
    // we carry the old one from the previous step)
    prev |= s[i];
  }

  // We add prev in case there is a bit
  // we are carrying from the previous step
  return count + prev;
};

console.log(numSteps('110100011')); // 14
console.log(numSteps('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115

const numStepsBigInt = (s) => {
  if (!+s) throw new Error('The binary string does not have ones.');

  let count = 0;
  // We convert a binary string to a Big Int
  let num = BigInt('0b' + s);

  // While the number is not equal to 1
  while (num !== 1n) {
    // If the bit is set
    if (num & 1n) {
      // We need to add 1 to the number and divide it by 2
      // So it will be two steps
      count += 2;
      // We add 1 to the number
      num += 1n;
    // If the bit is not set
    } else {
      // We just need to divide the number by 2
      count++;
    }
    // We divide the number by 2
    num >>= 1n;
  }

  return count;
};

console.log(numStepsBigInt('110100011')); // 14
console.log(numStepsBigInt('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115
