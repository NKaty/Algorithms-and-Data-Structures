// Bubble Sort Comparator

// Implement a function called bubbleSort.
// Given an array, bubbleSort will sort the values in the array.
// The function takes 2 parameters: an array and an optional comparator function.
// The comparator function is a callback that will take two values from the array to be compared.
// The function returns a negative value if the first value is less than the second,
// a positive value if the first value is greater than the second,
// and 0 if both values are equal.

// The default comparator you provide should assume that the two parameters are
// numbers and that we are sorting the values from smallest to largest.

function bubbleSort(arr, comparator) {
  if (typeof comparator !== 'function') {
    comparator = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  let swap;

  for (let i = 0; i < arr.length; i++) {
    swap = false;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (comparator(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swap = true;
      }
    }

    if (!swap) break;
  }

  return arr;
}

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(bubbleSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

console.log(bubbleSort(['LilBub', 'Garfield', 'Blue', 'Grumpy'], (a, b) => {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
})); // [ 'Garfield', 'LilBub', 'Blue', 'Grumpy' ]

const moarKittyData = [{
  name: 'LilBub',
  age: 7
}, {
  name: 'Garfield',
  age: 40
}, {
  name: 'Heathcliff',
  age: 45
}, {
  name: 'Blue',
  age: 1
}, {
  name: 'Grumpy',
  age: 6
}];

console.log(bubbleSort(moarKittyData, (a, b) => b.age - a.age)); // sorted by age in descending order
// [ { name: 'Heathcliff', age: 45 },
//   { name: 'Garfield', age: 40 },
//   { name: 'LilBub', age: 7 },
//   { name: 'Grumpy', age: 6 },
//   { name: 'Blue', age: 1 } ]
