// The Hailstone sequence of numbers can be generated from a starting positive integer, n by:
// If n is 1 then the sequence ends. If n is even then the next n of the sequence = n/2
// If n is odd then the next n of the sequence = (3 * n) + 1
// Task: Create a routine to generate the hailstone sequence for a number.
// Use the routine to show that the hailstone sequence for the number 27 has 112
// elements starting with 27, 82, 41, 124 and ending with 8, 4, 2, 1
// Show the number less than 100,000 which has the longest hailstone sequence
// together with that sequence's length. (But don't show the actual sequence!)

function hailstoneSequence (num) {
  const result = [num];

  while (num > 1) {
    num = num % 2 === 0 ? num / 2 : (3 * num) + 1;
    result.push(num);
  }

  return result;
}

function getSolutionsToTasks () {
  return [hailstoneSequence(27).filter((item, index, arr) => index < 4 || index > arr.length - 5),
    Array(100000).fill().map((e, i) => hailstoneSequence(i + 1).length).reduce((acc, item, index) =>
      item > acc[0] ? [item, index + 1] : acc, [0])];
}

console.log(getSolutionsToTasks()); // [ [ 27, 82, 41, 124, 8, 4, 2, 1 ], [ 351, 77031 ] ]
