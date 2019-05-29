importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1abab74cd51974da0206.js",
    "revision": "557bdda489206c900bcceab4ff44ce3b"
  },
  {
    "url": "/_nuxt/214562f464925e079ff7.js",
    "revision": "d0aa38ce04e068e98ce1ff36ea484181"
  },
  {
    "url": "/_nuxt/254337515b71f52daa8a.js",
    "revision": "1c999dc447eef60f5bd8af8beb5eecf7"
  },
  {
    "url": "/_nuxt/2a2450d4fb3fbfb1e5f5.js",
    "revision": "a8fe2292c3eb9942902e8be1f05acf45"
  },
  {
    "url": "/_nuxt/342de9b9a9c58ec86a31.js",
    "revision": "37094f6153a24c03adab8b825453b217"
  },
  {
    "url": "/_nuxt/395db6a2893fabcfc190.js",
    "revision": "ac8e7581deba64726ff13ebcac6b5509"
  },
  {
    "url": "/_nuxt/550e87311c2c8f235fa4.js",
    "revision": "67539de5d7aae18c87cc3c02dba0d5d5"
  },
  {
    "url": "/_nuxt/59b1b88d8cec232f2c46.js",
    "revision": "272e17a2d3e16c4cc257862ddc22504d"
  },
  {
    "url": "/_nuxt/5c5a20327358fb6477c0.js",
    "revision": "67c5318b427e76925f4cade488191e19"
  },
  {
    "url": "/_nuxt/5d035581c0aa61ae5ea1.js",
    "revision": "5ccc662733309e1ffc215cd791535c56"
  },
  {
    "url": "/_nuxt/5efe1118a976bdde9d46.js",
    "revision": "ceafdf897ff1c3f5b87fbf318c7196e7"
  },
  {
    "url": "/_nuxt/62757b38d728c4307ee4.js",
    "revision": "8df75b4cb97fba0fe3b174a536f9247d"
  },
  {
    "url": "/_nuxt/864d4d296e1b72e82cf1.js",
    "revision": "8240f71cbb39702e6e51762d6c2352ff"
  },
  {
    "url": "/_nuxt/882bb4afdd43200abd48.js",
    "revision": "db008c6139c77463213410417c909515"
  },
  {
    "url": "/_nuxt/90b254054fa84a546226.js",
    "revision": "5f944d0052f34269799b387940a40f03"
  },
  {
    "url": "/_nuxt/a815016091faf904639c.js",
    "revision": "b7b59dc2b5982c4f10ceedf76a49cfa3"
  },
  {
    "url": "/_nuxt/c872c75dbdc7075dfe61.js",
    "revision": "c61751dd0e06f29f1bdc49b974d13b6c"
  },
  {
    "url": "/_nuxt/cc666139f91f22411b93.js",
    "revision": "4f75037d933e8f53d87ba1d78232a9d1"
  },
  {
    "url": "/_nuxt/dc8dfdec92ff14a9cdfb.js",
    "revision": "e83612dcc43f894523c37695d090ea5f"
  },
  {
    "url": "/_nuxt/dce7e694a7f268d9982b.js",
    "revision": "910e67fbac39f75fb72a2ed76fc5be1e"
  },
  {
    "url": "/_nuxt/dec6b4c445d95c57eebc.js",
    "revision": "0cfe1096c324d3dbb88d605b8b0d9040"
  },
  {
    "url": "/_nuxt/f521f1651b8c3abf254d.js",
    "revision": "69dd07f4f9dece07cc699d5f059e63b7"
  }
], {
  "cacheId": "hackernews-nuxt-ts",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
