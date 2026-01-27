// hooks/useFetch.js
import { useEffect, useState } from "react";

export const useFetch = (apiFn, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFn(params)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [apiFn, params]);

  return { data, loading, error };
};
