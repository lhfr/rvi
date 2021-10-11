import compileTextNode from './compileTextNode.js';

const reg = /\{\{(.*?)\}\}/g;

export default function compileNode(nodes, vm) {
  // 循环遍历当前节点的所有子节点
  for (let i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i];
    if (node.nodeType === 1) { // 元素节点
      // 递归编译子节点
      compileNode(Array.from(node.childNodes), vm);
    } else if (node.nodeType === 3 && reg.test(node.textContent)) {
      // 编译文本节点
      compileTextNode(node, vm, reg);
    }
  }
}