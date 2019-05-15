// A vector is defined as having three dimensions as being
// represented by an ordered collection of three numbers:   (X, Y, Z).
// Write a function that takes any numbers of vectors (arrays)
// as input and computes their dot product.
// Your function should return null on invalid inputs (ie vectors of different lengths).

function dotProduct(...vectors) {
  if (vectors.length < 2) return null;

  const len = vectors[0].length;

  if (!vectors.every(item => item.length === len)) return null;

  let product = 0;

  for (let i = 0; i < len; i++) {
    product += vectors.reduce((subProduct, item) => {
      subProduct *= item[i];
      return subProduct;
    }, 1);
  }

  return product;
}

console.log(dotProduct([1], [1])); // 1
console.log(dotProduct([1, 3, -5], [4, -2, -1])); // 3
console.log(dotProduct([3, 4, 5], [4, 3, 5], [-5, -12, -13])); // -529
console.log(dotProduct()); // null
console.log(dotProduct([1, 2], [1])); // null
