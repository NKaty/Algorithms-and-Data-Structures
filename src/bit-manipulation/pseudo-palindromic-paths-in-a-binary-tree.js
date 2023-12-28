// Given a binary tree where node values are digits from 1 to 9.
// A path in the binary tree is said to be pseudo-palindromic
// if at least one permutation of the node values in the path is a palindrome.
// Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

// Constraints:
// The number of nodes in the tree is in the range [1, 10 ^ 5]
// 1 <= Node.val <= 9

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const getTree = (arr) => {
  if (!arr.length) throw new Error('Array is empty.');

  const build = (node, index) => {
    if (arr[index * 2 + 1] !== null && arr[index * 2 + 1] !== undefined) {
      node.left = new TreeNode(arr[index * 2 + 1]);
      build(node.left, index * 2 + 1);
    }
    if (arr[index * 2 + 2] !== null && arr[index * 2 + 2] !== undefined) {
      node.right = new TreeNode(arr[index * 2 + 2]);
      build(node.right, index * 2 + 2);
    }
  };

  const root = new TreeNode(arr[0]);
  build(root, 0);
  return root;
};

const pseudoPalindromicPaths = (root) => {
  if (!root) return 0;
  let count = 0;

  // The idea is to use path as a bitmask to track
  // how many digits in this branch have an odd frequency
  // If there are more than one such digits, then the path
  // is not pseudo-palindromic
  // For example, [2, 3, 1, 3, 1, null, 1]
  //          2
  //        /   \
  //       3     1
  //     /   \    \
  //    3     1    1
  // Possible paths:
  // 2 -> 3 -> 3 --> 0100 -> 1100 -> 0100 --> pseudo-palindromic
  // 2 -> 3 -> 1 --> 0100 -> 1100 -> 1110 --> not pseudo-palindromic
  // 2 -> 1 -> 1 --> 0100 -> 0110 -> 0100 --> pseudo-palindromic
  const dfs = (node, path = 0) => {
    // We can use a 32-bit integer as a bitmask,
    // because according to the constraints the values
    // of nodes can be from 1 to 9
    // The one means digit has an odd frequency
    // The zero means digit has an even frequency
    path ^= (1 << node.val);
    // If the node doesn't have children, we can check the path
    // If we don't have any odd digits or have only one
    // the expression: path & (path - 1) will be 0
    // as it flips the least-significant bit to 0
    if (!node.left && !node.right) count += !(path & (path - 1));
    // Otherwise, we keep constructing the path
    if (node.left) dfs(node.left, path);
    if (node.right) dfs(node.right, path);
  };

  dfs(root);
  return count;
};

console.log(pseudoPalindromicPaths(getTree([2, 3, 1, 3, 1, null, 1]))); // 2
console.log(pseudoPalindromicPaths(getTree([2, 1, 1, 1, 3, null, null, null, null, null, 1]))); // 1
