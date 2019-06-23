// The Hofstadter Q sequence is defined as:
// Q(1)=Q(2)=1, Q(n)=Q(n−Q(n−1))+Q(n−Q(n−2)), n>2.
// It is defined like the Fibonacci sequence, but whereas the next term
// in the Fibonacci sequence is the sum of the previous two terms,
// in the Q sequence the previous two terms tell you how far to go back
// in the Q sequence to find the two numbers to sum to make the next term of the sequence.
// Task: 1.Implement the Hofstadter Q Sequence equation into JavaScript.
// 2.Count and display how many times a member of the sequence is less
// than its preceding term for terms up to and including the 100,000th term.

// Top-down approach - Memoization
function memoize(fn) {
  const cache = {};

  return function(arg) {
    if (cache[arg] !== undefined) return cache[arg];

    cache[arg] = fn.call(this, arg);
    return cache[arg];
  };
}

const memHofstadterQ = memoize(hofstadterQ);

function hofstadterQ (n) {
  if (n <= 2) return 1;
  return memHofstadterQ(n - memHofstadterQ(n - 1)) + memHofstadterQ(n - memHofstadterQ(n - 2));
}

console.log(hofstadterQ(1000)); // 502
console.log(hofstadterQ(2500)); // 1261
// console.log(hofstadterQ(100000)); // RangeError: Maximum call stack size exceeded

// Bottom-up approach - Tabulation

function hofstadterQBU(n) {
  const result = [0, 1, 1];

  for (let i = 3; i <= n; i++) {
    result[i] = result[i - result[i - 1]] + result[i - result[i - 2]];
  }

  return {
    lastTerm: result[n],
    numberOfLessTerms: result.reduce((acc, item, idx, arr) => item < arr[idx - 1] ? acc + 1 : acc, 0)
  };
}

console.log(hofstadterQBU(2500)); // { lastTerm: 1261, numberOfLessTerms: 1159 }
console.log(hofstadterQBU(100000)); // { lastTerm: 48157, numberOfLessTerms: 49798 }
console.log(hofstadterQBU(1000000)); // { lastTerm: 512066, numberOfLessTerms: 498638 }
