// Given non-negative integers m and n, generate all size m
// combinations of the integers from 0 (zero) to n-1 in sorted
// order (each combination is sorted and the entire table is sorted).

function combinations (m, n) {
  const array = Array.from({ length: n }, (e, i) => i);
  const combinations = [];

  function getCombinations(index, arr) {
    if (arr.length === m) return combinations.push([...arr]);

    for (let j = index + 1; j < array.length; j++) {
      getCombinations(j, [...arr, array[j]]);
    }
  }

  for (let i = 0; i <= n - m; i++) {
    getCombinations(i, [array[i]]);
  }

  return combinations;
}

console.log(combinations(3, 5));
// [ [ 0, 1, 2 ], [ 0, 1, 3 ], [ 0, 1, 4 ], [ 0, 2, 3 ], [ 0, 2, 4 ], [ 0, 3, 4 ], [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]
