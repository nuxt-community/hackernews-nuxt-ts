import { StoreOptions } from "vuex"

import { StoreStateRoot } from "~/lib/models"
import * as feed from "~/store/feed"
import * as user from "~/store/feed"

// process.env.NUXT_ENV_API_URL + apiBasePath
// 'https://api.hnpwa.com/v0' + '/api'
export const apiBasePath = "/api"

export const state: StoreOptions<StoreStateRoot> = {
  modules: {
    [feed.name]: feed,
    [user.name]: user
  }
}
