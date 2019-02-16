// Queue with 2 stacks

// Implement the following operations of a queue using two stacks:
// - enqueue (returns the queue)
// - dequeue  (returns the dequeue value)

// Make sure to write your time and space complexities for each function

const Stack = require('../stack/Stack');

class Queue {
  constructor() {
    this.main = new Stack();
    this.helper = new Stack();
  }

  // Time complexity - O(1), space complexity - O(1)
  enqueue(data) {
    this.main.push(data);

    return this;
  }

  // Time complexity - O(n), space complexity - O(n)
  dequeue() {
    while (this.main.size > 1) {
      this.helper.push(this.main.pop());
    }

    const removedNode = this.main.pop();

    while (this.helper.size > 0) {
      this.main.push(this.helper.pop());
    }

    return removedNode;
  }
}

const q1 = new Queue();
console.log(q1.enqueue(3)); // returns the queue
console.log(q1.enqueue(4)); // returns the queue
console.log(q1.enqueue(5)); // returns the queue
console.log(q1.enqueue(6).enqueue(7)); // returns the queue
console.log(q1.dequeue()); // 3
console.log(q1.dequeue()); // 4
console.log(q1.dequeue()); // 5
console.log(q1.dequeue()); // 6
console.log(q1.dequeue()); // 7
console.log(q1.dequeue()); // null
