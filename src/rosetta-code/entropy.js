// Calculate the Shannon entropy H of a given input string.

function entropy (s) {
  return Object.values(s.split('').reduce((acc, item) => {
    acc[item] = ++acc[item] || 1;
    return acc;
  }, {})).reduce((acc, item) => {
    acc += item / s.length * Math.log2(item / s.length);
    return acc;
  }, 0) * -1;
}

console.log(entropy('0123456789abcdef')); // 4
console.log(entropy('1223334444')); // 1.8464393446710154
