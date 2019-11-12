// Frequency Counter - validAnagram
// Given two strings, write a function to determine if the second string is
// an anagram of the first. An anagram is a word, phrase, or name formed
// by rearranging the letters of another, such as cinema, formed from iceman.
// Note: You may assume the string contains only lowercase alphabets.

// Time Complexity - O(n)

function validAnagram(word1, word2) {
  if (word1.length !== word2.length) return false;

  const obj = {};

  for (const char of word1) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of word2) {
    if (obj[char]) obj[char]--;
    else return false;
  }

  return true;
}

console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
