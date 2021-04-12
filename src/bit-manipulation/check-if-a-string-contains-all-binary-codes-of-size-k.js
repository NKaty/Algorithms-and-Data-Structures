// Given a binary string s and an integer k.
// Return true if every binary code of length k is a substring of s.
// Otherwise, return false.

// Constraints:
// 1 <= s.length <= 5 * 10 ^ 5
// s[i] is either '0' or '1'
// 1 <= k <= 20

// For example, s == '00110110', k == 2
// number of combinations will be 4
// our mask will be 11
// Iterations:
// 1 --> 0 --> i + 1 >= 2 - false --> we don't add the substring to the collection
// 2 --> 00 (0) --> i + 1 >= 2 - true --> {0}
// 3 --> 01 (1) --> true --> {0, 1}
// 4 --> 11 (3) --> true --> {0, 1, 3}
// 5 --> 10 (2) --> true --> {0, 1, 3, 2} -->
// --> the length of our collection == number of combinations == 4 --> return true
const hasAllCodes = (s, k) => {
  // The number of all possible combinations is 2 ** k
  const numberOfCombinations = 1 << k;
  // The bitmask is all ones
  // For example, for k == 3, the bitmask will be 111
  const mask = numberOfCombinations - 1;
  // Here we store the binary substrings as numbers
  const substrings = new Set();
  // Our current substring as a number
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    // We construct a new substring by removing the first
    // character and by adding the current character
    // As we treat substrings as binary numbers
    // we can apply bitwise operations to them
    // The bitmask (mask) gives us the ability to control
    // the length of the substring
    hash = ((hash << 1) & mask) | s[i];
    // We start constructing substrings from the first
    // character (i == 0), so we need to make k iterations
    // before we get a substring of the wanted length
    if (i + 1 >= k) substrings.add(hash);
    // If the length of our substring collection reaches the number
    // of possible combinations, we return true
    if (substrings.size === numberOfCombinations) return true;
  }

  // Otherwise, we return false
  return false;
};

console.log(hasAllCodes('00110110', 2)); // true
console.log(hasAllCodes('0000000001011100', 4)); // false
