import { sendRedirect } from "h3";

export default async function useExternalRedirect(
  url: string,
  code = 301
): never | Promise<void> {
  if (/^https?:\/\//.test(url)) {
    if (process.server) {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        return nuxtApp.callHook("app:redirected").then(() => {
          if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        });
      }
    } else {
      window.location.href = url;
    }
  }
  throw new Error("Cannot redirect to invalid URL.");
}
