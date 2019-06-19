// Write a function or program that can split a string at each non-escaped
// occurrence of a separator character. It should accept three input parameters:
// the string, the separator character, the escape character.
// It should output a list of strings. Rules for splitting:
// The fields that were separated by the separators, become the elements
// of the output list. Empty fields should be preserved, even at the start and end.
// Rules for escaping: "Escaped" means preceded by an occurrence of the escape
// character that is not already escaped itself. When the escape character precedes
// a character that has no special meaning, it still counts as an escape
// (but does not do anything special). Each occurrences of the escape character
// that was used to escape something, should not become part of the output.

function tokenize(str, sep, esc) {
  const result = [];
  let substring = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === sep) {
      result.push(substring);
      substring = '';
    } else if (str[i] === esc) {
      substring += str[++i];
    } else {
      substring += str[i];
    }
  }

  result.push(substring);
  return result;
}

console.log(tokenize('one^|uno||three^^^^|four^^^|^cuatro|', '|', '^')); // [ 'one|uno', '', 'three^^', 'four^|cuatro', '' ]
console.log(tokenize('a@&bcd&ef&&@@hi', '&', '@')); // [ 'a&bcd', 'ef', '', '@hi' ]
