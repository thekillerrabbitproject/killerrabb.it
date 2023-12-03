export const clean = (arr) =>
  arr.filter((value) => Object.keys(value).length > 0) ?? [];
