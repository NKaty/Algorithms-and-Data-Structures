class TrieNode {
  constructor(character, isWord = false) {
    this.character = character;
    this.characters = {};
    this.isWord = isWord;
  }

  getSubNode(char) {
    return this.characters[char];
  }

  addSubNode(char, isWord = false) {
    if (!this.getSubNode(char)) this.characters[char] = new TrieNode(char, isWord);
    else this.characters[char].isWord = this.characters[char].isWord || isWord;

    return this.characters[char];
  }

  removeSubNode(char) {
    const subNode = this.getSubNode(char);

    if (subNode && !subNode.isWord && !subNode.hasSubNodes()) {
      delete this.characters[char];
      return subNode;
    }

    return false;
  }

  hasSubNodes() {
    return !!Object.keys(this.characters).length;
  }
}

module.exports = TrieNode;
