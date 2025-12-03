import { useState, useEffect } from "react";

/**
 * Data fetching hook with localStorage support.
 * @param key - Unique localStorage key for caching.
 * @param fetchFunction - Async function to fetch data of type T.
 * @returns An object containing the fetched data, loading state, and any error message.
 */
export function useFetchStorage<T>(
  key: string,
  fetchFunction: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(() => {
    const cached = localStorage.getItem(key);
    return cached ? (JSON.parse(cached) as T) : null;
  });
  const [reload, setReload] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!reload) return;
      if (!data) setLoading(true);

      try {
        setReload(false);
        const result = await fetchFunction();
        setData(result);
        setError(null);
        localStorage.setItem(key, JSON.stringify(result));
      } catch (error) {
        setError("Chyba při načítání.");
        console.error(error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    }

    fetchData();
  }, [fetchFunction, reload, key, data]);

  return { data, error, loading, reload, setReload };
}
