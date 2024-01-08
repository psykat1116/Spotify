import { useEffect, useState } from "react";

function useDebouce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebouce;
