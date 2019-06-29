// An emirp (prime spelled backwards) are primes that when reversed
// (in their decimal representation) are a different prime.
// Write a function that should be able to : Show the first n eprimes numbers.
// Show the eprimes numbers in a range. Show the number of eprimes in a range.
// Show the nth eprimes number. The function should have two parameters.
// The first will receive n or the range as an array.
// The second will receive a boolean, that specifies if the function returns the eprimes
// as an array or a single number (the number of primes in the range or the nth prime).
// According to the parameters the function should return an array or a number.

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

function emirps(n, isReturningSeq) {
  const seq = [];
  const isArray = n instanceof Array;
  const start = isArray ? n[0] : 13;
  const end = isArray ? n[1] : n;
  let reversedNumber;

  for (let i = start; ; i++) {
    if (isPrime(i)) {
      reversedNumber = parseInt(`${i}`.split('').reverse().join(''), 10);

      if (i !== reversedNumber && isPrime(reversedNumber)) seq.push(i);
    }

    if ((isArray && i > end) || (!isArray && seq.length >= end)) break;
  }

  return isReturningSeq === undefined ? seq[seq.length - 1] : isReturningSeq ? seq : seq.length;
}

console.log(emirps(20, true)); // [ 13, 17, 31, 37, 71, 73, 79, 97, 107, 113, 149, 157, 167, 179, 199, 311, 337, 347, 359, 389 ]
console.log(emirps(10000)); // 948349
console.log(emirps([7700, 8000], true)); // [ 7717, 7757, 7817, 7841, 7867, 7879, 7901, 7927, 7949, 7951, 7963 ]
console.log(emirps([7700, 8000], false)); // 11
