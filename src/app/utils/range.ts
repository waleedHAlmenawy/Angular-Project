export function range(num: number) {
  const pages = [];
  for (let i = 0; i < num; i++) {
    pages.push(i + 1);
  }
  return pages;
}
