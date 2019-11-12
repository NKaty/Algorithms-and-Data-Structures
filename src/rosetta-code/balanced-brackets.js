// Determine whether a generated string of brackets is balanced;
// that is, whether it consists entirely of pairs of opening/closing
// brackets (in that order), none of which mis-nest.

function isBalanced (str) {
  const stack = [];
  const brackets = {
    '}': '{',
    ')': '(',
    ']': '['
  };
  const bracketsStr = str.replace(/[^(){}[\]]/gi, '');

  for (const bracket of bracketsStr) {
    if (Object.values(brackets).includes(bracket)) {
      stack.push(bracket);
    } else if (Object.keys(brackets).includes(bracket)) {
      const openBracket = stack.pop();
      if (brackets[bracket] !== openBracket) return false;
    } else {
      throw new Error('Invalid brackets');
    }
  }

  if (stack.length) return false;
  return true;
}

console.log(isBalanced('[1{2{fk(f/k)(f[ff])}(adsa)}hjkl]')); // true
console.log(isBalanced('[12{fkf/k(fff})}(adsa)hjkl]')); // false
