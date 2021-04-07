// Given a positive integer n, you can apply one of the following operations:
// 1. If n is even, replace n with n / 2.
// 2. If n is odd, replace n with either n + 1 or n - 1.
// Return the minimum number of operations needed for n to become 1.

// Constraints:
// 1 <= n <= 2 ^ 31 - 1

const integerReplacement = function(n) {
  let count = 0;

  while (n !== 1) {
    // If the number is even, divide it by 2
    // The right shift by one is equivalent to dividing by 2
    // We perform an unsigned right shift (>>>), because of the possibility
    // that we can get as an argument n == 2 ** 31 - 1 (2147483647)
    // This number is the maximum positive value for a 32-bit signed binary integer
    // So we can exceed it on our first iteration and get a negative number
    // as a result by a right shift (>>) on our second iteration
    // Suppose n == 2147483647 == 01111111111111111111111111111111
    // It is an odd number, we can add 1 (according to the task condition)
    // to make it even, and we will get 10000000000000000000000000000000
    // (2147483648) as a result, then we will right shift it by 1
    // and get a negative number -1073741824 (11000000000000000000000000000000)
    // So we will get an infinite loop, because we will never reach n == 1
    // With an unsigned right shift we will get 01000000000000000000000000000000
    // instead of a negative number and reach n == 1
    // Pay attention to the most significant bit - now it is 0
    // (more about an unsigned right shift - convert-a-number-to-hexadecimal.js)
    if (!(n & 1)) n >>>= 1;
    // If the number is odd, we have two possibilities: we can add 1 or subtract 1
    // To decide when we have to add and when to subtract, we must understand, that
    // the main operation here is dividing by 2
    // For example, it takes only three operations (dividing) to reduce 1000 (8) to 1
    // But if additional bits are set in the number (1001 - 9), it adds
    // additional operations for adding or subtracting 1
    // So the less set bits the number has the less operations we need to perform
    // And so we have to choose the operation (add or subtract), that gives us more bits
    // set to 0. We need to consider two cases:
    // 1. we have a number, that ends with 01
    // 2. we have a number, that ends with 11
    // In the first case, it is obvious that we will get more zeros by subtracting
    // In the second case, it is not so obvious what we should do
    // If we look at 11 (3), we see that subtracting 1 takes less operation than adding
    // 11 - 1 --> 10 >> 1 - 2 operations
    // 11 + 1 --> 100 >> 1 --> 10 >> 1 - 3 operations
    // But if we take a larger number, 1111 (15) for example, we will see, that adding is better:
    // 1111 - 1 --> 1110 >> 1 --> 111 - 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 6 operations
    // 1111 + 1 --> 10000 >> 1 --> 1000 >> 1 --> 100 >> 1 --> 10 >> 1 - 5 operations
    // In fact, 11 (3) is an exception to the rule
    // There may be cases when the type of the operation doesn't matter, for example 1011 (11):
    // It doesn't matter if we subtract 1 from 1011 (11) or add 1
    // 1011 - 1 --> 1010 >> 1 --> 101 - 1 --> 100 >> 1 --> 10 >> 1 - 5 operations
    // 1011 + 1 --> 1100 >> 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 5 operations
    // But the general rule is: we subtract 1 if a number equals 3 or ends with 01,
    // and we add 1 in any other cases (actually if a number ends with 11)
    // the condition can also be written as (n === 3 || !(n >> 1 & 1))
    else if (n === 3 || (n & 3) === 1) n--;
    else n++;
    count++;
  }

  return count;
};

console.log(integerReplacement(15)); // 5
console.log(integerReplacement(11)); // 5
console.log(integerReplacement(2147483647)); // 32
