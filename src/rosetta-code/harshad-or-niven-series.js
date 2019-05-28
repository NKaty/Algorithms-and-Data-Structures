// The Harshad or Niven numbers are positive integers ≥ 1 that are
// divisible by the sum of their digits. For example, 42 is a Harshad number
// as 42 is divisible by (4 + 2) without remainder.
// Assume that the series is defined as the numbers in increasing order.
// Implement a function to generate successive members of the Harshad sequence.
// Use it to list the first twenty members of the sequence and
// list the first Harshad number greater than 1000.

function findSequence (n, start) {
  const result = [];
  let count = start;

  while (result.length < n) {
    const digitsSum = `${count}`.split('').reduce((acc, item) => acc + parseInt(item), 0);

    if (count % digitsSum === 0) result.push(count);

    count++;
  }

  return result;
}

function isHarshadOrNiven () {
  return {
    firstTwenty: findSequence(20, 1),
    firstOver1000: findSequence(1, 1001)[0]
  };
}

console.log(isHarshadOrNiven());
// { firstTwenty: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 20, 21, 24, 27, 30, 36, 40, 42 ], firstOver1000: 1002 }
