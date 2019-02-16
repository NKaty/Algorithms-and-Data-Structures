// Stack

// Implement the following methods on the Stack class:

// push - takes in a node and puts it at the top of the stack.
// Should return the new size of the stack.

// pop - removes the node at the top of the stack and returns the value of that node.

const StackNode = require('./Stack-node');

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(data) {
    this.first = new StackNode(data, this.first);

    if (!this.size) this.last = this.first;
    this.size++;

    return this.size;
  }

  pop() {
    if (!this.first) return null;

    const removedNode = this.first;
    this.first = removedNode.next;
    this.size--;

    if (!this.size) this.last = null;

    return removedNode.data;
  }
}

if (module.parent) {
  module.exports = Stack;
} else {
  const stack = new Stack();

  stack.push(10);
  stack.push(100);
  stack.push(1000);
  console.log(stack.pop()); // 1000
  console.log(stack.size); // 2
  stack.pop();
  stack.pop();
  console.log(stack.size); // 0
  console.log(stack.pop()); // null
}
