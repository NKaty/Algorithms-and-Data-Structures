// This task is a variation of the short story by Arthur C. Clarke.
// In detail, to specify what is meant by a “name”:
// The integer 1 has 1 name “1”.
// The integer 2 has 2 names “1+1”, and “2”.
// The integer 3 has 3 names “1+1+1”, “2+1”, and “3”.
// The integer 4 has 5 names “1+1+1+1”, “2+1+1”, “2+2”, “3+1”, “4”.

function numberOfNamesTD (num) {
  const values = Array.from({ length: num }, (e, i) => i + 1);
  const index = values.length - 1;
  const memo = {};

  function countVariations(num, index) {
    if (num < 0 || index < 0) return 0;
    if (num === 0) return 1;

    const key = `${index}/${num}`;

    if (memo[key]) return memo[key];

    memo[key] = countVariations(num - values[index], index) + countVariations(num, index - 1);

    return memo[key];
  }
  return countVariations(num, index);
}

console.log(numberOfNamesTD(123)); // 2552338241

function numberOfNamesBU(num) {
  const values = Array.from({ length: num }, (e, i) => i + 1);
  const table = Array.from({ length: num + 1 }).fill(0);
  table[0] = 1;

  for (let i = 0; i < values.length; i++) {
    for (let j = values[i]; j <= num; j++) {
      table[j] += table[j - values[i]];
    }
  }

  return table[num];
}

console.log(numberOfNamesBU(12345)); // 6.942035795392596e+118
