import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;
    fetch(url)
      .then(res => res.json())
      .then(d => active && setData(d));

    return () => (active = false);
  }, [url]);

  return { data };
}
