// The Ackermann function is a classic example of a recursive function,
// notable especially because it is not a primitive recursive function.
// It grows very quickly in value, as does the size of its call tree.
// Its arguments are never negative and it always terminates.
// Write a function which returns the value of A(m,n).

function ack (m, n) {
  if (m === 0) return n + 1;
  if (m > 0 && n === 0) return ack(m - 1, 1);
  if (m > 0 && n > 0) return ack(m - 1, ack(m, n - 1));
}

console.time('no cache');
console.log(ack(3, 10)); // 8189
console.timeEnd('no cache');

function memAck (m, n, cache = {}) {
  if (typeof cache[`${m}/${n}`] !== 'undefined') return cache[`${m}/${n}`];
  if (m === 0) cache[`${m}/${n}`] = n + 1;
  if (m > 0 && n === 0) cache[`${m}/${n}`] = memAck(m - 1, 1, cache);
  if (m > 0 && n > 0) cache[`${m}/${n}`] = memAck(m - 1, memAck(m, n - 1, cache), cache);

  return cache[`${m}/${n}`];
}

console.time('cache');
console.log(memAck(3, 10)); // 8189
console.timeEnd('cache');
