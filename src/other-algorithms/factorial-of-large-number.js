function factorial(num) {
  if (num < 2) return 1;

  const result = num.toString().split('').reverse().map(Number);

  while (--num) {
    for (let carry = 0, i = 0; i < result.length || carry; i++) {
      const prod = (result[i] || 0) * num + carry;
      result[i] = prod % 10;
      carry = parseInt(prod / 10, 10);
    }
  }

  return result.reverse().join('');
}

console.log(factorial(10000));
