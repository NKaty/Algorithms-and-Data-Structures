// Create a function, or show a built-in function, to count the number
// of non-overlapping occurrences of a substring inside a string.
// The function should take two arguments: the first argument being the string
// to search, and the second a substring to be searched for.
// It should return an integer count.
// The matching should yield the highest number of non-overlapping matches.
// In general, this essentially means matching from left-to-right or right-to-left.

function countSubstring (str, subStr) {
  return str.split(subStr).length - 1;
}

console.log(countSubstring('the three truths', 'th')); // 3
console.log(countSubstring('ababababab', 'abab')); // 2
console.log(countSubstring('abaabba*bbaba*bbab', 'a*b')); // 2
