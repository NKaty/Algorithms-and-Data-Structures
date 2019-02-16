// Quick Sort comparator

// Quick Sort function
// Implement the quick sort algorithm.
// Given an array, this algorithm will sort the values in the array.
// The comparator function is a callback that will take two values from the array to be compared.
// The function returns a negative value if the first value is less than the second,
// a positive value if the first value is greater than the second,
// and 0 if both values are equal.
// The default comparator you provide should assume that the two parameters are numbers
// and that we are sorting the values from smallest to largest.

// Pivot Helper function
// In this exercise, your goal is to implement a function called pivot.
// This function contains nearly all of the logic you'll need in order to implement Quick Sort.
// The pivot  function is responsible for taking an array, setting the pivot value,
// and mutating the array so that all values less than the pivot wind up to the left of it,
// and all values greater than the pivot wind up to the right of it.
// It's also helpful if this helper returns the index of where the pivot value winds up.
// Hint: When we get to Quick Sort function, it will be helpful for the pivot helper
// to accept not only an array and an optional comparator,
// but also an optional start and end index.
// These should default to 0 and the array length minus 1, respectively.

function pivot(arr, comparator, start = 0, end = arr.length - 1) {
  if (typeof comparator !== 'function') {
    comparator = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  let pivotIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (comparator(arr[start], arr[i]) > 0) {
      pivotIndex++;
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
    }
  }

  if (pivotIndex !== start) [arr[pivotIndex], arr[start]] = [arr[start], arr[pivotIndex]];

  return pivotIndex;
}

function quickSort(arr, comparator, start = 0, end = arr.length - 1) {
  if (start < end) {
    const pivotIndex = pivot(arr, comparator, start, end);

    quickSort(arr, comparator, start, pivotIndex - 1);
    quickSort(arr, comparator, pivotIndex + 1, end);
  }

  return arr;
}

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(quickSort([])); // []

console.log(quickSort(['LilBub', 'Garfield', 'Blue', 'Grumpy'], (a, b) => {
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

console.log(quickSort(moarKittyData, (a, b) => b.age - a.age)); // sorted by age in descending order
// [ { name: 'Heathcliff', age: 45 },
//   { name: 'Garfield', age: 40 },
//   { name: 'LilBub', age: 7 },
//   { name: 'Grumpy', age: 6 },
//   { name: 'Blue', age: 1 } ]
