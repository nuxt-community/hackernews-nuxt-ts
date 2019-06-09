<template>
  <div class="user-view view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <lazy-wrapper :loading="user.loading">
        <ul class="meta">
          <li>
            <span class="label">Created:</span>
            {{ user.created_time | timeAgo }} ago
          </li>
          <li>
            <span class="label">Karma:</span>
            {{ user.karma || "-" }}
          </li>
          <li v-if="user.about" class="about" v-html="user.about"/>
        </ul>
      </lazy-wrapper>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a>
        |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

const LazyWrapper = () =>
  import(
    /* webpackChunkName: "components--lazy-wrapper" */ "~/components/lazy-wrapper.vue"
  )

@Component({
  components: {
    LazyWrapper
  },
  async fetch({
    store,
    route: {
      params: { id }
    }
  }) {
    await store.dispatch("user/FETCH_USER", { id })
  }
})
export default class UserView extends Vue {
  get user() {
    return this.$store.state.user.items[this.$route.params.id]
  }
}
</script>

<style lang="stylus">
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }

  .meta {
    list-style-type: none;
    padding: 0;
  }

  .label {
    display: inline-block;
    min-width: 4em;
  }

  .about {
    margin: 1em 0;
  }

  .links a {
    text-decoration: underline;
  }
}
</style>
