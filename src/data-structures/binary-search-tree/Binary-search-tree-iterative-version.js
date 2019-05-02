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

// Additionally, the following methods are implemented on the class:
// getHeight - returns the height of the tree
// findMin/Max - returns node with min/max value in the binary tree
// invert - invert the current tree structure (produce a tree that is equivalently
// the mirror image of the current tree)

const BinarySearchTreeNode = require('./Binary-search-tree-node');
const Queue = require('../queue/Queue');
const Stack = require('../stack/Stack');

class BinarySearchTree {
  constructor() {
    this.root = null;
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
}

const binarySearchTree1 = new BinarySearchTree();

binarySearchTree1.insert(15).insert(20).insert(10).insert(12).insert(8).insert(13);
console.log('min', binarySearchTree1.findMin().data); // 8
console.log('max', binarySearchTree1.findMax().data); // 20
console.log(binarySearchTree1.contains(10)); // true
console.log(binarySearchTree1.remove(10)); // { data: 10, left: null, right: null }
console.log(binarySearchTree1.root.data); // 15
console.log(binarySearchTree1.root.left.data); // 12
console.log(binarySearchTree1.root.left.right.data); // 13
console.log(binarySearchTree1.root.left.left.data); // 8
console.log(binarySearchTree1.getHeight()); // 3
console.log(binarySearchTree1.isBalanced()); // true

const binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(22).insert(49).insert(85).insert(66).insert(95).insert(90).insert(100).insert(88).insert(93).insert(89);
binarySearchTree2.remove(85);
console.log(binarySearchTree2.root.data); // 22
console.log(binarySearchTree2.root.right.right.data); // 88
console.log(binarySearchTree2.root.right.right.right.left.left.data); // 89
console.log(binarySearchTree2.findSecondLargest().data); // 95
console.log(binarySearchTree2.breadthFirstSearch()); // [ 22, 49, 88, 66, 95, 90, 100, 89, 93 ]
console.log(binarySearchTree2.depthFirstSearchPreOrder()); // [ 22, 49, 88, 66, 95, 90, 89, 93, 100 ]
console.log(binarySearchTree2.depthFirstSearchPostOrder()); // [ 66, 89, 93, 90, 100, 95, 88, 49, 22 ]
console.log(binarySearchTree2.depthFirstSearchInOrder()); // [ 22, 49, 66, 88, 89, 90, 93, 95, 100 ]
console.log(binarySearchTree2.getHeight()); // 6
console.log(binarySearchTree2.isBalanced()); // false
binarySearchTree2.invert();
console.log(binarySearchTree2.depthFirstSearchInOrder()); // [ 100, 95, 93, 90, 89, 88, 66, 49, 22 ]
