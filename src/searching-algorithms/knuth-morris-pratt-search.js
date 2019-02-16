// Knuth-Morris-Pratt algorithm
// Write a function which accepts a string and a pattern, and returns the index
// at which the value exists. If the pattern does not exist in the string, return -1.

// Time Complexity - O(n + m)
// Space complexity - O(n)

function buildArrayPattern(pattern) {
  const arrayPattern = [0];
  let prefix = 0;
  let suffix = 1;

  while (arrayPattern.length < pattern.length) {
    if (pattern[prefix] === pattern[suffix]) {
      arrayPattern.push(prefix + 1);
      prefix++;
      suffix++;
    } else if (prefix === 0) {
      arrayPattern.push(0);
      suffix++;
    } else {
      prefix = arrayPattern[prefix - 1];
    }
  }

  return arrayPattern;
}

function kmp(text, pattern) {
  const arrayPattern = buildArrayPattern(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        return textIndex - pattern.length + 1;
      } else {
        textIndex++;
        patternIndex++;
      }
    } else if (patternIndex === 0) {
      textIndex++;
    } else {
      patternIndex = arrayPattern[patternIndex - 1];
    }
  }

  return -1;
}

console.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 1
console.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // -1

function kmpCounter(text, pattern) {
  const arrayPattern = buildArrayPattern(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  let counter = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        textIndex++;
        patternIndex = 0;
        counter++;
      } else {
        textIndex++;
        patternIndex++;
      }
    } else if (patternIndex === 0) {
      textIndex++;
    } else {
      patternIndex = arrayPattern[patternIndex - 1];
    }
  }

  return counter;
}

console.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 2
console.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // 0
