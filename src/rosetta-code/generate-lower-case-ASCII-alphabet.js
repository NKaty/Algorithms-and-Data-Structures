// Write a function to generate an array of lower case ASCII characters,
// for a given range. For example: for range 1 to 4 the function
// should return ['a','b','c','d'].

function lascii (cFrom, cTo) {
  const result = [cFrom];

  for (let i = cFrom.charCodeAt(0) + 1; i <= cTo.charCodeAt(0); i++) {
    result.push(String.fromCharCode(i));
  }

  return result;
}

console.log(lascii('c', 'i')); // [ 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]
