// Trie

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

class Trie {
  constructor(isWord = false) {
    this.characters = {};
    this.isWord = isWord;
  }

  addWord(word, index = 0) {
    if (word.length === index) return this;

    const char = word[index];
    let subTrie;

    if (this.characters[char]) {
      subTrie = this.characters[char];
      subTrie.isWord = subTrie.isWord || word.length - 1 === index;
    } else {
      subTrie = new Trie(word.length - 1 === index);
      this.characters[char] = subTrie;
    }

    subTrie.addWord(word, index + 1);

    return this;
  }

  removeWord(word) {
    this._removeWord(word);

    return this;
  }

  _removeWord(word, index = 0) {
    const char = word[index];
    const subTrie = this.characters[char];

    if (!subTrie) return false;

    if (word.length - 1 > index) {
      return subTrie._removeWord(word, index + 1) &&
      !subTrie.isWord && !Object.keys(subTrie.characters).length
        ? delete this.characters[char]
        : false;
    }

    subTrie.isWord = false;

    return !Object.keys(subTrie.characters).length ? delete this.characters[char] : false;
  }

  getWords(currentWord = '', words = []) {
    for (const char in this.characters) {
      if (Object.prototype.hasOwnProperty.call(this.characters, char)) {
        const nextWord = currentWord + char;
        const subTrie = this.characters[char];

        if (subTrie.isWord) words.push(nextWord);

        subTrie.getWords(nextWord, words);
      }
    }

    return words;
  }

  countWords() {
    return this.getWords().length;
  }

  findSequence(word, index = 0) {
    const char = word[index];
    const subTrie = this.characters[char];

    if (word.length - 1 > index && subTrie) return subTrie.findSequence(word, index + 1);

    return subTrie;
  }

  findWord(word) {
    const lastChar = this.findSequence(word);

    return lastChar && lastChar.isWord ? lastChar : undefined;
  }

  autoComplete(prefix) {
    const subTrie = this.findSequence(prefix);

    return subTrie ? subTrie.getWords(prefix) : [];
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
console.log(trie.findWord('fat').isWord); // true
trie.removeWord('fat');
console.log(trie.findWord('fat')); // undefined
console.log(trie.findSequence('fat').isWord); // false
trie.removeWord('argue');
trie.print(); // [ 'fun', 'fast', 'fate', 'father', 'forget', 'awesome' ]
console.log(trie.autoComplete('fa')); // [ 'fast', 'fate', 'father' ]
