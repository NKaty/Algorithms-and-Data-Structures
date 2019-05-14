// Solve the Towers of Hanoi problem.
// Your solution should accept the number of discs as the first parameters, and
// three string used to identify each of the three stacks of discs, for example
// towerOfHanoi(4, 'A', 'B', 'C'). The function should return an
// array of arrays containing the list of moves, source -> destination.

function towerOfHanoi (n, a, b, c) {
  const result = [];

  function move(n, a, b, c) {
    if (n > 0) {
      move(n - 1, a, c, b);
      result.push([a, b]);
      move(n - 1, c, b, a);
    }
  }

  move(n, a, b, c);

  return result;
}

console.log(towerOfHanoi(3, 'A', 'B', 'C'));
// [ [ 'A', 'B' ], [ 'A', 'C' ], [ 'B', 'C' ], [ 'A', 'B' ], [ 'C', 'A' ], [ 'C', 'B' ], [ 'A', 'B' ] ]
