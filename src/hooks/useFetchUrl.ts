import { useCallback } from 'react';

const useFetchUrl = () => {
  return useCallback(async <T,>(url: string, callback: (data: T) => void) => {
    const res = await fetch(url);
    const data = await res.json() as T;
    callback(data);
  }, []);
};

export default useFetchUrl;
