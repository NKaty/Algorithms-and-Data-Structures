const BinaryHeap = require('./Binary-heap');

class MinBinaryHeap extends BinaryHeap {
  extractMin() {
    return super.extract();
  }

  compare(firstItem, secondItem) {
    return firstItem <= secondItem;
  }
}

if (module.parent) {
  module.exports = MinBinaryHeap;
} else {
  const binaryHeap1 = new MinBinaryHeap().insert(1).insert(2).insert(3).insert(4).insert(5).insert(6).insert(4);

  console.log(binaryHeap1.values); // [ 1, 2, 3, 4, 5, 6, 4 ]
  console.log(binaryHeap1.find(4)); // [ 3, 6 ]
  binaryHeap1.remove(4);
  console.log(binaryHeap1.values); // [[ 1, 2, 3, 6, 5 ]
  binaryHeap1.insert(4);
  console.log(binaryHeap1.values); // [ 1, 2, 3, 6, 5, 4 ]
  console.log(binaryHeap1.extractMin()); // 1
  console.log(binaryHeap1.values); // [ 2, 4, 3, 6, 5 ]
  console.log(binaryHeap1.heapSortViaExtract());
  console.log(binaryHeap1.values);

  const binaryHeap2 = new MinBinaryHeap();

  binaryHeap2.heapify([7, 4, 9, 6, 1, 8, 4]);
  console.log(binaryHeap2.values); // [ 1, 4, 4, 7, 6, 9, 8 ]
  binaryHeap2.heapSort();
  console.log(binaryHeap2.values); // [ 1, 4, 4, 6, 7, 8, 9 ]
}
