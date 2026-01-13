class Node {
  constructor(data = null, left = null, right = null) {
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

    return null;
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
    const node = this.find(value);

    const findHeight = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(findHeight(node.left), findHeight(node.right));
    };

    return findHeight(node);
  }

  findHeight(node) {
    if (node === null) return -1;
    return (
      1 + Math.max(this.findHeight(node.left), this.findHeight(node.right))
    );
  }

  findMinHeight(node) {
    if (node === null) return -1;
    return (
      1 + Math.min(this.findHeight(node.left), this.findHeight(node.right))
    );
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

    throw new Error("Not in Tree");
  }

  isBalanced(node = this.root) {
    if (node === null) return;

    if (
      this.findHeight(node.left) - this.findMinHeight(node.right) >= 2 ||
      this.findHeight(node.right) - this.findMinHeight(node.left) >= 2
    ) {
      return false;
    }

    const left_val = this.isBalanced(node.left);
    const right_val = this.isBalanced(node.right);

    if (left_val === false || right_val === false) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    let newArr = [];

    this.postOrderForEach((val) => {
      newArr.push(val.data);
    });

    newArr = [...new Set(newArr)].sort((a, b) => a - b);
    this.arr = newArr;
    this.root = this.buildTree(this.arr);
  }
}

export default Tree;
