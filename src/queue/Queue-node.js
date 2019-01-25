module.exports = class QueueNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
};
