// Given a string S, we can transform every letter individually
// to be lowercase or uppercase to create another string.
// Return a list of all possible strings we could create.
// You can return the output in any order.

// Constraints:
// S will be a string with length between 1 and 12.
// S will consist only of letters or digits.

const letterCasePermutation = (s) => {
  const permutations = [];
  let mask = 0;

  // We know that a string must be 12 characters long at most
  // So we can use a 32-bit integer as a bitmask
  // We construct bitmask to distinguish between letters and digits
  // 0 means a letter, 1 means a digit
  // For example, 'a1b2' will have the following bitmask: 0101 == 5
  for (const char of s) {
    mask <<= 1;
    if (!/[a-zA-Z]/.test(char)) mask += 1;
  }

  // We also use i as a bitmask
  // Every iteration we add 1 to i and get a new bitmask
  // For example for 'a1b2':
  // Bitmasks will be 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111
  // We stop when i == (1 << nums.length) --> i == 10000 (or 1111 + 1)
  for (let i = 0; i < (1 << s.length); i++) {
    // We can have digits in our string, that we don't need to transform
    // So we check if there is any set bits in i that also are set in mask
    // and if there are, we skip that iteration
    // In our example:
    // 0000 --> 'a1b2'
    // 0001 --> we skip the iteration
    // 0010 --> 'a1B2'
    // 0011 0100 0101 0110 0111 --> we skip the iterations
    // 1000 --> 'A1b2'
    // 1001 --> we skip the iteration
    // 1010 --> 'A1B2'
    // 1011 1100 1101 1110 1111 --> we skip the iterations
    if (!(mask & i)) {
      let permutation = '';

      // For every bitmask we go through each bit
      for (let j = s.length - 1; j >= 0; j--) {
        // And if the bit is set and the corresponding character is a letter,
        // we transform it to be lowercase or uppercase
        if (i & (1 << j) && !(mask & (1 << j))) {
          // We can toggle the case of a letter with help of a bit manipulation
          // code point ^ (1 << 5) --> code point ^ 32
          // For example: 'a' --> 97
          // 97 ^ 32 == 65 == 'A'
          // Because of the rule: if a ^ b == c, then a ^ c == b and c ^ b == a
          // 65 ^ 32 == 97 == 'a'
          permutation += String.fromCodePoint(s[s.length - j - 1].codePointAt(0) ^ 32);
        // If the bit is not set or the corresponding character is a digit,
        // we leave it as it is
        } else {
          permutation += s[s.length - j - 1];
        }
      }

      permutations.push(permutation);
    }
  }

  return permutations;
};

console.log(letterCasePermutation('a1b2')); // ['a1b2', 'a1B2', 'A1b2', 'A1B2'];
console.log(letterCasePermutation('12345')); // ['12345']

// Recursive version
const letterCasePermutationRecursive = function(s) {
  const permutations = [];

  const transform = (permutation, index) => {
    permutations.push(permutation);

    // We iterate over every character in the string
    // starting from a certain index and if the character is a letter
    // we toggle the case of the letter and split a new branch
    // For example: 'a1b2'
    //     a1b2
    //   /     \
    // A1b2   a1B2
    //  |
    // A1B2
    for (let i = index; i < permutation.length; i++) {
      if (/[a-zA-Z]/.test(permutation[i])) {
        const newPermutation = permutation.slice(0, i) +
          String.fromCodePoint(permutation[i].codePointAt(0) ^ 32) +
          permutation.slice(i + 1);
        transform(newPermutation, i + 1);
      }
    }
  };

  // We start with an original string
  transform(s, 0);
  return permutations;
};

console.log(letterCasePermutationRecursive('a1b2')); // ['a1b2', 'A1b2', 'A1B2', 'a1B2']
console.log(letterCasePermutationRecursive('12345')); // ['12345']
