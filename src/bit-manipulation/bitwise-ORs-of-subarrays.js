// We have an array arr of non-negative integers.
// For every (contiguous) subarray sub = [arr[i], arr[i + 1], ..., arr[j]]
// (with i <= j), we take the bitwise OR of all the elements in sub,
// obtaining a result arr[i] | arr[i + 1] | ... | arr[j].
// Return the number of possible results. Results that occur
// more than once are only counted once in the final answer

// Constraints:
// 1 <= nums.length <= 5 * 10 ^ 4
// 0 <= nums[i] <= 10 ^ 9

// The idea is: if we know the bitwise OR of the elements from i to i + 3
// than we can find the bitwise OR of the elements from i to i + 4:
// OR of arr[i, i + 3] | arr[i + 4]
// So we can keep an in-between state while iterating over the array
// For example [1, 1, 2]:
// We take 1 --> add it to result set --> {1}
//           --> add it to temp set --> {1}
//           --> iterate over current set, that is empty
//           --> set current set to temp set --> {1}
// now: result set == {1}, current set == {1}
// We take 1 --> add it to result set --> {1, 1} --> {1}
//           --> add it to temp set --> {1}
//           --> iterate over current set --> 1 | 1
//           --> add 1 | 1 to temp set --> {1, 1} --> {1}
//           --> add 1 | 1 to result set --> {1, 1} --> {1}
//           --> set current set to temp set --> {1}
// now: result set == {1}, current set == {1}
// We take 2 --> add it to result set --> {1, 2}
//           --> add it to temp set --> {2}
//           --> iterate over current set --> 1 | 2
//           --> add 1 | 2 to temp set --> {2, 3}
//           --> add 1 | 2 to result set --> {1, 2, 3}
//           --> set current set to temp set --> {2, 3}
// now: result set == {1, 2, 3}, current set == {2, 3}
// Number of the possible results == length of result set == 3
// Complexity time - 30 * arr.length
// Because of constraint 0 <= nums[i] <= 10 ^ 9
// max length of current set, when all the bits == 1 will be 30
// max integer in current set - 111111111111111111111111111111
const subarrayBitwiseORs = (arr) => {
  // Here we keep the bitwise OR of all the subarrays
  const subarrayORs = new Set();
  // Here we keep the state of the bitwise OR of the subarrays
  // after each iteration
  let current = new Set();

  // We iterate over every number in the array
  for (const num of arr) {
    // The number is also a subarray, and it's OR equals to the number itself
    // So we add it to the result
    subarrayORs.add(num);
    // We start a temp set so that we can iterate over the current ORs
    // and perform the next ORs operations with current number
    // And again current number is a subarray with the OR equals to the number itself
    const temp = new Set([num]);

    // We iterate over each bitwise OR in current state
    for (const item of current) {
      // We perform an OR operation with current number
      const or = num | item;
      // We add the result to our collections
      temp.add(or);
      subarrayORs.add(or);
    }

    current = temp;
  }

  return subarrayORs.size;
};

console.log(subarrayBitwiseORs([1, 1, 2])); // 3
console.log(subarrayBitwiseORs([1, 21, 4, 19, 65, 123, 75, 38, 90])); // 15
