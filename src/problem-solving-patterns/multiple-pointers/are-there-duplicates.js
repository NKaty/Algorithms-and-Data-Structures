// Multiple Pointers - areThereDuplicates
// Implement a function called, areThereDuplicates which accepts a variable number of arguments,
// and checks whether there are any duplicates among the arguments passed in.

// Restrictions:
// Time Complexity - O(n log n)
// Space Complexity - O(1)

// Solution with two pointers (two variables)

function areThereDuplicatesWithTwoPointers(...args) {
  if (!args.length) return false;

  args.sort();

  for (let i = 0, j = 1; j < args.length; i++, j++) {
    if (args[i] === args[j]) return true;
  }

  return false;
}

console.log(areThereDuplicatesWithTwoPointers(1, 2, 3)); // false
console.log(areThereDuplicatesWithTwoPointers('a', 'b', 'c', 'a')); // true

// Solution with one pointer (one variable)

function areThereDuplicatesWithOnePointer(...args) {
  if (!args.length) return false;

  args.sort();

  for (let i = 0; i < args.length - 1; i++) {
    if (args[i] === args[i + 1]) return true;
  }

  return false;
}

console.log(areThereDuplicatesWithOnePointer(1, 2, 3)); // false
console.log(areThereDuplicatesWithOnePointer('a', 'b', 'c', 'a')); // true
