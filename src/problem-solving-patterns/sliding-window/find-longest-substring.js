// Sliding Window - findLongestSubstring
// Write a function called findLongestSubstring, which accepts a string and
// returns the length of the longest substring with all distinct characters.

// Time Complexity - O(n^2)

function findLongestSubstringVersion1(str) {
  let obj = {};
  let i = 0;
  let maxLen = 0;
  let tempLen = 0;
  while (i < str.length) {
    if (typeof obj[str[i]] !== 'undefined') {
      tempLen = 0;
      i = obj[str[i]] + 1;
      obj = {};
    } else {
      obj[str[i]] = i;
      tempLen++;
      i++;
    }
    maxLen = Math.max(maxLen, tempLen);
  }

  return maxLen;
}

console.log(findLongestSubstringVersion1('')); // 0
console.log(findLongestSubstringVersion1('rithmschool')); // 7
console.log(findLongestSubstringVersion1('thisisawesome')); // 6

// Time Complexity - O(n)

function findLongestSubstringVersion2(str) {
  const obj = {};
  let maxLen = 0;
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      start = Math.max(start, obj[str[i]]);
    }

    obj[str[i]] = i + 1;
    maxLen = Math.max(maxLen, i - start + 1);
  }

  return maxLen;
}

console.log(findLongestSubstringVersion2('')); // 0
console.log(findLongestSubstringVersion2('rithmschool')); // 7
console.log(findLongestSubstringVersion2('thisisawesome')); // 6
