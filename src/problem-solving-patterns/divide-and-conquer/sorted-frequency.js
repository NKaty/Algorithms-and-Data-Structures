// Divide and Conquer - sortedFrequency
// Given a sorted array and a number, write a function
// called sortedFrequency that counts the occurrences of the number in the array

// Time Complexity - O(log n)

function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] === num) {
      let leftCount = middle;
      let rightCount = middle;

      while (arr[leftCount] === num && leftCount >= 0) {
        leftCount--;
      }

      while (arr[rightCount] === num && rightCount < arr.length) {
        rightCount++;
      }

      return rightCount - leftCount - 1;
    }

    if (arr[middle] < num) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}

console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1
console.log(sortedFrequency([], 4)); // -1
