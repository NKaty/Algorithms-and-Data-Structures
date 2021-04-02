// Given an integer, write an algorithm to convert it to hexadecimal.
// For negative integer, two’s complement method is used.

// Note:
// 1. All letters in hexadecimal (a-f) must be in lowercase.
// 2. The hexadecimal string must not contain extra leading 0s.
// If the number is zero, it is represented by a single zero character '0';
// otherwise, the first character in the hexadecimal string will not be the zero character.
// 3. The given number is guaranteed to fit within the range of a 32-bit signed integer.
// 4. You must not use any method provided by the library
// which converts/formats the number to hex directly.

const toHex = (num) => {
  const hexChars = '0123456789abcdef';
  let hex = '';

  while (num) {
    // Every 4 bits is a hex character
    // Every loop we take the last 4 bits and convert them to a hex character
    // 15 - 00000000000000000000000000001111
    // bits will be a number from 0 to 15 - the index of hex character in hexChars
    const bits = num & 15;
    hex = hexChars[bits] + hex;
    // If we use >> (right shift) instead of >>> (unsigned right shift)
    // we must also change the while condition - add an additional check for hex.length < 8
    // in order not to get an infinite loop with negative numbers.
    // JavaScript uses two’s complement to represent negative numbers
    // (https://www.youtube.com/watch?v=4qH4unVtJkE).
    // In two’s complement, the first bit on the left represents the sign,
    // 0 is a positive number, 1 is a negative number.
    // In case of >>, the original most significant bit will fill in the empty bit,
    // and so the sign after bit shift will be preserved.
    // -9 - 11111111111111111111111111110111
    // -9 >> 4 --> 11111111111111111111111111111111 --> we get an infinite loop
    // >>> ignores the sign and fill all the left empty positions with zero.
    // -9 >>> 4 --> 00001111111111111111111111111111 --> we get 0 in the end
    // So with >> the while condition looks like: while (num && hex.length < 8)
    num = num >>> 4;
  }

  return hex || '0';
};

console.log(toHex(-9)); // fffffff7
console.log(toHex(26)); // 1a
console.log(toHex(0)); // 0
