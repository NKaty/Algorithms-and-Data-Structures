module.exports = class StackNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
};
