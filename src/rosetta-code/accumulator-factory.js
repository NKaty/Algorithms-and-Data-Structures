// Create a function that takes a single (numeric) argument and
// returns another function that is an accumulator.
// The returned accumulator function in turn also takes a single numeric argument,
// and returns the sum of all the numeric values passed in so far to that accumulator
// (including the initial value passed when the accumulator was created).

const accumulator = sum => num => {
  sum += num;
  return sum;
};

const innerAccumulator = accumulator(3);
console.log(innerAccumulator(-4)); // -1
console.log(innerAccumulator(1.5)); // 0.5
console.log(innerAccumulator(5)); // 5.5
