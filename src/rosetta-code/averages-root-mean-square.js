// Compute the Root mean square of the numbers 1 through 10 inclusive.
// The root mean square is also known by its initials RMS (or rms), and as the quadratic mean.
// The RMS is calculated as the mean of the squares of the numbers, square-rooted:
// xrms = Math.sqrt((x1 * x1 + x2 * x2+ ⋯ + xn *xn) / n)

function rms (arr) {
  return Math.sqrt(arr.reduce((acc, item) => acc + Math.pow(item, 2), 0) / arr.length);
}

console.log(rms([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // 6.2048368229954285
