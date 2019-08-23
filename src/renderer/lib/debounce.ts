export function debounce(func: () => void, wait = 50): () => void {
  let h: any;
  return () => {
    clearTimeout(h);
    h = setTimeout(() => func(), wait);
  };
}
