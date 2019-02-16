// Stack with 2 Queues

// Implement a stack using two queues:
// - push (returns the stack)
// - pop (returns the value popped)

// Comment on your time complexity for all of these operations.

const Queue = require('../queue/Queue');

class Stack {
  constructor() {
    this.main = new Queue();
    this.helper = new Queue();
  }

  // Time complexity - O(n), space complexity - O(n)
  push(data) {
    while (this.main.size > 0) {
      this.helper.enqueue(this.main.dequeue());
    }

    this.main.enqueue(data);

    while (this.helper.size > 0) {
      this.main.enqueue(this.helper.dequeue());
    }

    return this;
  }

  // Time complexity - O(1), space complexity - O(1)
  pop() {
    return this.main.dequeue();
  }
}

const stack = new Stack();

stack.push(10).push(20).push(30);
console.log(stack.pop()); // 30
console.log(stack.pop()); // 20
console.log(stack.pop()); // 10
console.log(stack.pop()); // null
stack.push(30).push(40).push(50);
console.log(stack.pop()); // 50
stack.push(60);
console.log(stack.pop()); // 60
