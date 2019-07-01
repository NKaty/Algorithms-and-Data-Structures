// The Farey sequence Fn of order n is the sequence of completely reduced
// fractions between 0 and 1 which, when in lowest terms, have denominators
// less than or equal to n, arranged in order of increasing size.
// Each Farey sequence: starts with the value 0, denoted by the fraction 0/1
// and ends with the value 1, denoted by the fraction 1/1.
// Tasks: Write a function that returns the Farey sequence of order n.
// The function should have one parameter that is n. It should return the sequence as an array.
// Compute and show the Farey sequence for orders 1 through 11 (inclusive).
// Compute and display the number of fractions in the Farey sequence for order
// 100 through 1,000 (inclusive) by hundreds. Show the fractions as n/d
// (using the solidus [or slash] to separate the numerator from the denominator).

function gcd(a, b) {
  while (a && b) {
    a %= b;
    b = a ? b % a : b;
  }

  return a || b;
}

function farey (n) {
  const seq = [];

  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (gcd(i, j) === 1) seq.push({ s: `${i}/${j}`, n: i / j });
    }
  }

  return ['0/1', ...seq.sort((a, b) => a.n - b.n).map(item => item.s), '1/1'];
}

console.log(farey(5)); // [ '0/1','1/5','1/4','1/3','2/5','1/2','3/5','2/3','3/4','4/5','1/1' ]

function getSolutionsToTasks () {
  return {
    seq11: Array(11).fill().map((e, i) => farey(i + 1)),
    len: Array(1000 / 100).fill().map((e, i) => farey((i + 1) * 100).length)
  };
}

console.log(getSolutionsToTasks());
// { seq11:
//   [ [ '0/1', '1/1' ],
//     [ '0/1', '1/2', '1/1' ],
//     [ '0/1', '1/3', '1/2', '2/3', '1/1' ],
//     [ '0/1', '1/4', '1/3', '1/2', '2/3', '3/4', '1/1' ],
//     [ '0/1', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '1/1' ],
//     [ '0/1', '1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1' ],
//     [ '0/1', '1/7', '1/6', '1/5', '1/4', '2/7', '1/3', '2/5', '3/7', '1/2', '4/7', '3/5', '2/3', '5/7', '3/4', '4/5', '5/6', '6/7', '1/1' ],
//     [ '0/1', '1/8', '1/7', '1/6', '1/5', '1/4', '2/7', '1/3', '3/8', '2/5', '3/7', '1/2', '4/7', '3/5', '5/8', '2/3', '5/7', '3/4', '4/5', '5/6', '6/7', '7/8', '1/1' ],
//     [ '0/1', '1/9', '1/8', '1/7', '1/6', '1/5', '2/9', '1/4', '2/7', '1/3', '3/8', '2/5', '3/7', '4/9', '1/2', '5/9', '4/7', '3/5', '5/8', '2/3', '5/7', '3/4', '7/9', '4/5', '5/6', '6/7', '7/8', '8/9', '1/1' ],
//     [ '0/1', '1/10', '1/9', '1/8', '1/7', '1/6', '1/5', '2/9', '1/4', '2/7', '3/10', '1/3', '3/8', '2/5', '3/7', '4/9', '1/2', '5/9', '4/7', '3/5', '5/8', '2/3', '7/10', '5/7', '3/4', '7/9', '4/5', '5/6', '6/7', '7/8', '8/9', '9/10', '1/1' ],
//     [ '0/1', '1/11', '1/10', '1/9', '1/8', '1/7', '1/6', '2/11', '1/5', '2/9', '1/4', '3/11', '2/7', '3/10', '1/3', '4/11', '3/8', '2/5', '3/7', '4/9', '5/11', '1/2', '6/11', '5/9', '4/7', '3/5', '5/8', '7/11', '2/3', '7/10', '5/7', '8/11', '3/4', '7/9', '4/5', '9/11', '5/6', '6/7', '7/8', '8/9', '9/10', '10/11', '1/1' ] ],
//  len: [ 3045, 12233, 27399, 48679, 76117, 109501, 149019, 194751, 246327, 304193 ] }
