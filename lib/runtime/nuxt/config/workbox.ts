export const workbox = (
  useWorkbox: boolean = false,
  isDev: boolean = false
) => {
  if (!useWorkbox) {
    return {}
  }

  return {
    // https://pwa.nuxtjs.org/modules/workbox.html
    dev: isDev,
    cacheNames: {
      prefix: "hackernews"
    },
    clientsClaim: true,
    config: {
      debug: isDev
    },
    offlinePage: "/offline.html",
    skipWaiting: true
  }
}
