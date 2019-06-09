import { StoreOptions } from "vuex"
import { StoreStateRoot } from "~/lib/models"

// process.env.NUXT_ENV_API_URL + apiBasePath
// 'https://api.hackerwebapp.com' + '/api'
export const apiBasePath = "/api"

export const state = (): StoreOptions<StoreStateRoot> => ({})
