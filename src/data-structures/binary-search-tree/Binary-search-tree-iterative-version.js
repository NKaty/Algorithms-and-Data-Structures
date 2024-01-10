// Binary Search Tree - iterative version

// Write a function on the BinarySearchTree class

// insert
// This function should accept a value and insert it into the BST in the correct
// position. It should return the binary search tree.

// find
// This function should find a node in a binary tree. It should return the node
// if found, otherwise return `null`.

// remove
// This function should remove a node from a binary search tree.
// Your remove function should be able to handle removal of the root node,
// removal of a node with one child and removal of a node with two children.
// The function should return the node removed.

// findSecondLargest
// This function should find 2nd largest node.

// isBalanced
// This function should return true if the BST is balanced, otherwise false.
// A balanced tree is defined as a tree where the depth of all leaf nodes or
// nodes with single children differ by no more than one.

// breadthFirstSearch
// This function should search through each node in the binary search tree
// using breadth first search and return an array containing each node's value.

// depthFirstSearchPreOrder
// This function should search through each node in the binary search tree using
// pre-order depth first search and return an array containing each node's value.

// depthFirstSearchPostOrder
// This function should search through each node in the binary search tree using
// post-order depth first search and return an array containing each node's value.

// depthFirstSearchInOrder
// This function should search through each node in the binary search tree using
// in-order depth first search and return an array containing each node's value.

// getHeight
// This function should return the height of the tree
// The height is the number of nodes along the longest path
// from the root node down to the farthest leaf node.

// getMinHeight
// This function should return the min height of the tree
// The minimum height is the number of nodes along the shortest path
// from the root node down to the nearest leaf node.

// findMin
// This function should return min value in the binary tree

// findMax
// This function should return max value in the binary tree

// invert
// This function should invert the current tree structure
// (produce a tree that is equivalently the mirror image of the current tree)

// findLowestCommonAncestor
// This function should return the lowest common ancestor (LCA) node of two given nodes
// The lowest common ancestor is defined between two nodes p and q
// as the lowest node in T that has both p and q as descendants
// (where we allow a node to be a descendant of itself)

// getBalancedTree
// This function should return a balanced version of the binary search tree

// getTreeFormattedMatrix
// This function should return a matrix that represents a formatted layout of the tree

// printTree
// This function should print a tree formatted matrix

