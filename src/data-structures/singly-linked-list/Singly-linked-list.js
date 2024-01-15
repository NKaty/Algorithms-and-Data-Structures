// Singly Linked List

// Implement the following on the SinglyLinkedList class:

// push
// This function should take in a value and add a node to the end of the SinglyLinkedList.
// It should return the SinglyLinkedList.

// pop
// This function should remove a node at the end of the SinglyLinkedList.
// It should return the node removed.

// shift
// This function should remove a node from the beginning of the SinglyLinkedList.
// It should return the node removed.

// unshift
// This function should add a new node to the beginning of the SinglyLinkedList.
// It should return the SinglyLinkedList.

// get
// This function should find a node at a specified index in a SinglyLinkedList.
// It should return the found node.

// set
// This function should accept an index and a value and update the value
// of the node in the SinglyLinkedList at the index with the new value.
// It should return true if the node is updated successfully,
// or false if an invalid index is passed in.

// insert
// This should insert a node at a specified index in a SinglyLinkedList.
// It should return true if the index is valid, and false if the index is
// invalid (less than 0 or greater than the length of the list).

// remove
// This function should remove a node at a specified index in a SinglyLinkedList.
// It should return the removed node, if the index is valid,
// or undefined if the index is invalid.

// reverse
// This function should reverse the SinglyLinkedList in place.

// rotate
// This function should rotate all the nodes in the list by some number passed in.
// For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5, and you rotate by 2,
// the list should be modified to 3 -> 4 -> 5 -> 1 -> 2.
// The number passed in to rotate can be any integer (should work with negative indexes).
// Time Complexity: O(N), where N is the length of the list.
// Space Complexity: O(1)

// find
// This function accepts a parameter compareTo which can be a value for comparison or
// a comparison function (must return true or false for each node), should return
// the found node or its index.

// iterate
// This function accepts a callback function as a parameter, iterates through each node
// in the list applying the callback function, should return array of values returned from
// the callback function

// hasCycle
// This function should determine if the linked list has a cycle in it
// assuming that the linked list implementation might not have
// this.tail reference to the last element

// detectCycle
// This function should return the node where the cycle begins
// or null if there is no cycle
// assuming that the linked list implementation might not have
// this.tail reference to the last element

const SinglyLinkedListNode = require('./Singly-linked-list-node');

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    const node = new SinglyLinkedListNode(data);

    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let removedNode;

    if (this.head === this.tail) {
      removedNode = this.head;
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;

      while (currentNode.next !== this.tail) {
        currentNode = currentNode.next;
      }

      removedNode = currentNode.next;
      currentNode.next = null;
      this.tail = currentNode;
    }

    this.length--;

    return removedNode;
  }

  shift() {
    if (!this.head) return undefined;

    const removedNode = this.head;

    if (this.head === this.tail) this.tail = null;

    this.head = removedNode.next;
    removedNode.next = null;
    this.length--;

    return removedNode;
  }

  unshift(data) {
    this.head = new SinglyLinkedListNode(data, this.head);

    if (!this.length) this.tail = this.head;
    this.length++;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    let currentNode = this.head;

    for (let i = 1; i <= index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  set(index, data) {
    const node = this.get(index);

    if (!node) return false;

    node.data = data;

    return true;
  }

  insert(index, data) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(data);
    if (index === this.length) return !!this.push(data);

    const prevNode = this.get(index - 1);

    if (!prevNode) return false;

    prevNode.next = new SinglyLinkedListNode(data, prevNode.next);
    this.length++;

    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);

    if (!prevNode) return undefined;

    const removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    removedNode.next = null;
    this.length--;

    return removedNode;
  }

  find(compareTo, returnIndex = false) {
    if (!this.head) return undefined;

    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (typeof compareTo === 'function' && compareTo(currentNode.data)) {
        return returnIndex ? index : currentNode;
      } else if (typeof compareTo !== 'function' && currentNode.data === compareTo) {
        return returnIndex ? index : currentNode;
      }

      currentNode = currentNode.next;
      index++;
    }

    return undefined;
  }

  reverse() {
    let currentNode = this.head;
    let nextNode = currentNode.next;
    this.tail = currentNode;
    currentNode.next = null;

    while (nextNode) {
      const tempNode = nextNode.next;
      nextNode.next = currentNode;
      currentNode = nextNode;
      nextNode = tempNode;
    }

    this.head = currentNode;

    return this;
  }

  rotate(number) {
    const index = number < 0 ? number + this.length : number;

    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this;

    const prevNode = this.get(index - 1);

    if (!prevNode) return undefined;

    this.tail.next = this.head;
    this.head = prevNode.next;
    this.tail = prevNode;
    prevNode.next = null;

    return this;
  }

  iterate(cb = null) {
    const arr = [];
    let currentNode = this.head;

    while (currentNode) {
      if (typeof cb === 'function') arr.push(cb(currentNode.data));
      else arr.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return arr;
  }

  hasCycle() {
    let fast = this.head;
    let slow = this.head;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) return true;
    }

    return false;
  }

  detectCycle() {
    let fast = this.head;
    let slow = this.head;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;

      if (fast === slow) {
        slow = this.head;
        while (slow !== fast) {
          slow = slow.next;
          fast = fast.next;
        }
        return slow;
      }
    }

    return null;
  }

  print() {
    console.log(this.iterate());
  }
}

if (module.parent) {
  module.exports = SinglyLinkedList;
} else {
  const singlyLinkedList = new SinglyLinkedList();

  singlyLinkedList.push(5).push(10).push(15).push(20).push(25).push(30);
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25, 30 ]
  singlyLinkedList.pop();
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25 ]
  singlyLinkedList.unshift(1);
  singlyLinkedList.print(); // [ 1, 5, 10, 15, 20, 25 ]
  singlyLinkedList.shift();
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25 ]
  console.log(singlyLinkedList.get(2).data); // 15
  singlyLinkedList.set(2, 100);
  console.log(singlyLinkedList.get(2).data); // 100
  singlyLinkedList.insert(3, 10000);
  singlyLinkedList.print(); // [ 5, 10, 100, 10000, 20, 25 ]
  singlyLinkedList.remove(3);
  singlyLinkedList.print(); // [ 5, 10, 100, 20, 25 ]
  singlyLinkedList.reverse();
  singlyLinkedList.print(); // [ 25, 20, 100, 10, 5 ]
  singlyLinkedList.rotate(-2);
  singlyLinkedList.print(); // [ 10, 5, 25, 20, 100 ]
  console.log(singlyLinkedList.find(25, true)); // 2
  console.log(singlyLinkedList.hasCycle()); // false
  console.log(singlyLinkedList.detectCycle()); // null
  singlyLinkedList.tail.next = singlyLinkedList.head.next;
  console.log(singlyLinkedList.hasCycle()); // true
  console.log(singlyLinkedList.detectCycle().data); // 5
}
