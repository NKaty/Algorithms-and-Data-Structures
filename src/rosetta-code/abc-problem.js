// You are given a collection of ABC blocks (e.g., childhood alphabet blocks).
// There are 20 blocks with two letters on each block. A complete alphabet is
// guaranteed amongst all sides of the blocks.
// Write a function that takes a string (word) and determines whether
// the word can be spelled with the given collection of blocks.
// Once a letter on a block is used that block cannot be used again.
// The function should be case-insensitive.

function canMakeWord (
  word,
  characters = 'BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM'
) {
  const wordArray = word.toUpperCase().split('');
  const charArray = characters.split(' ').map(item => item.split(''));

  const charObject = charArray.reduce((acc, item) => {
    item.forEach((char) => {
      acc[char] = ++acc[char] || 1;
    });

    return acc;
  }, {});

  const check = (arr, obj) => {
    if (arr.length === 0) {
      return wordArray.every(char => --obj[char] > -1);
    }

    const item = arr[0];
    const newArr = arr.slice(1);

    if (wordArray.includes(item[0]) && wordArray.includes(item[1])) {
      const newObj0 = { ...obj };
      const newObj1 = { ...obj };
      newObj0[item[0]]--;
      newObj1[item[1]]--;
      return check(newArr, newObj0) || check(newArr, newObj1);
    } else return check(newArr, { ...obj });
  };

  return check(charArray, charObject);
}

console.log(canMakeWord('')); // true
console.log(canMakeWord('A')); // true
console.log(canMakeWord('bark')); // true
console.log(canMakeWord('BooK')); // false
console.log(canMakeWord('BooK', 'BO OK DQ OJ CP NA GT RE TG QD FS JW BU VI AN ER FS LY PC ZM')); // true
console.log(canMakeWord('TReAT')); // true
console.log(canMakeWord('COMMON')); // false
console.log(canMakeWord('squAD')); // true
console.log(canMakeWord('conFUSE')); // true
