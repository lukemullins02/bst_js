class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(this.arr);
  }

  buildTree(array) {
    let start = 0;
    let end = array.length - 1;

    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(start, mid));

    root.right = this.buildTree(array.slice(mid + 1, end + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (node.data === value) {
      throw new Error("Value already in tree");
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      node.left = this.delete(value, node.left);
    } else if (node.data < value) {
      node.right = this.delete(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let succ = node.right;

      while (succ !== null && succ.left !== null) succ = succ.left;
      node.data = succ.data;
      node.right = this.delete(succ.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    while (node) {
      if (node.data === value) {
        return node;
      }

      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    throw new Error("Not in Tree");
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback Required");
    }

    if (this.root == null) return;
    let queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      let cur = queue[0];
      if (cur.left != null) queue.push(cur.left);
      if (cur.right != null) queue.push(cur.right);
      callback(queue.shift());
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback Required");
    }

    if (node == null) return;

    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback Required");
    }

    if (node == null) return;

    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback Required");
    }

    if (node == null) return;

    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback Required");
    }

    if (node == null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(value) {
    let node = this.find(value);
  }

  depth(value, node = this.root) {
    let total = 0;
    while (node) {
      if (node.data === value) {
        return total;
      }

      if (node.data > value) {
        total++;
        node = node.left;
      } else {
        total++;
        node = node.right;
      }
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);

tree.insert(400);

prettyPrint(tree.root);

console.log(tree.depth(7));
