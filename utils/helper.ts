export function isPathMatch(currentPath: string, pageRoute: string): boolean {
  const regex = new RegExp(`^${pageRoute.replace(/\//g, "\\/")}(\/.*)?$`);
  return regex.test(currentPath);
}

import { useState, useEffect } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
