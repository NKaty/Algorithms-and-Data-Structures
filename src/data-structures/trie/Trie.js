// Trie - implementation using TrieNode class

// Implement the following on the Trie class

// addWord
// This function should add the given word starting from the given index to the Trie.
// It will be recursive and notify the correct child of this Trie to add the word
// starting from a later index. Consider what the add function should do
// when it reaches the end of the word as a word does not necessarily end at a leaf.
// You must mark nodes which are the ends of words so that the words can be reconstructed later.

// getWords
// This function should return an array of all of the words in the Trie.

// findWord
// This function should accept a string and return the characters object
// for the last character in that word if the string is a word in the Trie,
// otherwise - undefined. Try to solve this without having to find every single word in the Trie.

// removeWord
// This function should accept a string and remove the word from the Trie.

// autocomplete
// This function should accept a string and return an array of all the possible
// options in the trie for that string.

const TrieNode = require('./Trie-node');

class Trie {
  constructor() {
    this.root = new TrieNode('');
  }

  addWord(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      currentNode = currentNode.addSubNode(word[i], i === word.length - 1);
    }

    return this;
  }

  removeWord(word) {
    this._removeWord(word);

    return this;
  }

  _removeWord(word, node = this.root, index = 0) {
    const nextNode = node.getSubNode(word[index]);

    if (!nextNode) return false;

    if (word.length - 1 > index) {
      return this._removeWord(word, nextNode, index + 1) && node.removeSubNode(word[index]);
    }

    nextNode.isWord = false;

    return node.removeSubNode(word[index]);
  }

  getWords() {
    return this._getWords();
  }

  _getWords(node = this.root, currentWord = '', words = []) {
    for (const char in node.characters) {
      if (Object.prototype.hasOwnProperty.call(node.characters, char)) {
        const nextWord = currentWord + char;
        const subNode = node.getSubNode(char);

        if (subNode.isWord) words.push(nextWord);

        this._getWords(subNode, nextWord, words);
      }
    }

    return words;
  }

  countWords() {
    return this._getWords().length;
  }

  findSequence(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!currentNode) return currentNode;
      currentNode = currentNode.getSubNode(word[i]);
    }

    return currentNode;
  }

  findWord(word) {
    const lastChar = this.findSequence(word);

    return lastChar && lastChar.isWord ? lastChar : undefined;
  }

  autoComplete(prefix) {
    const subNode = this.findSequence(prefix);

    return subNode ? this._getWords(subNode, prefix) : [];
  }

  print() {
    console.log(this.getWords());
  }
}

const trie = new Trie();

trie.addWord('fun');
trie.addWord('fast');
trie.addWord('fat');
trie.addWord('fate');
trie.addWord('father');
trie.addWord('forget');
trie.addWord('awesome');
trie.addWord('argue');

console.log(trie.getWords()); // ["fun", "fast", "fat", "fate", "father", "forget", "awesome", "argue"]
console.log(trie.countWords()); // 8
console.log(trie.findWord('fat').character); // t
trie.removeWord('fat');
console.log(trie.findWord('fat')); // undefined
console.log(trie.findSequence('fat').character); // t
trie.removeWord('argue');
trie.print(); // [ 'fun', 'fast', 'fate', 'father', 'forget', 'awesome' ]
console.log(trie.autoComplete('fa')); // [ 'fast', 'fate', 'father' ]
