// Write a function that returns the greatest common divisor of two integers.

function gcd(a, b) {
  while (a && b) {
    a %= b;
    b = a ? b % a : b;
  }

  return Math.abs(a || b);
}
console.log(gcd(-1300, 250)); // 50
console.log(gcd(111, 13)); // 1
console.log(gcd(1000, 25)); // 25
console.log(gcd(111, 15)); // 3
