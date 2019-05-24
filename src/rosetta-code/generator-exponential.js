// Write a function that uses generators to generate squares and cubes.
// Create a new generator that filters all cubes from the generator of squares.
// The function should return the nth value of the filtered generator.
// For example for n=7, the function should return 81 as the sequence
// would be 4,9,16,25,36,49,81. Here 64 is filtered out, as it is a cube.

function * genSequence (power) {
  let count = 1;
  while (++count) {
    yield Math.pow(count, power);
  }
}

function exponentialGenerator (n) {
  const result = [];
  const genSquares = genSequence(2);
  const genCubes = genSequence(3);
  let square;
  let cube = genCubes.next().value;

  while (result.length !== n) {
    square = genSquares.next().value;
    if (cube < square) cube = genCubes.next().value;
    if (cube !== square) result.push(square);
  }

  return result[result.length - 1];
}

console.log(exponentialGenerator(10)); // 144
console.log(exponentialGenerator(25)); // 784
