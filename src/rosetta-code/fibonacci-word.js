// Write a function to return the Fibonacci Words upto N. N will be provided
// as a parameter to the function. The function should return an array of objects.
// The objects should be of the form : { number: 1, length: 1, entropy: 0, word: '1' }.
// The Fibonacci Word may be created in a manner analogous to
// the Fibonacci Sequence as described here: Define F_Word1 as 1, Define F_Word2 as 0
// Form F_Word3 as F_Word2 concatenated with F_Word1 i.e.: 01
// Form F_Wordn as F_Wordn-1 concatenated with F_wordn-2

function * genFibWordSequence () {
  let next = '0';
  let prev = '1';

  while (true) {
    yield prev;
    [prev, next] = [next, next + prev];
  }
}

function entropy (s) {
  return Object.values(s.split('').reduce((acc, item) => {
    acc[item] = ++acc[item] || 1;
    return acc;
  }, {})).reduce((acc, item) => {
    acc += item / s.length * Math.log2(item / s.length);
    return acc;
  }, 0) * -1;
}

function fibWord (n) {
  const genFibWord = genFibWordSequence();
  const result = [];
  let count = 1;
  let word;

  while (count <= n) {
    word = genFibWord.next().value;
    result.push({
      number: count,
      length: word.length,
      entropy: entropy(word),
      word: word.length < 100 ? word : ''
    });
    count++;
  }

  return result;
}

console.log(fibWord(7));
// [ { number: 1, length: 1, entropy: -0, word: '1' },
// { number: 2, length: 1, entropy: -0, word: '0' },
// { number: 3, length: 2, entropy: 1, word: '01' },
// { number: 4, length: 3, entropy: 0.9182958340544896, word: '010' },
// { number: 5, length: 5, entropy: 0.9709505944546686, word: '01001' },
// { number: 6, length: 8, entropy: 0.954434002924965, word: '01001010' },
// { number: 7, length: 13, entropy: 0.9612366047228759, word: '0100101001001' } ]
