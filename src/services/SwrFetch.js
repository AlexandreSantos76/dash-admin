import useSwr from "swr";
import api from "./api";
export function useFetch(url) {
  const { data, error, mutate } = useSwr(url, async (url) => {
    const response = await api.get(url);
    return response.data;
  });
  return { data, error, mutate };
}
