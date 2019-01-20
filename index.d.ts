import Vue, { ComponentOptions } from "vue"
import { Context, Transition } from "@nuxt/vue-app-edge"
import { Route } from "vue-router"
import { Store } from "vuex"
// todo use the below instead of any oncse this is resolved https://github.com/nuxt-community/axios-module/pull/143
import { NuxtAxiosInstance } from "@nuxtjs/axios"

import { CancelToken } from "axios"
declare module "axios" {
  export const CancelToken: CancelToken
}

export { Vue, Context, Transition, Route }

declare module "vue/types/vue" {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
