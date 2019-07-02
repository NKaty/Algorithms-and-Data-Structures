// An equilibrium index of a sequence is an index into the sequence such that
// the sum of elements at lower indices is equal to the sum of elements at higher indices.
// For example, in a sequence A: A0=−7 A1=1 A2=5 A3=2 A4=−4 A5=3 A6=0
// 3 is an equilibrium index, because: A0+A1+A2 = A4+A5+A6
// 6 is also an equilibrium index, because: A0+A1+A2+A3+A4+A5 = 0 (sum of zero elements is zero)
// 7 is not an equilibrium index, because it is not a valid index of sequence A.
// Write a function that, given a sequence, returns its equilibrium indices (if any).
// Assume that the sequence may be very long.

function equilibrium (a) {
  const result = [];
  let left = 0;
  let right = a.slice(1).reduce((acc, item) => acc + item, 0);

  for (let i = 0; i < a.length; i++) {
    if (left === right) result.push(i);

    left += a[i];
    right -= a[i + 1];
  }

  return result;
}

console.log(equilibrium([-7, 1, 5, 2, -4, 3, 0])); // [ 3, 6 ]
console.log(equilibrium([1, -1, 1, -1, 1, -1, 1])); // [ 0, 1, 2, 3, 4, 5, 6 ]
console.log(equilibrium([1])); // [ 0 ]
console.log(equilibrium([])); // []
