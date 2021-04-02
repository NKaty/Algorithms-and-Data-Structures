// You are given two strings s and t. String t is generated
// by random shuffling string s and then add one more letter
// at a random position. Return the letter that was added to t.

// Constraints:
// 0 <= s.length <= 1000
// t.length == s.length + 1
// s and t consist of lower-case English letters.

const findTheDifference = (s, t) => {
  let letter = 0;

  // Uses the fact that n ^ n will be 0
  // We XOR all the code points from the both strings
  // and find the difference
  for (const c of s) {
    letter ^= c.codePointAt(0);
  }

  for (const c of t) {
    letter ^= c.codePointAt(0);
  }

  return String.fromCodePoint(letter);
};

console.log(findTheDifference('abcd', 'abcde')); // e
console.log(findTheDifference('abcdksitreafw', 'abcdwekaftrsiu')); // u
console.log(findTheDifference('', 'a')); // a
