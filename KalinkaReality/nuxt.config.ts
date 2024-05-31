// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  css: ["~/assets/styles/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;',
        },
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.css",
  },
});
