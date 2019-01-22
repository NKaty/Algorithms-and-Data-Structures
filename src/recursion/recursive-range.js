// recursiveRange
// Write a function called recursiveRange which accepts a number
// and adds up all the numbers from 0 to the number passed to the function.

function recursiveRange(num) {
  if (num <= 0) return 0;

  return num + recursiveRange(num - 1);
}

console.log(recursiveRange(6)); // 21
console.log(recursiveRange(10)); // 55
