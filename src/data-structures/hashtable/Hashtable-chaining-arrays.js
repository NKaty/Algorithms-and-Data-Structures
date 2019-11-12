// Hashtable - implementation using an array

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

class Hashtable {
  constructor (size = 53) {
    this.keyMap = new Array(size);
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
    const index = this.hash(key);

    if (!this.keyMap[index]) this.keyMap[index] = [];

    else {
      for (const item of this.keyMap[index]) {
        if (item[0] === key) {
          item[1] = value;
          return;
        }
      }
    }

    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);

    if (this.keyMap[index]) {
      for (const item of this.keyMap[index]) {
        if (item[0] === key) {
          return item[1];
        }
      }
    }

    return undefined;
  }

  delete(key) {
    const index = this.hash(key);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return [].concat(...this.keyMap[index].splice(i, 1));
        }
      }
    }

    return null;
  }

  getKeys() {
    const keys = [];

    for (const bucket of this.keyMap) {
      if (bucket) {
        for (const item of bucket) {
          keys.push(item[0]);
        }
      }
    }

    return keys;
  }

  getValues() {
    const values = new Set();

    for (const bucket of this.keyMap) {
      if (bucket) {
        for (const item of bucket) {
          values.add(item[1]);
        }
      }
    }

    return Array.from(values);
  }

  print() {
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (const item of this.keyMap[i]) {
          console.log(`bucket ${i}: ${item}`);
        }
      }
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
// bucket 8: maroon,#800000
// bucket 8: yellow,#FFFF00
// bucket 9: coral,#EE7F74
// bucket 10: olive,#808000
// bucket 13: lightcoral,#EE7F74
// bucket 16: mediumvioletred,#C71585
console.log(hashtable.get('olive')); // #808000
console.log(hashtable.get('oliv')); // undefined
console.log(hashtable.getKeys()); // [ 'plum', 'salmon', 'maroon', 'yellow', 'coral', 'olive', 'lightcoral', 'mediumvioletred' ]
console.log(hashtable.getValues()); // [ '#DDA0DD', '#FA8072', '#800000', '#FFFF00', '#EE7F74', '#808000', '#C71585' ]
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
