// A message containing letters from A-Z can be encoded
// into numbers using the following mapping:
// 'A' -> "1"
// 'B' -> "2"
// ...
// 'Z' -> "26"
// To decode an encoded message, all the digits must be grouped
// then mapped back into letters using the reverse of the mapping
// above (there may be multiple ways). For example, "11106" can be mapped into:
// "AAJF" with the grouping (1 1 10 6)
// "KJF" with the grouping (11 10 6)
// Note that the grouping (1 11 06) is invalid because "06"
// cannot be mapped into 'F' since "6" is different from "06".
// Given a string s containing only digits, return the number of ways to decode it.

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function numDecodingBF(s) {
  function decode(index) {
    if (index >= s.length) {
      return 1;
    }
    if (s[index] === '0') {
      return 0;
    }
    return decode(index + 1) +
      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));
  }

  return decode(0);
}

console.log(numDecodingBF('226')); // 3
console.log(numDecodingBF('06')); // 0
console.log(numDecodingBF('38475')); // 1

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function numDecodingTD(s) {
  const memo = {};

  function decode(index) {
    if (index >= s.length) {
      return 1;
    }
    if (memo[index] !== undefined) {
      return memo[index];
    }
    if (s[index] === '0') {
      return 0;
    }
    memo[index] = decode(index + 1) +
      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));
    return memo[index];
  }

  return decode(0);
}

console.log(numDecodingTD('226')); // 3
console.log(numDecodingTD('06')); // 0
console.log(numDecodingTD('38475')); // 1
console.log(numDecodingTD('111111111111111111111111111111111111111111111')); // 1836311903

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(1)
function numDecodingBU(s) {
  let prevCount = 0;
  let currentCount = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    let tempCount = 0;
    if (s[i] !== '0') {
      tempCount += currentCount;
      if (s[i] + s[i + 1] <= 26) {
        tempCount += prevCount;
      }
    }
    prevCount = currentCount;
    currentCount = tempCount;
  }
  return currentCount;
}

console.log(numDecodingBU('226')); // 3
console.log(numDecodingBU('06')); // 0
console.log(numDecodingBU('38475')); // 1
console.log(numDecodingBU('111111111111111111111111111111111111111111111')); // 1836311903
