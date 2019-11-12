// Merge sort comparator

// Merge Sort function
// Implement the merge sort algorithm.
// Given an array, this algorithm will sort the values in the array.
// The function take 2 parameters: an array and an optional comparator function.
// The comparator function is a callback that will take two values from the array to be compared.
// The function returns a negative value if the first value is less than the second,
// a positive value if the first value is greater than the second,
// and 0 if both values are equal.
// The default comparator you provide should assume that the two parameters are numbers
// and that we are sorting the values from smallest to largest.

// Merge Helper function
// Given two sorted arrays, write a function called merge which accepts two SORTED arrays
// and returns a new array with both of the values from each array sorted.
// This function should run in O(n + m) time and O(n + m) space
// and should not modify the parameters passed to it.
// The function should default to sorting numbers in ascending order.
// If you pass in a comparator function as a third argument,
// this comparator is what will be used.
// (Note that the input arrays will always be sorted according to the comparator!)
// Also, do not use the built in .sort method! We're going to use this helper
// to implement a sort, so the helper itself shouldn't depend on a sort.

function mergeSort(arr, comparator) {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, comparator), mergeSort(right, comparator), comparator);
}

function merge(left, right, comparator) {
  if (typeof comparator !== 'function') {
    comparator = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }
  const resultArr = [];
  let leftCount = 0;
  let rightCount = 0;

  while (leftCount < left.length && rightCount < right.length) {
    if (comparator(left[leftCount], right[rightCount]) < 0) {
      resultArr.push(left[leftCount]);
      leftCount++;
    } else {
      resultArr.push(right[rightCount]);
      rightCount++;
    }
  }

  while (leftCount < left.length) {
    resultArr.push(left[leftCount]);
    leftCount++;
  }

  while (rightCount < right.length) {
    resultArr.push(right[rightCount]);
    rightCount++;
  }

  return resultArr;
}

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(mergeSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

console.log(mergeSort(['LilBub', 'Garfield', 'Blue', 'Grumpy'], (a, b) => {
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

console.log(mergeSort(moarKittyData, (a, b) => b.age - a.age)); // sorted by age in descending order
// [ { name: 'Heathcliff', age: 45 },
//   { name: 'Garfield', age: 40 },
//   { name: 'LilBub', age: 7 },
//   { name: 'Grumpy', age: 6 },
//   { name: 'Blue', age: 1 } ]
