// Given an integer array arr, partition the array
// into (contiguous) sub arrays of length at most k.
// After partitioning, each subarray has their values
// changed to become the maximum value of that subarray.
// Return the largest sum of the given array after partitioning.
// Constraints: arr[i] >= 0

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function maxSumAfterPartitioningBF(arr, k) {
  function maxSum(index, maxNum, length) {
    if (index > arr.length - 1) {
      return 0;
    }
    maxNum = Math.max(maxNum, arr[index]);
    if (length === k) {
      return maxSum(index + 1, 0, 1) + maxNum * length;
    }
    return Math.max(
      maxSum(index + 1, maxNum, length + 1),
      maxSum(index + 1, 0, 1) + maxNum * length
    );
  }

  return maxSum(0, 0, 1);
}

console.log(maxSumAfterPartitioningBF([1, 15, 7, 9, 2, 5, 10], 3)); // 84
console.log(maxSumAfterPartitioningBF([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n * k)
function maxSumAfterPartitioningTD(arr, k) {
  const memo = {};

  function maxSum(index, maxNum, length) {
    if (index > arr.length - 1) {
      return 0;
    }
    const key = `${index}/${length}`;
    if (memo[key] !== undefined) {
      return memo[key];
    }
    maxNum = Math.max(maxNum, arr[index]);
    if (length === k) {
      memo[key] = maxSum(index + 1, 0, 1) + maxNum * length;
    } else {
      memo[key] = Math.max(
        maxSum(index + 1, maxNum, length + 1),
        maxSum(index + 1, 0, 1) + maxNum * length
      );
    }
    return memo[key];
  }

  return maxSum(0, 0, 1);
}

console.log(maxSumAfterPartitioningTD([1, 15, 7, 9, 2, 5, 10], 3)); // 84
console.log(maxSumAfterPartitioningTD([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83
console.log(maxSumAfterPartitioningTD([20779, 436849, 274670, 543359, 569973, 280711,
  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,
  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,
  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,
  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(n * k)
function maxSumAfterPartitioningBU(arr, k) {
  const table = Array.from({ length: arr.length + 1 }).fill(0);
  for (let i = 1; i <= arr.length; i++) {
    let maxNum = 0;
    for (let j = 1; j <= k; j++) {
      if (i >= j) {
        maxNum = Math.max(maxNum, arr[i - j]);
        table[i] = Math.max(table[i], table[i - j] + maxNum * j);
      }
    }
  }
  return table[arr.length];
}

console.log(maxSumAfterPartitioningBU([1, 15, 7, 9, 2, 5, 10], 3)); // 84
console.log(maxSumAfterPartitioningBU([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83
console.log(maxSumAfterPartitioningBU([20779, 436849, 274670, 543359, 569973, 280711,
  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,
  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,
  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,
  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649
