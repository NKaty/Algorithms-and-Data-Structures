// Write a function to generate Fibonacci n-step number sequences and
// Lucas sequences. The first parameter will be n. The second parameter
// will be the number of elements to be returned. The third parameter
// will specify whether to output the Fibonacci sequence or the Lucas sequence.
// If the parameter is "f" then return the Fibonacci sequence and if it is "l",
// then return the Lucas sequence. The sequences must be returned as an array.
// The Lucas series uses [2,1] as its initial values.

function fibLuc (n, len, w) {
  const seq = w === 'f' ? [1, 1] : [2, 1];
  let sum = seq[0];

  for (let i = 1; i < n; i++) {
    sum += seq[i];
    seq.push(sum);
  }

  for (let i = n; i < len - 1; i++) {
    sum = sum + seq[i] - seq[i - n];
    seq.push(sum);
  }

  return seq;
}

console.log(fibLuc(4, 15, 'f')); // [ 1, 1, 2, 4, 8, 15, 29, 56, 108, 208, 401, 773, 1490, 2872, 5536 ]
console.log(fibLuc(3, 15, 'l')); // [ 2, 1, 3, 6, 10, 19, 35, 64, 118, 217, 399, 734, 1350, 2483, 4567 ]
