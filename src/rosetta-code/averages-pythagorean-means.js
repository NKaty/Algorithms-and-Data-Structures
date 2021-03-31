// Compute all three of the Pythagorean means of the set of integers 1 through 10 (inclusive).
// Show that A(x1,…,xn)≥G(x1,…,xn)≥H(x1,…,xn) for this set of positive integers.
// The most common of the three means, the arithmetic mean, is the sum of the list
// divided by its length: A(x1,…,xn) = (x1 + ⋯ + xn)/n. The geometric mean is the nth root
// of the product of the list: G(x1,…,xn) = Math.pow(x1 * ⋯ * xn, 1/n). The harmonic mean is
// n divided by the sum of the reciprocal of each item in the list: H(x1,…,xn)=n/(1/x1 + ⋯ + 1/xn)
// Assume the input is an ordered array of all inclusive numbers.
// For the answer, please output an object in the following format:
// { values: { arithmetic: 5.5, geometric: 4.528728688116765, harmonic: 3.414171521474055 },
//  test: 'is A >= G >= H ? yes' }

function pythagoreanMeans(rangeArr) {
  const arithmetic = rangeArr.reduce((acc, item) => acc + item, 0) / rangeArr.length;
  const geometric = Math.pow(rangeArr.reduce((acc, item) => acc * item, 1), 1 / rangeArr.length);
  const harmonic = rangeArr.length / rangeArr.reduce((acc, item) => acc + 1 / item, 0);

  return {
    values: {
      arithmetic,
      geometric,
      harmonic
    },
    test: arithmetic >= geometric && geometric >= harmonic
      ? 'is A >= G >= H ? yes'
      : 'is A >= G >= H ? no'
  };
}

console.log(pythagoreanMeans([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// { values:
//   { arithmetic: 5.5,
//     geometric: 4.528728688116765,
//     harmonic: 3.414171521474055 },
//  test: 'is A >= G >= H ? yes' }
