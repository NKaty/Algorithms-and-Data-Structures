// Doubly Linked List

// Implement the following on the DoublyLinkedList class

// push
// This function should accept a value add a node to the end of the DoublyLinkedList
// with the given value. It should return the DoublyLinkedList.

// pop
// This function should remove a node at the end of the DoublyLinkedList.
// It should return the node removed.

// shift
// This function should remove a node at the beginning of the DoublyLinkedList.
// It should return the node removed.

// unshift
// This function should accept a value and add a node to the beginning of
// the DoublyLinkedList with the given value. It should return the DoublyLinkedList.

// get
// This internal/helper function should find a node at a specified index
// in a DoublyLinkedList. It should return the found node.

// set
// This function should accept an index and a value and update the value
// of the node in the DoublyLinkedList at the index with the new value.
// It should return true if the node is updated successfully,
// or false if an invalid index is passed in.

// insert
// This internal/helper function should insert a node at a specified index
// in a DoublyLinkedList. It should return true if the index is valid,
// and false if the index is invalid (less than 0 or greater than the length of the list).
//
// remove
// This function should remove a node at a specified index in a DoublyLinkedList.
// It should return the removed node, if the index is valid,
// or undefined if the index is invalid.

// reverse
// This function should reverse all of the nodes in a DoublyLinkedList,
// and should return the list.

// rotate
// This function should rotate all the nodes in the list by some number passed in.
// For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you rotate by 2,
// the list should be modified to 3 -> 4 -> 5 -> 1 -> 2.
// The number passed in to rotate can be any integer (should work with negative indexes).
// Time Complexity: O(N), where N is the length of the list.
// Space Complexity: O(1)

const DoublyLinkedListNode = require('./Doubly-linked-list-node');

class DoublyLinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    const newNode = new DoublyLinkedListNode(data, null, this.tail);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    const removedNode = this.tail;
    this.tail = removedNode.prev;
    removedNode.prev = null;
    this.length--;

    if (!this.length) this.head = null;
    else this.tail.next = null;

    return removedNode;
  }

  shift() {
    if (!this.head) return undefined;

    const removedNode = this.head;
    this.head = removedNode.next;
    removedNode.next = null;
    this.length--;

    if (!this.length) this.tail = null;
    else this.head.prev = null;

    return removedNode;
  }

  unshift(data) {
    const newNode = new DoublyLinkedListNode(data, this.head);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    const middle = Math.floor(this.length / 2);
    let currentNode;

    if (index < middle) {
      currentNode = this.head;
      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        currentNode = currentNode.prev;
      }
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

    const newNode = new DoublyLinkedListNode(data, prevNode.next, prevNode);
    prevNode.next = newNode;
    newNode.next.prev = newNode;
    this.length++;

    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index);

    if (!removedNode) return undefined;

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;

    return removedNode;
  }

  reverse() {
    let currentNode = this.head;
    const tail = this.tail;

    while (currentNode) {
      [currentNode.next, currentNode.prev] = [currentNode.prev, currentNode.next];
      currentNode = currentNode.prev;
    }

    this.tail = this.head;
    this.head = tail;

    return this;
  }

  rotate(number) {
    const index = number < 0 ? number + this.length : number;

    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this;

    const node = this.get(index);

    if (!node) return undefined;

    this.tail.next = this.head;
    this.head.prev = this.tail;
    this.head = node;
    this.tail = node.prev;
    this.tail.next = null;
    this.head.prev = null;

    return this;
  }

  print() {
    const arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log(arr);
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.push(5).push(10);
console.log(doublyLinkedList.length); // 2
console.log(doublyLinkedList.head.data); // 5
console.log(doublyLinkedList.head.next.data); // 10
console.log(doublyLinkedList.tail.data); // 10
doublyLinkedList.pop();
console.log(doublyLinkedList.length); // 1
console.log(doublyLinkedList.head.next); // null
doublyLinkedList.unshift(20);
doublyLinkedList.unshift(40);
console.log(doublyLinkedList.head.data); // 40
console.log(doublyLinkedList.shift().data); // 40
console.log(doublyLinkedList.head.data); // 20
console.log(doublyLinkedList.get(1).data); // 5
doublyLinkedList.set(1, 1000);
console.log(doublyLinkedList.get(1).data); // 1000
doublyLinkedList.print(); // [ 20, 1000 ]
doublyLinkedList.insert(1, 25);
doublyLinkedList.insert(0, 30);
doublyLinkedList.insert(-1, 500);
doublyLinkedList.print(); // [ 30, 20, 25, 1000 ]
doublyLinkedList.reverse();
doublyLinkedList.print(); // [ 1000, 25, 20, 30 ]
doublyLinkedList.rotate(-2);
doublyLinkedList.print(); // [ 20, 30, 1000, 25 ]
