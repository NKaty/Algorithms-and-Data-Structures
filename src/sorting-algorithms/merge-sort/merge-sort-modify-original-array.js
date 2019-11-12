function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const center = Math.floor((start + end) / 2);
    mergeSort(arr, start, center);
    mergeSort(arr, center + 1, end);
    merge(arr, start, center, end);
  }
}

function merge(arr, start, center, end) {
  const left = arr.slice(start, center + 1);
  const right = arr.slice(center + 1, end + 1);
  let leftCount = 0;
  let rightCount = 0;
  let resultCount = start;

  while (leftCount < left.length && rightCount < right.length) {
    if (left[leftCount] < right[rightCount]) {
      arr[resultCount] = left[leftCount];
      leftCount++;
    } else {
      arr[resultCount] = right[rightCount];
      rightCount++;
    }

    resultCount++;
  }

  while (leftCount < left.length) {
    arr[resultCount] = left[leftCount];
    leftCount++;
    resultCount++;
  }

  while (rightCount < right.length) {
    arr[resultCount] = right[rightCount];
    rightCount++;
    resultCount++;
  }
}

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
mergeSort(nums);
console.log(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