const BinarySearchTreeNode = require('./Binary-search-tree-node');
const Queue = require('../queue/Queue');
const Stack = require('../stack/Stack');

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  getHeight(node = this.root) {
    if (!node) return 0;

    let height = 1;
    const queue = new Queue();
    queue.enqueue(node);
    queue.enqueue('stop');

    while (queue.size > 1) {
      const currentNode = queue.dequeue();

      if (currentNode === 'stop') {
        height++;
        queue.enqueue('stop');
      } else {
        if (currentNode.left) queue.enqueue(currentNode.left);
        if (currentNode.right) queue.enqueue(currentNode.right);
      }
    }

    return height;
  }

  getMinHeight(node = this.root) {
    if (!node) return 0;

    let minHeight = 1;
    const queue = new Queue();
    queue.enqueue(node);

    while (queue.size) {
      const levelLength = queue.size;
      for (let i = 0; i < levelLength; i++) {
        const currentNode = queue.dequeue();

        if (!currentNode.left && !currentNode.right) return minHeight;

        if (currentNode.left) queue.enqueue(currentNode.left);

        if (currentNode.right) queue.enqueue(currentNode.right);
      }
      minHeight++;
    }

    return minHeight;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const stack = new Stack();
    const depths = new Map();
    stack.push([node, false]);

    while (stack.size) {
      const [currentNode, seen] = stack.pop();

      if (!seen) {
        stack.push([currentNode, true]);
        if (currentNode.right) stack.push([currentNode.right, 0]);
        if (currentNode.left) stack.push([currentNode.left, 0]);
      } else {
        const left = depths.get(currentNode.left) || 0;
        const right = depths.get(currentNode.right) || 0;

        if (Math.abs(left - right) > 1) return false;

        depths.set(currentNode, Math.max(left, right) + 1);
      }
    }

    return true;
  }

  insert(data, node = this.root) {
    const newNode = new BinarySearchTreeNode(data);

    if (!node) {
      this.root = newNode;
      return this;
    }

    let currentNode = node;

    while (true) {
      if (newNode.data === currentNode.data) return this;

      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(data, node = this.root) {
    let currentNode = node;

    while (currentNode) {
      if (data === currentNode.data) return currentNode;

      if (data < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }

    return null;
  }

  contains(data, node = this.root) {
    return !!this.find(data, node);
  }

  findMin(node = this.root) {
    if (!node) return null;

    let currentNode = node;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  findMax(node = this.root) {
    if (!node) return null;

    let currentNode = node;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode;
  }

  findSecondLargest(node = this.root) {
    if (!node) return null;

    let parent = null;
    let currentNode = node;

    while (currentNode.right) {
      parent = currentNode;
      currentNode = currentNode.right;
    }

    return currentNode.left ? this.findMax(currentNode.left) : parent;
  }

  invert(node = this.root) {
    if (!node) return null;
    const queue = new Queue();
    queue.enqueue(node);

    while (queue.size) {
      const currentNode = queue.dequeue();

      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);

      [currentNode.left, currentNode.right] = [currentNode.right, currentNode.left];
    }

    return node;
  }

  findNodeWithParent(data) {
    let parentNode = null;
    let currentNode = this.root;

    while (currentNode) {
      if (data === currentNode.data) break;

      parentNode = currentNode;

      if (data < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }

    return { parentNode, currentNode };
  }

  findNextBigNodeWithParent(node = this.root) {
    let nextBigNodeParent = node;

    if (!nextBigNodeParent || !nextBigNodeParent.right) {
      return { nextBigNodeParent, nextBigNode: null };
    }

    let nextBigNode = node.right;

    while (nextBigNode.left) {
      nextBigNodeParent = nextBigNode;
      nextBigNode = nextBigNode.left;
    }

    return { nextBigNodeParent, nextBigNode };
  }

  findLowestCommonAncestor(node1, node2, nodeToTraverse = this.root) {
    let currentNode = nodeToTraverse;

    while (currentNode) {
      if (currentNode.data > node1.data && currentNode.data > node2.data) {
        currentNode = currentNode.left;
      } else if (currentNode.data < node1.data && currentNode.data < node2.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return currentNode;
  }

  remove(data) {
    const { parentNode, currentNode } = this.findNodeWithParent(data);

    if (!currentNode) return null;

    const removedNode = Object.assign({}, currentNode,
      { left: null, right: null });

    // Node has no children.
    if (!currentNode.left && !currentNode.right) {
      // Node is the root and has no parent
      if (!parentNode) {
        this.root = null;
        // Node is the left child
      } else if (parentNode.left && parentNode.left.data === data) {
        parentNode.left = null;
        // Node is the right child
      } else if (parentNode.right && parentNode.right.data === data) {
        parentNode.right = null;
      }
      // Node has two children.
    } else if (currentNode.left && currentNode.right) {
      // Find the next biggest node (minimum node in the right branch)
      // to replace current node with.
      const { nextBigNode, nextBigNodeParent } = this.findNextBigNodeWithParent(currentNode);
      currentNode.data = nextBigNode.data;

      // Node is direct parent of the next biggest node
      if (nextBigNodeParent === currentNode) nextBigNodeParent.right = nextBigNode.right;
      // Node is not direct parent of the next biggest node
      else nextBigNodeParent.left = nextBigNode.right;
      // Node has only one child.
    } else {
      const nextNode = currentNode.left || currentNode.right;
      currentNode.data = nextNode.data;
      currentNode.left = nextNode.left;
      currentNode.right = nextNode.right;
    }

    return removedNode;
  }

  breadthFirstSearch(node = this.root) {
    const data = [];

    if (!node) return data;

    const queue = new Queue();
    queue.enqueue(node);

    while (queue.size) {
      const currentNode = queue.dequeue();

      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);

      data.push(currentNode.data);
    }

    return data;
  }

  depthFirstSearchPreOrder(node = this.root) {
    const data = [];

    if (!node) return data;

    const stack = new Stack();
    stack.push(node);

    while (stack.size) {
      const currentNode = stack.pop();

      if (currentNode.right) stack.push(currentNode.right);
      if (currentNode.left) stack.push(currentNode.left);

      data.push(currentNode.data);
    }

    return data;
  }

  depthFirstSearchPostOrder(node = this.root) {
    const data = [];

    if (!node) return data;

    const stack = new Stack();
    stack.push(node);

    while (stack.size) {
      const currentNode = stack.pop();

      if (currentNode.left) stack.push(currentNode.left);
      if (currentNode.right) stack.push(currentNode.right);

      data.push(currentNode.data);
    }

    data.reverse();

    return data;
  }

  depthFirstSearchInOrder(node = this.root) {
    const stack = new Stack();
    const data = [];
    let currentNode = node;

    while (currentNode || stack.size) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      data.push(currentNode.data);
      currentNode = currentNode.right;
    }

    return data;
  }

  getBalancedTree(node = this.root) {
    if (!node) return node;

    const sortedData = this.depthFirstSearchInOrder(node);

    function createNodeHelper(start, end) {
      const middle = Math.floor((start + end) / 2);
      indexes.enqueue([start, middle - 1]);
      indexes.enqueue([middle + 1, end]);
      return new BinarySearchTreeNode(sortedData[middle]);
    }

    const indexes = new Queue();
    const newRoot = createNodeHelper(0, sortedData.length - 1);

    const treeNodes = new Queue();
    treeNodes.enqueue(newRoot);

    while (indexes.size) {
      const [leftStart, leftEnd] = indexes.dequeue();
      const [rightStart, rightEnd] = indexes.dequeue();
      const currentNode = treeNodes.dequeue();

      if (leftStart <= leftEnd) {
        currentNode.left = createNodeHelper(leftStart, leftEnd);
        treeNodes.enqueue(currentNode.left);
      }

      if (rightStart <= rightEnd) {
        currentNode.right = createNodeHelper(rightStart, rightEnd);
        treeNodes.enqueue(currentNode.right);
      }
    }

    return new BinarySearchTree(newRoot);
  }

  getTreeFormattedMatrix(node = this.root) {
    const height = this.getHeight(node);
    const width = 2 ** height - 1;
    const matrix = Array.from({ length: height },
      () => Array.from({ length: width }, () => ''));

    const queue = new Queue();
    queue.enqueue([node, 0, 0, width - 1]);

    while (queue.size) {
      const queueSize = queue.size;

      for (let i = 0; i < queueSize; i++) {
        const [node, row, left, right] = queue.dequeue();
        const middle = Math.floor((left + right) / 2);
        matrix[row][middle] = `${node.data}`;

        if (node.left) queue.enqueue([node.left, row + 1, left, middle - 1]);
        if (node.right) queue.enqueue([node.right, row + 1, middle + 1, right]);
      }
    }

    return matrix;
  }

  printTree(node = this.root) {
    const maxNumberWidth = Math.max(
      `${this.findMax(node).data}`.length,
      `${this.findMin(node).data}`.length
    );
    const matrix = this.getTreeFormattedMatrix(node)
      .map(row => row.map(item => {
        const lengthDiff = maxNumberWidth - item.length;
        const prefixLength = Math.ceil(lengthDiff / 2);
        return ' '.repeat(prefixLength) + item + ' '.repeat(lengthDiff - prefixLength);
      }));
    matrix.forEach(row => console.log(row.join(' ')));
  }
}

const binarySearchTree1 = new BinarySearchTree();
binarySearchTree1.insert(15).insert(20).insert(10).insert(12).insert(8).insert(13);
console.log('---BinarySearchTree1---');
console.log('min:', binarySearchTree1.findMin().data); // 8
console.log('max:', binarySearchTree1.findMax().data); // 20
console.log('Contains 10:', binarySearchTree1.contains(10)); // true
console.log('Remove 10:', binarySearchTree1.remove(10)); // { data: 10, left: null, right: null }
console.log('root.data after the removal:', binarySearchTree1.root.data); // 15
console.log('root.left.data after the removal:', binarySearchTree1.root.left.data); // 12
console.log('root.left.right.data after the removal:', binarySearchTree1.root.left.right.data); // 13
console.log('root.left.left.data after the removal:', binarySearchTree1.root.left.left.data); // 8
console.log('height:', binarySearchTree1.getHeight()); // 3
console.log('minHeight:', binarySearchTree1.getMinHeight()); // 2
console.log('Is balanced:', binarySearchTree1.isBalanced()); // true

const binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(22).insert(49).insert(85).insert(66).insert(95).insert(90).insert(100).insert(88).insert(93).insert(89);
console.log('---BinarySearchTree2---');
console.log('Remove 85:', binarySearchTree2.remove(85)); // { data: 85, left: null, right: null }
console.log('root.data after the removal:', binarySearchTree2.root.data); // 22
console.log('root.right.right.data after the removal:', binarySearchTree2.root.right.right.data); // 88
console.log('root.right.right.right.left.left.data after the removal:', binarySearchTree2.root.right.right.right.left.left.data); // 89
console.log('Find second largest:', binarySearchTree2.findSecondLargest().data); // 95
console.log('Find lowest common ancestor:', binarySearchTree2.findLowestCommonAncestor(
  binarySearchTree2.root.right.right.right.left.left,
  binarySearchTree2.root.right.right
).data); // 88
console.log('BreadthFirst:', binarySearchTree2.breadthFirstSearch()); // [ 22, 49, 88, 66, 95, 90, 100, 89, 93 ]
console.log('PreOrder:', binarySearchTree2.depthFirstSearchPreOrder()); // [ 22, 49, 88, 66, 95, 90, 89, 93, 100 ]
console.log('PostOrder:', binarySearchTree2.depthFirstSearchPostOrder()); // [ 66, 89, 93, 90, 100, 95, 88, 49, 22 ]
console.log('InOrder:', binarySearchTree2.depthFirstSearchInOrder()); // [ 22, 49, 66, 88, 89, 90, 93, 95, 100 ]
console.log('height:', binarySearchTree2.getHeight()); // 6
console.log('minHeight:', binarySearchTree2.getMinHeight()); // 4
console.log('Is balanced:', binarySearchTree2.isBalanced()); // false
const balancedTree = binarySearchTree2.getBalancedTree();
console.log('Is balanced:', balancedTree.isBalanced()); // true
console.log('BreadthFirst after balancing:', balancedTree.breadthFirstSearch()); // [  89, 49, 93, 22, 66, 90, 95, 88, 100 ]
binarySearchTree2.invert();
console.log('InOrder after the inversion:', binarySearchTree2.depthFirstSearchInOrder()); // [ 100, 95, 93, 90, 89, 88, 66, 49, 22 ]
