# Nuxt Hacker News TS

HackerNews clone built with Nuxt.js and TypeScript showcasing best practices of developing real life modern isomorphic Web Apps with [Nuxt](https://github.com/nuxt/nuxt.js). It features integrations with [TsLint](https://palantir.github.io/tslint/) (linting), [Prettier](https://prettier.io/) (code formatting), [Jest](https://jestjs.io/) (testing), [Axios](https://github.com/nuxt-community/axios-module) (http calls on steroids), [Storybook](https://storybook.js.org/)\* (component playground).

<p align="center">
  <a href="https://codesandbox.io/s/github/nuxt-community/hackernews-nuxt-ts" target="_blank">
    <img src="https://user-images.githubusercontent.com/5158436/27347011-428833aa-5604-11e7-9f43-a12e576e9b18.png" width="256px"
    ><br>
    Live Demo
  </a>
</p>

## Performance

Coming soon

## Features

- Server Side Rendering & Caching
- Code Splitting
- Single-file Vue Components
- Real-time List Updates with FLIP Animation
- Prefetch/Preload JS + DNS + Data
- Critical Path CSS
- PWA experience using [PWA Module](https://github.com/nuxt-community/pwa-module) with almost _zero config_
- Enable optionnaly PWA, e.g. for development that's orthogonal to PWA features
- PRPL
- Hot reloading dev environment
- [TSLint](https://palantir.github.io/tslint/) and [Prettier](https://prettier.io/) integration
- TypeScript 3
- VSCode TypeScript bindings
- Storybook Integration (Coming Soon)
- Snapshot and Unit Tests with Jest and [Vue-Test-Utils](https://vue-test-utils.vuejs.org/) (Coming Soon)
- VSCode setup for build into production, and run in dev with debugging helpers and logging

## Build Setup

**Requires Node.js 6+**

```bash
# install dependencies
yarn

# serve in dev mode, with hot reload at localhost:3000
yarn dev

# build for production
yarn build

# serve in production mode
yarn start

# run unit tests
yarn test

# validate code with TSLint (with Prettier)
yarn lint

# validate and fix with TSLint (with Prettier)
yarn lintfix
```

### Production build

#### SPA

```bash
yarn
yarn build
```

## Links

For [Nuxt.js version, go to **nuxt/hackernews**](https://github.com/nuxt/hackernews)

This repository is originally ported from [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) and [HackerNews Nuxt](https://github.com/nuxt/hackernews)

## Docs

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vuex-class](https://github.com/ktsn/vuex-class/)
- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-i18n](https://github.com/kazupon/vue-i18n) ([docs](https://kazupon.github.io/vue-i18n/))

### Useful _TypeScript_ + _Nuxt.js_ community curated examples

- [nuxt-community/typescript-template](https://github.com/nuxt-community/typescript-template)
- [nuxt-community/pwa-module](https://github.com/nuxt-community/pwa-module) ([docs](https://pwa.nuxtjs.org/modules/workbox.html))
- [**nuxt/nuxt.js** in _examples/typescript_](https://github.com/nuxt/nuxt.js/tree/dev/examples/typescript)
- [**nuxt/nuxt.js** in _examples/typescript-vuex_](https://github.com/nuxt/nuxt.js/tree/dev/examples/typescript-vuex)

### Other useful _TypeScript_ + _Nuxt.js_ boilerplate/starter-kit projects

- [hisasann/typescript-nuxtjs-boilerplate](https://github.com/hisasann/typescript-nuxtjs-boilerplate)

### Other relevant links to the topic

- https://stackoverflow.com/q/52863117/852395

## License

MIT
