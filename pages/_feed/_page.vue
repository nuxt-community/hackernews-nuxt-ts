<template>
  <div class="view">
    <item-list-nav :feed="feed" :page="page" :max-page="maxPage"/>

    <lazy-wrapper :loading="loading">
      <transition :name="transition" mode="out-in">
        <div :key="displayedPage" class="news-list">
          <transition-group tag="ul" name="item">
            <item v-for="item in displayedItems" :key="item.id" :item="item"/>
          </transition-group>
        </div>
      </transition>
      <item-list-nav :feed="feed" :page="page" :max-page="maxPage"/>
    </lazy-wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"
import { Transition } from "@nuxt/vue-app-edge"
import { Route } from "vue-router"

import Item from "~/components/item.vue"
import ItemListNav from "~/components/item-list-nav.vue"
import LazyWrapper from "~/components/lazy-wrapper.vue"
import { feeds, validFeeds } from "~/common/api"

@Component({
  components: {
    Item,
    ItemListNav,
    LazyWrapper
  },
  async asyncData({ route }) {
    return {
      displayedPage: Number(route.params.page) || 1
    }
  },
  validate({ params: { feed } }) {
    return validFeeds.includes(feed)
  },
  fetch({ store, params: { feed, page = 1 } }) {
    return store.dispatch("FETCH_FEED", { feed, page })
  },
  head(this: Page) {
    return {
      title: feeds[this.$route.params.feed].title
    }
  }
})
export default class Page extends Vue {
  displayedPage: number = 1
  transition:
    | null
    | string
    | Transition
    | ((to: Route, from: Route) => string) = "slide-right"

  get feed() {
    return this.$route.params.feed
  }

  get page() {
    return Number(this.$route.params.page) || 1
  }

  get maxPage() {
    return feeds[this.feed].pages
  }

  get pageData() {
    return this.$store.state.feeds[this.feed][this.page]
  }

  get displayedItems() {
    return this.pageData.map(id => this.$store.state.items[id])
  }

  get loading() {
    return this.displayedItems.length === 0
  }

  mounted() {
    this.pageChanged(this.page)
  }

  @Watch("page")
  pageChanged(to, from = -1) {
    if (to < 0 || to > this.maxPage) {
      this.$router.replace(`/${this.feed}/1`)
      return
    }

    // Prefetch next page
    this.$store
      .dispatch("FETCH_FEED", {
        feed: this.feed,
        page: this.page + 1,
        prefetch: true
      })
      .catch(() => {})

    this.transition =
      from === -1 ? null : to > from ? "slide-left" : "slide-right"

    this.displayedPage = to
  }
}
</script>

<style lang="stylus">
.news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list {
  margin: 10px 0;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
