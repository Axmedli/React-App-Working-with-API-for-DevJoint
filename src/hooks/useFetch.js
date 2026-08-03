import { useEffect, useState } from "react";
import api from "../utils/axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(url);
        if (!ignore) setData(res.data);
      } catch {
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading };
};

export default useFetch;