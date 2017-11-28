class Tree {
  constructor(data) {
    this._root = new Node(data);
  }
}
class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}
