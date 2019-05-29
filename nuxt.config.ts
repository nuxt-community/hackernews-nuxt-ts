import NuxtConfiguration from "@nuxt/config"
import { LogLevel, ensureValidLogLevel } from "./lib/runtime"
import { workbox } from "./lib/runtime/nuxt/config"

const {
  NODE_ENV = "production",
  NUXT_ENV_LOG_LEVEL = "error",
  NUXT_ENV_ENABLE_WORKBOX = "nope",
  NUXT_ENV_API_URL = "https://api.hnpwa.com/v0"
} = process.env

// https://nuxtjs.org/api/configuration-env/
const apiBaseUrl = NUXT_ENV_API_URL
const enableWorkbox: boolean = NUXT_ENV_ENABLE_WORKBOX === "true"
const isDev: boolean = NODE_ENV !== "production"
const logLevel: LogLevel = ensureValidLogLevel(NUXT_ENV_LOG_LEVEL)

const modules: string[] = ["@nuxtjs/component-cache", "@nuxtjs/axios"]
if (enableWorkbox) {
  modules.push("@nuxtjs/pwa")
}

const runtimeSwitches: { [key: string]: string | boolean } = {
  apiBaseUrl,
  enableWorkbox,
  isDev,
  logLevel,
  modules: (modules || []).join(", ")
}

if (NUXT_ENV_LOG_LEVEL === "debug") {
  process.env.DEBUG = "*,-stylus:*"
}

console.table({ ...runtimeSwitches }) // tslint:disable-line

const config: NuxtConfiguration = {
  mode: "spa",
  modern: !isDev,
  head: {
    titleTemplate: "Nuxt HN TS | %s",
    meta: [
      {
        property: "og:image",
        content:
          "https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png"
      },
      {
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        property: "twitter:site",
        content: "@nuxt_js"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  loading: {
    color: "#59cc93"
  },
  manifest: {
    name: "Nuxt Hacker News TypeScript",
    short_name: "Nuxt HN TS",
    description: "HackerNews clone built with Nuxt.js & TypeScript",
    theme_color: "#188269"
  },
  modules,
  env: {
    apiBaseUrl
  },
  axios: {
    debug: isDev,
    proxy: isDev,
    baseURL: apiBaseUrl
  },
  proxy: {
    "/api": {
      target: apiBaseUrl,
      pathRewrite: {
        "^/api/": ""
      }
    }
  },
  workbox: workbox(enableWorkbox, isDev),
  plugins: ["~/plugins/filters"],
  serverMiddleware: ["~/common/cache"],
  render: {
    http2: {
      push: true
    },
    static: {
      maxAge: isDev ? 2000 : "1m",
      setHeaders(res, path) {
        if (enableWorkbox) {
          if (path.includes("sw.js")) {
            res.setHeader("Cache-Control", `public, max-age=${15 * 60}`)
          }
        }
      }
    }
  }
}

export default config
