export default defineNuxtPlugin(() => {
  const $api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    onRequest({ request, options: { params } }) {
      params && console.log("query params", params);
    },
    onResponse({ request, options: { params } }) {},
    onResponseError({ response }) {},
  });
  return {
    provide: {
      api: $api,
    },
  };
});
