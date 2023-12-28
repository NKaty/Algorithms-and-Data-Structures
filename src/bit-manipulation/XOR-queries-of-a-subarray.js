// Given the array arr of positive integers and the array queries where
// queries[i] = [Li, Ri], for each query i compute the XOR of elements
// from Li to Ri (that is, arr[Li] xor arr[Li+1] xor ... xor arr[Ri] ).
// Return an array containing the result for the given queries.

// Constraints:
// 1 <= arr.length <= 3 * 10 ^ 4
// 1 <= arr[i] <= 10 ^ 9
// 1 <= queries.length <= 3 * 10 ^ 4
// queries[i].length == 2
// 0 <= queries[i][0] <= queries[i][1] < arr.length

// The idea is to reduce time complexity from O(N * Q) to O(N + Q)
// by calculating XOR prefix for every number in the array
const xorQueries = (arr, queries) => {
  const xorPrefixes = { '-1': 0 };
  const queriesResults = [];

  // We iterate over every number in the array
  for (let i = 0; i < arr.length; i++) {
    // We accumulate the result of the XOR operations
    // for numbers (adding number by number)
    xorPrefixes[i] = xorPrefixes[i - 1] ^ arr[i];
  }

  // Now we can compute the XOR of elements in the range
  // by xoring two prefixes from xorPrefixes that correspond to
  // the element preceding the leftmost element
  // and the rightmost element of the subarray
  // We use the fact that n ^ n will be 0
  // For example arr == [1, 3, 4, 8] and we want to find the XOR of range [2, 3]:
  // xorPrefixes of range [0, 3] ^ xorPrefixes of range [0, 1] ==
  // 1 ^ 3 ^ 4 ^ 8 ^ 1 ^ 3 == 4 ^ 8
  // Full example: arr == [1, 3, 4, 8], queries == [[0, 1], [1, 2], [0, 3], [3, 3]]
  // start --> xorPrefixes == {'-1': 0}
  // xorPrefixes[-1] ^ arr[0] == 0 ^ 1 == 1 --> {'-1': 0, '0': 1}
  // xorPrefixes[0] ^ arr[1] == 1 ^ 3 == 2 --> {'-1': 0, '0': 1, '1': 2}
  // xorPrefixes[1] ^ arr[2] == 2 ^ 4 == 6 --> {'-1': 0, '0': 1, '1': 2, '2': 6}
  // xorPrefixes[2] ^ arr[3] == 6 ^ 8 == 14 --> {'-1': 0, '0': 1, '1': 2, '2': 6, '3': 14}
  // Queries:
  // [0, 1] --> xorPrefixes[0 - 1] ^ xorPrefixes[1] == 0 ^ 2 == 2
  // [1, 2] --> xorPrefixes[1 - 1] ^ xorPrefixes[2] == 1 ^ 6 == 7
  // [0, 3] --> xorPrefixes[0 - 1] ^ xorPrefixes[3] == 0 ^ 14 == 14
  // [3, 3] --> xorPrefixes[3 - 1] ^ xorPrefixes[3] == 6 ^ 14 == 8
  // the result == [2, 7, 14, 8]
  for (const query of queries) {
    queriesResults.push(xorPrefixes[query[0] - 1] ^ xorPrefixes[query[1]]);
  }

  return queriesResults;
};

