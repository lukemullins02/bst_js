import Tree from "./bst.js";

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

const arr = [];

for (let i = 0; i < 100; i++) {
  arr.push(Math.floor(Math.random() * 100));
}

const tree = new Tree(arr);

tree.insert(106);
tree.insert(107);
tree.insert(108);

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

tree.delete(52);

prettyPrint(tree.root);
