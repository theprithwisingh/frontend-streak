import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataByAxios = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataByAxios();
  }, []);

  return { data, loading, error };
}
