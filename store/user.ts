import { ActionTree, MutationTree, GetterTree } from "vuex"
import Vue from "vue"

import { StoreStateRoot, StoreStateUser, User } from "~/lib/models"

import { apiBasePath } from "~/store"
import { lazy } from "~/common/utils"

export const namespaced = true

export const name = "user"

export { StoreStateUser as State }

export const types = {
  ITEM: "SET_ITEM"
}

export const state = (): StoreStateUser => {
  const out: StoreStateUser = {
    items: {
      // [id: string]: User
    }
  }

  return out
}

export const actions: ActionTree<StoreStateUser, StoreStateRoot> = {
  FETCH_USER(actionContext, { id }) {
    return lazy(
      user => actionContext.commit(types.ITEM, { id, user }),
      () => (this as any).$axios.$get(`${apiBasePath}/user/${id}.json`),
      Object.assign({ id, loading: true }, actionContext.state.items[id])
    )
  }
}

export const getters: GetterTree<StoreStateUser, StoreStateRoot> = {}

export const mutations: MutationTree<StoreStateUser> = {
  [types.ITEM]: (
    mutationStateContext,
    { id, user }: { id: string; user: User }
  ) => {
    Vue.set(mutationStateContext.items, id, user || false) // false means user not found
  }
}
