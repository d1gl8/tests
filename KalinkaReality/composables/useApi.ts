export default function useApi(url: string, options = {}) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}
