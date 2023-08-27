// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxthq/ui",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  imports: {
    dirs: ["composables/**", "utils/**", "types", "stores"],
  },
  supabase: {
    // redirectOptions: {
    //   login: "/auth",
    //   callback: '/callback',
    //   exclude: ["/"],
    // },
    redirect: false,
  },
})
