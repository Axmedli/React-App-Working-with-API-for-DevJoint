import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../utils/axios";

const useInfiniteFetch = (url, limit = 12) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);
  const loaderRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchPage = useCallback(
    async (isInitial = false) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        if (isInitial) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const { data } = await api.get(url, {
          params: { limit, skip: skipRef.current },
          signal: controller.signal,
        });

        const list = data.products || data;

        setItems((prev) => (isInitial ? list : [...prev, ...list]));
        skipRef.current += limit;
        setHasMore(skipRef.current < (data.total ?? skipRef.current));
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          if (isInitial) {
            setLoading(false);
          } else {
            setLoadingMore(false);
          }
        }
      }
    },
    [url, limit]
  );

  useEffect(() => {
    skipRef.current = 0;

    const loadInitial = async () => {
      await fetchPage(true);
    };

    loadInitial();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchPage]);

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
      observer.disconnect();
    };
  }, [hasMore, loading, loadingMore, fetchPage]);

  return { items, loading, loadingMore, hasMore, loaderRef };
};

export default useInfiniteFetch;