import { ActionTree, MutationTree, GetterTree } from "vuex"
import Vue from "vue"

import { StoreStateRoot, StoreStateFeed, Item } from "~/lib/models"

import { apiBasePath } from "~/store"
import { lazy } from "~/common/utils"

import { validFeeds } from "~/common/api"

export const namespaced = true

export const name = "feed"

export { StoreStateFeed as State }

export const types = {
  SELECT: "SELECT",
  FEED: "SET_FEED",
  ITEM: "SET_ITEM",
  ITEMS: "SET_ITEMS"
}

export const state = (): StoreStateFeed => {
  const out: StoreStateFeed = {
    feeds: {
      // [page: number] : [ [id: number] ]
    },
    items: {
      // [id: number]: Item
    },
    selected: null
  }

  validFeeds.forEach((feed: string) => {
    // @ts-ignore
    out.feeds[feed] = {}
  })

  return out
}

export const actions: ActionTree<StoreStateFeed, StoreStateRoot> = {
  FETCH_FEED(actionContext, { feed, page, prefetch = false }) {
    // Don't priorotize already fetched feeds
    if (
      actionContext.state.feeds[feed][page] &&
      actionContext.state.feeds[feed][page].length
    ) {
      prefetch = true
    }
    if (!prefetch) {
      if ((this as any).feedCancelSource) {
        ;(this as any).feedCancelSource.cancel(
          "prioritize feed: " + feed + " page: " + page
        )
      }
    }

    return lazy(
      items => {
        const ids = items.map(item => item.id)
        actionContext.commit(types.FEED, { feed, ids, page })
        actionContext.commit(types.ITEMS, { items })
      },
      () =>
        (this as any).$axios.$get(`${apiBasePath}/${feed}?page=${page}`, {
          cancelToken:
            (this as any).feedCancelSource &&
            (this as any).feedCancelSource.token
        }),
      (actionContext.state.feeds[feed][page] || []).map(
        id => actionContext.state.items[id]
      )
    )
  },

  FETCH_ITEM(actionContext, { id }) {
    return lazy(
      item => {
        actionContext.commit(types.SELECT, item.id)
        actionContext.commit(types.ITEM, { item })
      },
      () => (this as any).$axios.$get(`${apiBasePath}/item/${id}`),
      Object.assign(
        { id, loading: true, comments: [] },
        actionContext.state.items[id]
      )
    )
  }
}

export const getters: GetterTree<StoreStateFeed, StoreStateRoot> = {}

export const mutations: MutationTree<StoreStateFeed> = {
  [types.FEED]: (mutationStateContext, { feed, ids, page }) => {
    Vue.set(mutationStateContext.feeds[feed], page, ids)
  },
  [types.ITEM]: (mutationStateContext, { item }: { item: Item }) => {
    if (item) {
      Vue.set(mutationStateContext.items as Item[], item.id, item)
    }
  },
  [types.ITEMS]: (mutationStateContext, { items }: { items: Item[] }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(mutationStateContext.items as Item[], item.id, item)
      }
    })
  },
  [types.SELECT](mutationStateContext, id: number | null = null) {
    mutationStateContext.selected = id
  }
}
