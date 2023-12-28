// Reverse bits of a given 32 bits unsigned integer.

// Iterative approach
const reverseBits = function(n) {
  let reversedNumber = 0;

  for (let i = 31; i >= 0; i--) {
    reversedNumber |= ((n & 1) << i);
    n = n >> 1;
  }

  // Get unsigned integer
  return reversedNumber >>> 0;
};

console.log(reverseBits(43261596)); // 964176192
// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)
console.log(reverseBits(43261597)); // 3111659840
// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)
console.log(reverseBits(4294967293)); // 3221225471
// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)

// Divide and conquer approach
const reverseBitsDivideAndConquer = function(n) {
  // console.log('Start', n.toString(2));

  // Break the 32-bit into 2 blocks of 16 bits, and switch them
  n = (n >>> 16) | (n << 16);
  // console.log('After 1th switch', (n >>> 0).toString(2));

  // 0xff00ff00 - 11111111000000001111111100000000
  // 0x00ff00ff - 00000000111111110000000011111111
  // Break the 32-bit into 4 blocks of 8 bits, and switch them
  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
  // console.log('After 2th switch', (n >>> 0).toString(2));

  // 0xf0f0f0f0 - 11110000111100001111000011110000
  // 0x0f0f0f0f - 00001111000011110000111100001111
  // Break the 32-bit into 8 blocks of 4 bits, and switch them
  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
  // console.log('After 3th switch', (n >>> 0).toString(2));

  // 0xcccccccc - 11001100110011001100110011001100
  // 0x33333333 - 00110011001100110011001100110011
  // Break the 32-bit into 16 blocks of 2 bits, and switch them
  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
  // console.log('After 4th switch', (n >>> 0).toString(2));

  // 0xaaaaaaaa - 10101010101010101010101010101010
  // 0x55555555 - 01010101010101010101010101010101
  // Break the 32-bit into 32 blocks of 1 bit, and switch them
  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
  // console.log('After 5th switch', (n >>> 0).toString(2));

  // Get unsigned integer
  return n >>> 0;
};

console.log(reverseBitsDivideAndConquer(43261596)); // 964176192
// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)
// Start               00000010100101000001111010011100
// After 1st switch    00011110100111000000001010010100
// After 2th switch    10011100000111101001010000000010
// After 3th switch    11001001111000010100100100100000
// After 4th switch    00110110101101000001011010000000
// After 5th switch    00111001011110000010100101000000

console.log(reverseBitsDivideAndConquer(43261597)); // 3111659840
// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)
console.log(reverseBitsDivideAndConquer(4294967293)); // 3221225471
// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)