console.log(xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]
console.log(xorQueries([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];

// Segment Tree
// Time Complexity to build a segment tree O(N)
// Time Complexity for every query O(log N)
// Total Time Complexity O(N + Q * log N)
// We build a segment tree of an array such that array elements are
// leaves and internal nodes store XOR of leaves covered under them.
class SegmentTree {
  constructor(arr) {
    this.arr = arr;
    this.arrLength = arr.length;
    // Segment tree is represented as an array
    this.values = [];
    this.construct();
  }

  // Gets the middle index
  getMiddle(left, right) {
    return Math.floor(left + (right - left) / 2);
  };

  // Constructs a segment tree
  // We recursively go through an array and build the tree that
  // stores the XOR of its elements
  // We start building the tree from the root (currentIdx == 0)
  // The leaf nodes are the elements of the array
  // The internal nodes stores the XOR of their subtrees
  // For example, [1, 3, 4, 8], our tree will look like:
  //       14
  //     /    \
  //   2      12
  //  / \     / \
  // 1   3   4   8
  // The array representation of our tree will be [14, 2, 12, 1, 3, 4, 8]
  // We can find the children of the internal node:
  // left child index = parent index * 2 + 1
  // right child index = parent index * 2 + 2
  construct(leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {
    // We have a base case
    // Our current array has only one element - a leaf node
    // We add it to the tree
    if (leftIdx === rightIdx) {
      this.values[currentIdx] = this.arr[leftIdx];
      return this.values[currentIdx];
    }

    // We divide our current array into two subarrays
    // and recursively call construct method on them
    // We xor the results of the calls and store the XOR in the tree
    const middle = this.getMiddle(leftIdx, rightIdx);
    this.values[currentIdx] = this.construct(leftIdx, middle, currentIdx * 2 + 1) ^
        this.construct(middle + 1, rightIdx, currentIdx * 2 + 2);
    return this.values[currentIdx];
  }

  // Recursively finds the XOR of the elements in the range
  // We start from the root (currentIdx == 0)
  // For example, [1, 3, 4, 8], our tree == [14, 2, 12, 1, 3, 4, 8], query == [1, 2]
  //                             (leftIdx, rightIdx, currentIdx)
  //                                         (0, 3, 0)
  //                                    1 <= 0 && 2 >= 3 - false
  //                                    1 > 4 || 2 < 0 - false
  //                                   /                        \
  //                          (0, 1, 1)                          (2, 3, 2)
  //                   1 <= 0 && 2 >= 1 - false                1 <= 2 && 2 >= 3 - false
  //                   1 > 1 || 2 < 0 - false                  1 > 3 || 2 < 2 - false
  //                   /                  \                      /                 \
  //           (0, 0, 3)           (1, 1, 4)                 (2, 2, 5)        (3, 3, 6)
  // 1 <= 0 && 2 >= 0 - false 1 <= 1 && 2 >= 1 - true 1 <= 2 && 2 >= 2 - true  1 <= 3 && 2 >= 3 - false
  // 1 > 0 || 2 < 0 - true               |                        |            1 > 3 || 2 < 3 - true
  //            |                        |                        |                   |
  //        return 0                 return 3                  return 4           return 0
  //
  // XOR of the range == 0 ^ 3 ^ 4 ^ 0 == 7
  _getXor(queryLeft, queryRight, leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {
    // Our base cases
    // We are within the query range
    // The corresponding value of the tree array participates in the result
    if (queryLeft <= leftIdx && queryRight >= rightIdx) return this.values[currentIdx];
    // We are outside the query range
    // The corresponding value of the tree array doesn't participate in the result
    if (queryLeft > rightIdx || queryRight < leftIdx) return 0;

    // We start from the root, check the conditions of our base cases
    // If the conditions are false, we narrow the range in the tree
    // by moving on to the root children, again check the conditions
    // of our base cases and move on to their children and so on
    // Then we xor the results we got from our base cases
    const middle = this.getMiddle(leftIdx, rightIdx);
    return this._getXor(queryLeft, queryRight, leftIdx, middle, 2 * currentIdx + 1) ^
      this._getXor(queryLeft, queryRight, middle + 1, rightIdx, 2 * currentIdx + 2);
  }

  // Returns the XOR of the elements in the range
  getXor(query) {
    const [queryLeft, queryRight] = query;

    // We check if the query is valid
    if (queryLeft < 0 || queryRight >= this.arrLength || queryRight < queryLeft) {
      throw new Error('Invalid query.');
    }

    return this._getXor(queryLeft, queryRight);
  }
}

const xorQueriesSegmentTree = (arr, queries) => {
  const segmentTree = new SegmentTree(arr);
  const queriesResults = [];

  for (const query of queries) {
    queriesResults.push(segmentTree.getXor(query));
  }

  return queriesResults;
};

console.log(xorQueriesSegmentTree([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]
console.log(xorQueriesSegmentTree([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];
