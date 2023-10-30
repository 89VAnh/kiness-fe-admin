export const compareNumbers = (a: any, b: any, key: string) => {
  if (!key) return a - b;
  return a[key] - b[key];
};

export const compareStrings = (a: any, b: any, key: string) => {
  const nameA = (key ? a[key] : a).toUpperCase(); // ignore upper and lowercase
  const nameB = (key ? b[key] : b).toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};
