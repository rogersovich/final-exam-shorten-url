// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxthq/ui",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
  ],
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "light",
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
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
    redirect: false
  },
});
