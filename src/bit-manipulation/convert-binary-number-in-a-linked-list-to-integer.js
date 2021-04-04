// Given head which is a reference node to a singly-linked list.
// The value of each node in the linked list is either 0 or 1.
// The linked list holds the binary representation of a number.
// Return the decimal value of the number in the linked list.

// Constraints:
// The Linked List is not empty.
// Number of nodes will not exceed 30.
// Each node's value is either 0 or 1.

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const getList = (arr) => {
  if (!arr.length) throw new Error('Array is empty.');

  const head = new ListNode(arr[0]);
  let prevNode = head;

  for (let i = 1; i < arr.length; i++) {
    prevNode.next = new ListNode(arr[i]);
    prevNode = prevNode.next;
  }

  return head;
};

const getDecimalValue = (head) => {
  if (!head) return;

  let num = 0;
  let current = head;

  while (current) {
    // We start from the most significant bit
    // So we must shift our number by one every time
    num <<= 1;
    // Add current value
    // as an option: num |= current.val
    num += current.val;
    current = current.next;
  }

  return num;
};

console.log(getDecimalValue(getList([1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]))); // 18880
console.log(getDecimalValue(getList([0, 0]))); // 0
