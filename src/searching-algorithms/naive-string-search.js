// naive string search
// Write a function which accepts a string and a pattern,
// and counts the number of times the pattern appears in the string.

// Time Complexity - O(n * m)

function stringSearch (str, val) {
  let count = 0;

  for (let i = 0; i <= str.length - val.length; i++) {
    for (let j = 0; j < val.length; j++) {
      if (str[i + j] !== val[j]) break;
      if (j === val.length - 1) count++;
    }
  }

  return count;
}

console.log(stringSearch('hojoklokoklok', 'lok')); // 2
