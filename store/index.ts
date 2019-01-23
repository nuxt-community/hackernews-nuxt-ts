import { MutationTree, ActionTree } from "vuex"

import Vue from "vue"

import { validFeeds } from "~/common/api"
import { lazy } from "~/common/utils"
// import { CancelToken } from "axios"
const baseUrl = "https://api.hnpwa.com/v0" // "/api"

interface Dictionary<T> {
  [key: string]: T
}

// export interface Users {
//   [key: string]: User
// }
export interface User {
  created: string
  created_time: number
  id: string
  karma: number
}

export interface Items {
  [key: number]: Item
}
export interface Item {
  comments: any[]
  comments_count: number
  content: string
  domain: string
  id: number
  points: number
  time: number | Date | undefined
  time_ago: string
  title: string
  type: string
  url: string
  user: string
}

// export interface Feeds {
//   [key: string]: Feed
// }
export interface Feed {
  comments_count: number
  domain: string
  id: number
  points: number
  time: number | Date | undefined
  time_ago: string
  title: string
  type: string
  url: string
  user: string
}

export interface IRootState {
  items: Items
  users: Dictionary<User>
  feeds: Dictionary<Feed>
}
// =================================================
// State
// =================================================
const s = (): IRootState => {
  const state = {
    items: {
      /* [id: number]: Item */
    },
    users: {
      /* [id: string]: User */
    },
    feeds: {
      /* [page: number] : [ [id: number] ] */
    }
  }

  validFeeds.forEach((feed: string) => {
    state.feeds[feed] = {}
  })

  return state
}

// =================================================
// Actions
// =================================================
const mutations: MutationTree<IRootState> = {
  SET_FEED: (state, { feed, ids, page }) => {
    Vue.set(state.feeds[feed], page, ids)
  },
  SET_ITEM: (state, { item }: { item: Item }) => {
    if (item) {
      Vue.set(state.items as Item[], item.id, item)
    }
  },
  SET_ITEMS: (state, { items }: { items: Item[] }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items as Item[], item.id, item)
      }
    })
  },
  SET_USER: (state, { id, user }: { id: string; user: User }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}

// =================================================
// Mutations
// =================================================
const actions: ActionTree<IRootState, any> = {
  FETCH_FEED({ commit, state }, { feed, page, prefetch }) {
    // Don't priorotize already fetched feeds
    if (state.feeds[feed][page] && state.feeds[feed][page].length) {
      prefetch = true
    }
    if (!prefetch) {
      if ((this as any).feedCancelSource) {
        ;(this as any).feedCancelSource.cancel(
          "prioritize feed: " + feed + " page: " + page
        )
      }

      // ;(this as any).feedCancelSource = new CancelToken.source()
    }

    return lazy(
      items => {
        const ids = items.map(item => item.id)
        commit("SET_FEED", { feed, ids, page })
        commit("SET_ITEMS", { items })
      },
      () =>
        (this as any).$axios.$get(`${baseUrl}/${feed}/${page}.json`, {
          cancelToken:
            (this as any).feedCancelSource &&
            (this as any).feedCancelSource.token
        }),
      (state.feeds[feed][page] || []).map(id => state.items[id])
    )
  },

  FETCH_ITEM({ commit, state }, { id }) {
    return lazy(
      item => commit("SET_ITEM", { item }),
      () => (this as any).$axios.$get(`${baseUrl}/item/${id}.json`),
      Object.assign({ id, loading: true, comments: [] }, state.items[id])
    )
  },

  FETCH_USER({ state, commit }, { id }) {
    return lazy(
      user => commit("SET_USER", { id, user }),
      () => (this as any).$axios.$get(`${baseUrl}/user/${id}.json`),
      Object.assign({ id, loading: true }, state.users[id])
    )
  }
}

export { s as state, actions, mutations }
