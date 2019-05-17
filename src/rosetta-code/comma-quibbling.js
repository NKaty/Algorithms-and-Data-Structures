// Write a function to generate a string output which is
// the concatenation of input words from a list/sequence where:
// An input of no words produces the output string of just the two brace characters "{}".
// An input of just one word, e.g. ["ABC"], produces the output string
// of the word inside the two braces, e.g. "{ABC}".
// An input of two words, e.g. ["ABC", "DEF"], produces the output string of the two words
// inside the two braces with the words separated by the string " and ", e.g. "{ABC and DEF}".
// An input of three or more words, e.g. ["ABC", "DEF", "G", "H"], produces
// the output string of all but the last word separated by ", " with the last
// word separated by " and " and all within braces; e.g. "{ABC, DEF, G and H}".
// Note: Assume words are non-empty strings of uppercase characters for this task.

function quibble (words) {
  const len = words.length;
  let result = '}';

  for (let i = len - 1; i >= 0; i--) {
    if (i === 0) result = `${words[i]}${result}`;
    else if (i === len - 1) result = ` and ${words[i]}${result}`;
    else result = `,${words[i]}${result}`;
  }

  result = `{${result}`;

  return result;
}

console.log(quibble([])); // {}
console.log(quibble(['ABC'])); // {ABC}
console.log(quibble(['ABC', 'DEF'])); // {ABC and DEF}
console.log(quibble(['ABC', 'DEF', 'G', 'H'])); // {ABC,DEF,G and H}
