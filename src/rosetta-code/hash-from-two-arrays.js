// Using two Arrays of equal length, create a Hash object where the elements
// from one array (the keys) are linked to the elements of the other (the values)

function arrToObj (keys, vals) {
  return keys.reduce((acc, item, index) => {
    acc[item] = vals[index];
    return acc;
  }, {});
}

console.log(arrToObj([1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e'])); // { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e' }
console.log(arrToObj([1, 2, 3, 4, 5], ['a', 'b', 'c', 'd'])); // { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': undefined }
console.log(arrToObj(['a', 'b', 'c'], [1, 2, 3, 4, 5])); // { a: 1, b: 2, c: 3 }
