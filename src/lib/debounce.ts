import Timeout = NodeJS.Timeout;

export function debounce(func: () => void, wait = 50): ()=> void {
  let h: Timeout;
  return () => {
    clearTimeout(h);
    h = setTimeout(() => func(), wait);
  };
}
