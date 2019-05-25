// The phrase "I before E, except after C" is a widely known mnemonic
// which is supposed to help when spelling English words.
// Using the words provided, check if the two sub-clauses
// of the phrase are plausible individually:
// "I before E when not preceded by C".
// "E before I when preceded by C".
// If both sub-phrases are plausible then the original phrase
// can be said to be plausible.
// Write a function that accepts a word and check if the word follows this rule.
// The function should return true if it follows the rule otherwise false.

function IBeforeExceptC (word) {
  if (word.includes('cei')) return true;

  const index = word.indexOf('ie');
  if (index !== -1 && word[index - 1] !== 'c') return true;

  return false;
}

console.log(IBeforeExceptC('receive')); // true
console.log(IBeforeExceptC('science')); // false
