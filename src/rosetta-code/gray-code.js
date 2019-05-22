// Gray code is a form of binary encoding where transitions between
// consecutive numbers differ by only one bit.
// Create a function to encode a number to and decode a number
// from Gray code. The function should will have 2 parameters.
// The first would be a boolean. The function should encode for true and
// decode for false. The second parameter would be the number to be encoded/decoded.

function gray(enc, number) {
  if (enc) return number ^ (number >> 1);

  let decodedNumber = number;

  while (number !== 1) {
    number = number >> 1;
    decodedNumber = decodedNumber ^ number;
  }

  return decodedNumber;
}

console.log(gray(true, 177)); // 233
console.log(gray(true, 425)); // 381
console.log(gray(false, 233)); // 177
console.log(gray(false, 381)); // 425
