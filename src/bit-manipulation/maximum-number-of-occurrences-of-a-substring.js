// Given a string s, return the maximum number of occurrences
// of any substring under the following rules:
// 1. The number of unique characters in the substring
// must be less than or equal to maxLetters.
// 2. The substring size must be between minSize and maxSize inclusive.

// Constraints:
// 1 <= s.length <= 10 ^ 5
// 1 <= maxLetters <= 26
// 1 <= minSize <= maxSize <= min(26, s.length)
// s only contains lowercase English letters

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

// If the substring with maxSize occurs in the string
// a certain number of times, the substring with minSize
// occurs the same number of times. So we can ignore maxSize
// parameter and just look for a substring with minSize
const findMaxFrequency = (s, maxLetters, minSize, maxSize) => {
  // Here we will keep the number of occurrences of substrings
  const substringMap = {};
  let maxFrequency = 0;
  const start = 'a'.codePointAt(0);

  // We iterate over every possible substring
  for (let i = 0; i <= s.length - minSize; i++) {
    let mask = 0;
    const substring = s.slice(i, i + minSize);

    // We construct a mask
    // We can use a 32-bit integer to create a mask for every
    // substring where each bit will correspond to a letter
    // For example: 'abcwa' --> 00000000010000000000000000000111
    //                                   w                   cba
    // At this point we don't care how many times every letter
    // occurs in the substring, we want to know how many unique
    // letters are in the substring
    for (const char of substring) {
      mask |= (1 << (char.codePointAt(0) - start));
    }

    // We count set bits in the mask
    // And if the number of set bits satisfies the first rule
    // (The number of unique characters in the substring
    // must be less than or equal to maxLetters),
    // we update the number occurrences in substringMap and maxFrequency
    if (countBits(mask) <= maxLetters) {
      substringMap[substring] = (substringMap[substring] || 0) + 1;
      maxFrequency = Math.max(maxFrequency, substringMap[substring]);
    }
  }

  return maxFrequency;
};

console.log(findMaxFrequency('aababcaabbaa', 2, 3, 4)); // 2
console.log(findMaxFrequency('aabcabcab', 2, 2, 3)); // 3
console.log(findMaxFrequency('abcde', 2, 3, 3)); // 0

const findMaxFrequencyWithMap = (s, maxLetters, minSize, maxSize) => {
  // We create our first substring
  let substring = s.slice(0, minSize);
  // Here we will keep the number of occurrences of substrings
  const substringMap = {};
  // Here we will keep characters of the current substring and
  // the numbers of their occurrences in the current substring
  const chars = new Map();

  // We iterate over every character in the first substring
  // and add the number of its occurrences to chars map
  for (const char of substring) {
    if (chars.has(char)) chars.set(char, chars.get(char) + 1);
    else chars.set(char, 1);
  }

  // We iterate over every possible substring
  for (let i = 1; i <= s.length - minSize; i++) {
    // We start by checking the substring we got on the previous
    // iteration (or our first substring)
    // If the number of unique characters in the substring satisfies
    // the first rule, we update the number of occurrences in substringMap
    if (chars.size <= maxLetters) {
      substringMap[substring] = (substringMap[substring] || 0) + 1;
    }

    // Now we create a new substring
    substring = s.slice(i, i + minSize);

    // We correct the map of characters to match the new substring
    // We remove the first character of the previous substring
    if (chars.get(s[i - 1]) - 1 === 0) chars.delete(s[i - 1]);
    else chars.set(s[i - 1], chars.get(s[i - 1]) - 1);

    // We add the last character of the current substring
    if (chars.has(s[i + minSize - 1])) {
      chars.set(s[i + minSize - 1], chars.get(s[i + minSize - 1]) + 1);
    } else {
      chars.set(s[i + minSize - 1], 1);
    }
  }

  // We update the number of occurrences for the last substring
  if (chars.size <= maxLetters) {
    substringMap[substring] = (substringMap[substring] || 0) + 1;
  }

  return Math.max(0, ...Object.values(substringMap));
};

console.log(findMaxFrequencyWithMap('aababcaabbaa', 2, 3, 4)); // 2
console.log(findMaxFrequencyWithMap('aabcabcab', 2, 2, 3)); // 3
console.log(findMaxFrequencyWithMap('abcde', 2, 3, 3)); // 0
