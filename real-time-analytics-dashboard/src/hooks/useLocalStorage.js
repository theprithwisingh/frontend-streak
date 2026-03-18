import { useState } from "react";

export default function useLocalStorage(key, initial) {
  const [value] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  return [value];
}
