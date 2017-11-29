class BinaryTree {
  constructor(root) {
    this._root = new BinaryNode(root);
  }
  add(value) {}

  contains(value) {
    var found = false,
      current = this._root;
    while (!found && current) {
      if (current.data == value)
        found = true;
      else if (current.data > value)
        current = current.left;
      else if (current.data < value)
        current = current.right
    }
    return found;
  }

  remove(value) {}

  size() {}

  toArray() {}

  toString() {}
}

class BinaryNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

}

var bt = new BinaryTree('one');
bt._root.left = new BinaryNode('two');
bt._root.right = new BinaryNode('three');
console.log(bt);
