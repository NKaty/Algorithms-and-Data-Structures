// Given a sequence of integers, find a continuous subsequence
// which maximizes the sum of its elements, that is, the elements
// of no other single subsequence add up to a value larger than this one.
// An empty subsequence is considered to have the sum of 0;
// thus if all elements are negative, the result must be the empty sequence.

function maximumSubsequence (population) {
  let result = [];
  let max = 0;
  let subsequence;
  let subSum;

  for (let i = 0; i < population.length; i++) {
    subsequence = [];
    subSum = 0;
    for (let j = i; j < population.length; j++) {
      subSum += population[j];
      subsequence.push(population[j]);

      if (subSum > max) {
        max = subSum;
        result = [...subsequence];
      }
    }
  }

  return result;
}

console.log(maximumSubsequence([-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1])); // [ 3, 5, 6, -2, -1, 4 ]
console.log(maximumSubsequence([1, 2, 3, 4, 5, -8, -9, -20, 40, 25, -5])); // [ 40, 25 ]
console.log(maximumSubsequence([])); // []
console.log(maximumSubsequence([-1, -2, -3, -5, -6, -2, -1, -4, -4, -2, -1])); // []
