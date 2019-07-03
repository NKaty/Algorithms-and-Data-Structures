// Ethiopian multiplication is a method of multiplying integers using only
// addition, doubling, and halving. Method:
// Take two numbers to be multiplied and write them down at the top of two columns.
// In the left-hand column repeatedly halve the last number, discarding any remainders,
// and write the result below the last in the same column, until you write a value of 1.
// In the right-hand column repeatedly double the last number and write the result below.
// Stop when you add a result in the same row as where the left hand column shows 1.
// Examine the table produced and discard any row where the value in the left column is even.
// Sum the values in the right-hand column that remain to produce the result
// of multiplying the original two numbers together.
// Task: The task is to define three named functions/methods/procedures/subroutines:
// one to halve an integer, one to double an integer, and one to state if an integer is even.
// Use these functions to create a function that does Ethiopian multiplication.

function halve (num) {
  return Math.floor(num / 2);
}

function double (num) {
  return num * 2;
}

function isEven (num) {
  return num % 2 === 0;
}

function ethMult (a, b) {
  const column = [{ a, b }];

  while (a !== 1) {
    a = halve(a);
    b = double(b);
    column.push({ a, b });
  }

  return column.filter(item => !isEven(item.a)).reduce((acc, item) => acc + item.b, 0);
}

console.log(ethMult(23, 46)); // 1058
console.log(ethMult(56, 98)); // 5488
