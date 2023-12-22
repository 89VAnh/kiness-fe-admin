export const getOrganTree = (data: any[]) => {
  const tree: any = [];

  if (!data || data?.length === 0) return;

  data.forEach((node) => {
    const item = {
      ...node,
      id: node.key,
      value: { name: node.title },
      children: getOrganTree(node.children),
    };

    tree.push(item);
  });

  return tree;
};
