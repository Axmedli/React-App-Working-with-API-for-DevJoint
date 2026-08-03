import { useCallback, useEffect, useRef, useState } from "react";
import api from "../utils/axios";

const useInfiniteFetch = (url, limit = 12) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);
  const loaderRef = useRef(null);

  const fetchPage = useCallback(
    async (isInitial = false) => {
      try {
        isInitial ? setLoading(true) : setLoadingMore(true);

        const { data } = await api.get(url, {
          params: { limit, skip: skipRef.current },
        });

        const list = data.products || data;

        setItems((prev) => (isInitial ? list : [...prev, ...list]));
        skipRef.current += limit;
        setHasMore(skipRef.current < (data.total ?? skipRef.current));
      } catch {
      } finally {
        isInitial ? setLoading(false) : setLoadingMore(false);
      }
    },
    [url, limit]
  );

  useEffect(() => {
    skipRef.current = 0;
    fetchPage(true);
  }, [url]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchPage(false);
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading, loadingMore, fetchPage]);

  return { items, loading, loadingMore, hasMore, loaderRef };
};

export default useInfiniteFetch;