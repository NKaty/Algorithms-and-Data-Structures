// Charles Babbage, looking ahead to the sorts of problems his
// Analytical Engine would be able to solve, gave this example:
// What is the smallest positive integer whose square ends in the digits 269,696?
// He thought the answer might be 99,736, whose square is 9,947,269,696; but he couldn't be certain.
// The task is to find out if Babbage had the right answer.
// Implement a function to return the lowest integer that satisfies the Babbage problem.

function babbage() {
  const endDigits = 269696;
  let num = Math.ceil(Math.sqrt(endDigits));

  while (num * num % 1000000 !== endDigits) {
    num += 2;
  }

  return num;
}

console.log(babbage()); // 25264
