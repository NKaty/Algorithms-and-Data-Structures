// Write a function to generate the nth Fibonacci number.

function * genFibSequence () {
  let next = 1;
  let prev = 0;

  while (true) {
    yield prev;
    [prev, next] = [next, prev + next];
  }
}

function fibonacci (n, isReturningSeq = false) {
  if (n <= 0) return isReturningSeq ? [0] : 0;

  const genFib = genFibSequence();
  const result = [];
  let count = 1;

  while (count <= n) {
    result.push(genFib.next().value);
    count++;
  }

  return isReturningSeq ? result : result[result.length - 1];
}

console.log(fibonacci(10, true)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]
console.log(fibonacci(73)); // 498454011879264
