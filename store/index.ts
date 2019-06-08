import { StoreOptions } from "vuex"
import { StoreStateRoot } from "~/lib/models"

// process.env.NUXT_ENV_API_URL + apiBasePath
// 'https://api.hnpwa.com/v0' + '/api'
export const apiBasePath = "/api"

export const state = (): StoreOptions<StoreStateRoot> => ({})
