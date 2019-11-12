// Frequency Counter - findAllDuplicates
// Given an array of positive integers, some elements appear twice and others appear once.
// Find all the elements that appear twice in this array.
// Note that you can return the elements in any order.

// Time Complexity - O(n)

function findAllDuplicates(arr) {
  const obj = {};
  const resultArr = [];

  for (const item of arr) {
    obj[item] = ++obj[item] || 1;
    if (obj[item] > 1) resultArr.push(item);
  }

  return resultArr;
}

console.log(findAllDuplicates([4, 3, 2, 1, 0])); // []
console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2 and 1
