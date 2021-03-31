// Hero's formula for the area of a triangle given the length of its three sides
// a, b, and c is given by: A = Math.sqrt(s*(s−a)*(s−b)*(s−c)),
// where s is half the perimeter of the triangle; that is s = (a+b+c)/2.
// Heronian triangles are triangles whose sides and area are all integers.
// An example is the triangle with sides 3, 4, 5 whose area is 6 (and whose perimeter is 12).
// Note that any triangle whose sides are all an integer multiple of 3, 4, 5;
// such as 6, 8, 10, will also be a Heronian triangle.
// Define a Primitive Heronian triangle as a Heronian triangle where the greatest common divisor
// of all three sides is 1 (unity). This will exclude, for example, triangle 6, 8, 10.
// Task:
// Create a named function/method/procedure/... that implements Hero's formula.
// Use the function to generate all the primitive Heronian triangles with sides <= 200.
// Show the count of how many triangles are found.
// Order the triangles by first increasing area, then by increasing perimeter,
// then by increasing maximum side lengths.
// Show the first ten ordered triangles in a table of sides, perimeter, and area.
// Show a similar ordered table for those triangles with area = 210.

function heronianTriangle(triangle) {
  const perimeter = triangle.reduce((acc, item) => acc + item, 0);
  const a = triangle.reduce((acc, item) =>
    acc * (perimeter / 2 - item), perimeter / 2);

  return a <= 0
    ? null
    : Math.sqrt(a) % 1 === 0
      ? {
          area: Math.sqrt(a),
          perimeter,
          triangle
        }
      : null;
}

function gcd(a, b) {
  while (a && b) {
    a %= b;
    b = a ? b % a : b;
  }

  return a || b;
}

function generateHeronianTriangles(num) {
  const result = [];

  for (let a = 1; a <= num; a++) {
    for (let b = 1; b <= a; b++) {
      for (let c = 1; c <= b; c++) {
        const triangle = heronianTriangle([c, b, a]);
        if (triangle && gcd(gcd(a, b), c) === 1) {
          result.push(triangle);
        }
      }
    }
  }

  return result;
}

function sortByAreaPerimeterMaxSide(a, b) {
  if (a.area > b.area) return 1;
  if (a.area < b.area) return -1;
  if (a.perimeter > b.perimeter) return 1;
  if (a.perimeter < b.perimeter) return -1;

  return a.triangle.reduce((acc, item) =>
    item > acc ? item : acc, 0) - b.triangle.reduce((acc, item) =>
    item > acc ? item : acc, 0);
}

function getSolutionsToTasks(num) {
  const triangles = generateHeronianTriangles(num);

  return {
    trianglesCount: triangles.length,
    tenSortedTriangles: [...triangles].sort(sortByAreaPerimeterMaxSide).slice(0, 10),
    area210: triangles.filter(item => item.area === 210).sort(sortByAreaPerimeterMaxSide)
  };
}

console.log(getSolutionsToTasks(200));
// { trianglesCount: 517,
//   tenSortedTriangles:
//     [ { area: 6, perimeter: 12, triangle: [ 3, 4, 5 ] },
//       { area: 12, perimeter: 16, triangle: [ 5, 5, 6 ] },
//       { area: 12, perimeter: 18, triangle: [ 5, 5, 8 ] },
//       { area: 24, perimeter: 32, triangle: [ 4, 13, 15 ] },
//       { area: 30, perimeter: 30, triangle: [ 5, 12, 13 ] },
//       { area: 36, perimeter: 36, triangle: [ 9, 10, 17 ] },
//       { area: 36, perimeter: 54, triangle: [ 3, 25, 26 ] },
//       { area: 42, perimeter: 42, triangle: [ 7, 15, 20 ] },
//       { area: 60, perimeter: 36, triangle: [ 10, 13, 13 ] },
//       { area: 60, perimeter: 40, triangle: [ 8, 15, 17 ] } ],
//   area210:
//     [ { area: 210, perimeter: 70, triangle: [ 17, 25, 28 ] },
//       { area: 210, perimeter: 70, triangle: [ 20, 21, 29 ] },
//       { area: 210, perimeter: 84, triangle: [ 12, 35, 37 ] },
//       { area: 210, perimeter: 84, triangle: [ 17, 28, 39 ] },
//       { area: 210, perimeter: 140, triangle: [ 7, 65, 68 ] },
//       { area: 210, perimeter: 300, triangle: [ 3, 148, 149 ] } ] }
