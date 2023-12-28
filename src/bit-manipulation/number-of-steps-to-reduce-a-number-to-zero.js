// Given a non-negative integer num, return the number of steps
// to reduce it to zero. If the current number is even,
// you have to divide it by 2, otherwise, you have to subtract 1 from it.

// Constraints:
// 0 <= num <= 10 ^ 6

const numberOfSteps = (num) => {
  let count = 0;

  while (num) {
    // If the number is odd, subtract 1 from it
    if (num & 1) num -= 1;
    // If the number is even, divide it by 2
    // The right shift by one is equivalent to dividing by 2
    else num >>= 1;
    count++;
  }

  return count;
};

console.log(numberOfSteps(123)); // 12
console.log(numberOfSteps(1000000)); // 26

// Reduces the number of iterations
const numberOfStepsImproved = (num) => {
  if (!num) return num;

  let count = 0;
  while (num) {
    // We reduce the number of iterations by combine two operation together
    // If the number is odd, we need to subtract 1: + (num & 1) --> + 0 or 1
    // Now the number is even, and we need to perform the right shift: + 1
    count += (num & 1) + 1;
    // And now we go to the next bit
    num >>= 1;
  }

  // The last bit will always be 1, so the last right shift we perform
  // is unnecessary. We can just subtract the number by 1 to reduce it to zero
  // To fix our count we subtract 1
  return count - 1;
};

console.log(numberOfStepsImproved(123)); // 12
console.log(numberOfStepsImproved(1000000)); // 26
