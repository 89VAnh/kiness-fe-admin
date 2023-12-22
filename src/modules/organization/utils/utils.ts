import { DataNode } from "antd/es/tree";

export const getNodeFromTree = (tree: DataNode[], node_id: string): any => {
  const stack: DataNode[] = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node?.key === node_id) {
      return node;
    }

    if (node?.children) {
      stack.push(...node.children);
    }
  }

  return null;
};
