// Binary Search Tree - recursive version

// Write a function on the BinarySearchTree class

// insert - accepts a value and inserts it into the BST in the correct position.
// The function should return the binary search tree.

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

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  getHeight(node = this.root) {
    if (!node) return 0;

    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  getMinHeight(node = this.root) {
    if (!node) return 0;

    return Math.min(this.getMinHeight(node.left), this.getMinHeight(node.right)) + 1;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    return Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right);
  }

  // More efficient way to know whether the BST is balanced
  moreEfficientIsBalanced() {
    return this.getHeight() - this.getMinHeight() <= 1;
  }

  insert(data, node = this.root) {
    if (!node) {
      this.root = new BinarySearchTreeNode(data);
      return this;
    }

    if (data < node.data && node.left) return this.insert(data, node.left);
    if (data < node.data) {
      node.left = new BinarySearchTreeNode(data);
      return this;
    }
    if (data > node.data && node.right) return this.insert(data, node.right);
    if (data > node.data) {
      node.right = new BinarySearchTreeNode(data);
      return this;
    }

    return this;
  }

  find(data, node = this.root) {
    if (!node) return null;

    if (data < node.data) return this.find(data, node.left);
    if (data > node.data) return this.find(data, node.right);

    return node;
  }

  contains(data, node = this.root) {
    return !!this.find(data, node);
  }

  findMin(node = this.root) {
    if (!node || !node.left) return node;

    return this.findMin(node.left);
  }

  findMax(node = this.root) {
    if (!node || !node.right) return node;

    return this.findMax(node.right);
  }

  findSecondLargest(node = this.root, parent = null) {
    if (!node) return null;

    if (!node.right) return node.left ? this.findMax(node.left) : parent;

    return this.findSecondLargest(node.right, node);
  }

  invert(node = this.root) {
    if (!node) return null;
    if (node.left) this.invert(node.left);
    if (node.right) this.invert(node.right);

    [node.left, node.right] = [node.right, node.left];

    return node;
  }

  findNodeWithParent(data, currentNode = this.root, parentNode = null) {
    if (!currentNode) return { parentNode: null, currentNode: null };

    if (data < currentNode.data) {
      return this.findNodeWithParent(data, currentNode.left, currentNode);
    }

    if (data > currentNode.data) {
      return this.findNodeWithParent(data, currentNode.right, currentNode);
    }

    return { parentNode, currentNode };
  }

  findNextBigNodeWithParent(nextBigNodeParent = this.root, nextBigNode = nextBigNodeParent.right) {
    if (!nextBigNode || !nextBigNode.left) return { nextBigNodeParent, nextBigNode };

    return this.findNextBigNodeWithParent(nextBigNode, nextBigNode.left);
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

  breadthFirstSearch(nodeToTraverse = this.root) {
    const data = [];

    function traverse(node, depth) {
      data[depth] = data[depth] || [];
      data[depth].push(node.data);

      if (node.left) traverse(node.left, depth + 1);
      if (node.right) traverse(node.right, depth + 1);
    }

    traverse(nodeToTraverse, 0);

    return [].concat(...data);
  }

  depthFirstSearchPreOrder(nodeToTraverse = this.root) {
    const data = [];

    function traverse(node) {
      data.push(node.data);

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(nodeToTraverse);

    return data;
  }

  depthFirstSearchPostOrder(nodeToTraverse = this.root) {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      data.push(node.data);
    }

    traverse(nodeToTraverse);

    return data;
  }

  depthFirstSearchInOrder(nodeToTraverse = this.root) {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);

      data.push(node.data);

      if (node.right) traverse(node.right);
    }

    traverse(nodeToTraverse);

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
