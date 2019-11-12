// Priority Queue

// Implement Priority Queue with Min Binary Heap
// Each Node has a value and a priority.  Use the priority to build the heap.

// enqueue
// This method accepts a value and priority, makes a new node,
// and puts it in the right spot based off of its priority.

// dequeue
// This method removes root element, returns it, and rearranges heap using priority.

// Additionally, the following method is implemented on the class:
// changePriority - changes priority of node

const PriorityQueueNode = require('./Priority-queue-node');
const MinBinaryHeap = require('../binary-heap/Min-binary-heap');

class PriorityQueue extends MinBinaryHeap {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
  }

  getItem(index) {
    return this.values[index].priority;
  }

  getValue(index) {
    return this.values[index].value;
  }

  enqueue(value, priority) {
    return super.insert(new PriorityQueueNode(value, priority));
  }

  dequeue() {
    return super.extractMin();
  }

  findByValue(value) {
    return super.find(value, this.getValue);
  }

  remove(value) {
    return super.remove(value, this.getValue);
  }

  changePriority(value, priority) {
    this.remove(value);
    return this.enqueue(value, priority);
  }

  printPriorityQueue() {
    for (const item of this.values) {
      console.log(`${item.value} - ${item.priority}`);
    }
  }
}

if (module.parent) {
  module.exports = PriorityQueue;
} else {
  const priorityQueue = new PriorityQueue().enqueue('cat', 1).enqueue('dog', 2).enqueue('fish', 3).enqueue('rat', 4).enqueue('horse', 5).enqueue('squirrel', 6).enqueue('snake', 2);

  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rat - 4, horse - 5, squirrel - 6, fish - 3
  console.log(priorityQueue.findByValue('horse')); // [ 4 ]
  priorityQueue.remove('fish');
  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rat - 4, horse - 5, squirrel - 6
  priorityQueue.enqueue('crow', 4).enqueue('rabbit', 3);
  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rabbit - 3, horse - 5, squirrel - 6, crow - 4, rat - 4
  console.log(priorityQueue.dequeue());
  priorityQueue.printPriorityQueue(); // dog - 2, rabbit - 3, snake - 2, rat - 4, horse - 5, squirrel - 6, crow - 4
}
