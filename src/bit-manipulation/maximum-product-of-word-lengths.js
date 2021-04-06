// Given a string array words, return the maximum value of
// length(word[i]) * length(word[j]) where the two words
// do not share common letters. If no such two words exist, return 0.

// Constraints:
// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] consists only of lowercase English letters.

const findMaxProduct = (words) => {
  // We can use a 32-bit integer to create a unique mask for every string
  // where each bit will correspond to a certain letter
  // For example: 'abcw' --> 00000000010000000000000000000111
  //                                  w                   cba
  const masks = {};
  let maxProduct = 0;
  const start = 'a'.codePointAt(0);

  // For every word
  for (let i = 0; i < words.length; i++) {
    let mask = 0;

    // we create a mask
    for (const c of words[i]) {
      mask |= 1 << (c.codePointAt(0) - start);
    }

    // We compare a new mask with other masks
    for (const k of Object.keys(masks)) {
      // And if they don't have common letters
      if (!(masks[k] & mask)) {
        // we calculate the product of their lengths and compare it with
        // the max product we found earlier
        maxProduct = Math.max(maxProduct, words[i].length * words[k].length);
      }
    }

    masks[i] = mask;
  }

  return maxProduct;
};

console.log(findMaxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'])); // 16
console.log(findMaxProduct(['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'])); // 4
console.log(findMaxProduct(['a', 'aa', 'aaa', 'aaaa'])); // 0
