class Queue {
  //initiates the Queue
  constructor() {
      this.items = [];
    }
    //returns true if there are no items in the queue
  isEmpty() {
      return this.items.length == 0;
    }
    //adds items in to the queue
  enqueue(item) {
      this.items.push(item);
    }
    //returns & removes the first item that is added into the queue
  dequeue() {
      return !this.isEmpty() ? this.items.shift() : undefined;
    }
    //returns the first item that is added into the queue
  peek() {
    return !this.isEmpty() ? this.items[this.items.length - 1] : undefined;
  }
}
class Tree {
  constructor(data) {
      this._root = new Node(data);
    }
    //Depth First
  traverseDF(callback) {
    (function recursive(currentNode) {
      for (var i = 0; i < currentNode.children.length; i++) {
        recursive(currentNode.children[i]);
      }
      callback(currentNode);
    })(this._root)
  }

  //Breadth First
  traverseBF(callback) {
    var q = new Queue();

    var currentNode = this._root
    while (currentNode) {
      callback(currentNode);
      for (var i = 0; i < currentNode.children.length; i++) {
        q.enqueue(currentNode.children[i]);
      }
      currentNode = q.dequeue();
    }
  }

  //add node to specified node
  add(data, toNodeDate, traversal) {
    var child = new Node(data),
      parent = null;
    traversal.call(this, function(node) {
      if (node.data == toNodeDate) {
        parent = node;
      }
    });
    if (parent) {
      child.parent = parent;
      parent.children.push(child);
    } else {
      throw new Error(toNodeDate + ' does not exist.')
    }
  }

  getIndex(data, parent, traversal) {
    var searchNode = null;
    traversal.call(this, function(node) {
      if (node.data == parent) {
        searchNode = node;
      }
    });
    if (searchNode) {
      for (var i = 0; i < searchNode.children.length; i++) {
        if (searchNode.children[i].data == data)
          return i;
      }
    } else {
      throw new Error(parent + ' could not be found');
    }
  }

  remove(node, retainChildren, traversal) {
    var searchNode = null;
    traversal.call(this, function(item) {
      if (item.data == node) {
        searchNode = item;
      }
    });
    console.log(searchNode);
    if (searchNode) {
      if (retainChildren) {
        for (var i = 0; i < searchNode.children.length; i++) {
          searchNode.children[i].parent = searchNode.parent;
          var index = this.getIndex(searchNode.data, searchNode.parent.data, traversal);
          searchNode.parent.children.push(searchNode.children[i]);
          searchNode.parent.children.splice(index, 1);
        }
      } else {
        var index = this.getIndex(searchNode.data, searchNode.parent.data, traversal);
        searchNode.children = searchNode.parent.children.splice(index, 1);
      }
    } else {
      throw new Error("Node cannot be found");
    }
  }
}
class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

//Usage
var tree = new Tree('one');
tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];

//Depth First
tree.traverseDF(function(data) {
  //console.log(data);
});

//Breadth First
tree.traverseBF(function(data) {
  //console.log(data);
});

//add a node
tree.add('eight', 'three', tree.traverseDF);
tree.add('nine', 'eight', tree.traverseDF);
tree.getIndex('three', 'one', tree.traverseDF);

tree.remove('eight', false, tree.traverseDF);
console.log(tree)
