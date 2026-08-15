import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(url, {
          signal: controller.signal,
        });
        setData(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading };
};

export default useFetch;