// Given a string s and a dictionary of strings wordDict,
// return true if s can be segmented into a space-separated sequence
// of one or more dictionary words.
// Note that the same word in the dictionary may be reused
// multiple times in the segmentation.
// Examples:
// s = "applepenapple", wordDict = ["apple","pen"] -> apple + pen + apple -> true
// s = "cars", wordDict = ["car","ca","rs"] -> ca + rs -> true
// s = "catsandog", wordDict = ["cats","dog","sand","and","cat"] -> cats + and + og || cat + sand + og -> false

// Brute Force
function wordBreak(s, wordDict) {
  if (!s) {
    return true;
  }
  for (const word of wordDict) {
    if (s.substring(0, word.length) === word &&
      wordBreak(s.substring(word.length), wordDict)) {
      return true;
    }
  }
  return false;
}

console.log(wordBreak('applepenapple', ['apple', 'pen'])); // true
console.log(wordBreak('cars', ['car', 'ca', 'rs'])); // true
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false

// Dynamic Programming

// Top-down approach - Memoization
function wordBreakTD(s, wordDict, memo = {}) {
  if (!s) {
    return true;
  }
  if (memo[s] !== undefined) {
    return memo[s];
  }
  for (const word of wordDict) {
    if (s.substring(0, word.length) === word &&
      wordBreakTD(s.substring(word.length), wordDict, memo)) {
      memo[s] = true;
      return true;
    }
  }
  memo[s] = false;
  return false;
}

console.log(wordBreakTD('applepenapple', ['apple', 'pen'])); // true
console.log(wordBreakTD('cars', ['car', 'ca', 'rs'])); // true
console.log(wordBreakTD('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false
console.log(wordBreakTD('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false

// Bottom-up approach - Tabulation
function wordBreakBU(s, wordDict) {
  const table = Array.from({ length: s.length + 1 }).fill(false);
  table[0] = true;
  for (let i = 0; i < table.length; i++) {
    if (table[i]) {
      for (const word of wordDict) {
        if (i + word.length <= table.length &&
          s.substring(i, i + word.length) === word) {
          table[i + word.length] = true;
        }
      }
    }
  }
  return table[s.length];
}

console.log(wordBreakBU('applepenapple', ['apple', 'pen'])); // true
console.log(wordBreakBU('cars', ['car', 'ca', 'rs'])); // true
console.log(wordBreakBU('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false
console.log(wordBreakBU('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false
