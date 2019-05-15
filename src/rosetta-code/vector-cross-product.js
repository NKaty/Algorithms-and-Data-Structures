// A vector is defined as having three dimensions as being represented
// by an ordered collection of three numbers:   (X, Y, Z).
// Write a function that takes two vectors (arrays) as input and computes their cross product.
// Your function should return null on invalid inputs (ie vectors of different lengths).

function crossProduct(vector1, vector2) {
  if (!vector1 ||
    !vector2 ||
    vector1.length !== vector2.length ||
    vector1.length !== 3) return null;

  return [(vector1[0] * vector2[1] - vector1[1] * vector2[0]),
    -(vector1[0] * vector2[2] - vector1[2] * vector2[0]),
    (vector1[1] * vector2[2] - vector1[2] * vector2[1])];
}

console.log(crossProduct([1, 2, 3], [4, 5, 6])); // [ -3, 6, -3 ]
console.log(crossProduct()); // null
console.log(crossProduct([1, 2, 3], [4, 5, 6, 4])); // null
