// Hashtable - implementation using a singly linked list

// Implement the following on the Hashtable class:

// set
// This function should accept a key and a value, hash the key,
// store the key-value pair in the hash table array via separate chaining.

// get
// This function should accepts a key, retrieve the key-value pair in the hash table,
// if the key isn't found, return undefined.

// getKeys
// This function should loop through the hash table array and return an array
// of keys in the table.

// getValues
// This function should loop through the hash table array and return an array
// of values in the table.

// Additionally, the following method is implemented on the class:
// delete - accepts a key, removes the key-value pair from the hash table

const SinglyLinkedList = require('../singly-linked-list/Singly-linked-list');

class Hashtable {
  constructor (size = 53) {
    this.keyMap = new Array(size).fill(null).map(() => new SinglyLinkedList());
  }

  hash(key) {
    let hash = 0;
    const WEIRD_PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      hash = (hash * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return hash;
  }

  set(key, value) {
    const bucketIndex = this.hash(key);
    const item = this.keyMap[bucketIndex].find((data) => data[0] === key);

    if (item) item.data[1] = value;
    else this.keyMap[bucketIndex].unshift([key, value]);
  }

  get(key) {
    const bucketIndex = this.hash(key);
    const item = this.keyMap[bucketIndex].find((data) => data[0] === key);

    return item ? item.data[1] : undefined;
  }

  delete(key) {
    const bucketIndex = this.hash(key);
    const itemIndex = this.keyMap[bucketIndex].find((data) => data[0] === key, true);

    if (itemIndex) return this.keyMap[bucketIndex].remove(itemIndex).data;

    return null;
  }

  getKeys() {
    let keys = [];

    for (const bucket of this.keyMap) {
      keys = keys.concat(bucket.iterate((data) => data[0]));
    }

    return keys;
  }

  getValues() {
    let values = [];

    for (const bucket of this.keyMap) {
      values = values.concat(bucket.iterate((data) => data[1]));
    }

    return Array.from(new Set(values));
  }

  print() {
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i].head) console.log(`bucket ${i}: ${this.keyMap[i].iterate()}`);
    }
  }
}

const hashtable = new Hashtable(17);

hashtable.set('maroon', '#800000');
hashtable.set('yellow', '#FFFF00');
hashtable.set('olive', '#808000');
hashtable.set('salmon', '#FA8072');
hashtable.set('lightcoral', '#F08080');
hashtable.set('mediumvioletred', '#C71585');
hashtable.set('plum', '#DDA0DD');
hashtable.set('lightcoral', '#EE7F74');
hashtable.set('coral', '#EE7F74');
hashtable.print();
// bucket 0: plum,#DDA0DD
// bucket 3: salmon,#FA8072
// bucket 8: yellow,#FFFF00,maroon,#800000
// bucket 9: coral,#EE7F74
// bucket 10: olive,#808000
// bucket 13: lightcoral,#EE7F74
// bucket 16: mediumvioletred,#C71585
console.log(hashtable.get('olive')); // #808000
console.log(hashtable.get('oliv')); // undefined
console.log(hashtable.getKeys()); // [ 'plum','salmon', 'yellow', 'maroon', 'coral', 'olive', 'lightcoral', 'mediumvioletred' ]
console.log(hashtable.getValues()); // [ '#DDA0DD', '#FA8072', '#FFFF00', '#800000', '#EE7F74', '#808000', '#C71585' ]
console.log(hashtable.delete('maroon')); // [ 'maroon', '#800000' ]
console.log(hashtable.delete('maro')); // null
hashtable.print();
// bucket 0: plum,#DDA0DD
// bucket 3: salmon,#FA8072
// bucket 8: yellow,#FFFF00
// bucket 9: coral,#EE7F74
// bucket 10: olive,#808000
// bucket 13: lightcoral,#EE7F74
// bucket 16: mediumvioletred,#C71585
