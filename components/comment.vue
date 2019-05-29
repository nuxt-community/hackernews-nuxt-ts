<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.user">{{ comment.user }}</router-link>
      {{ comment.time | timeAgo }} ago
    </div>
    <div class="text" v-html="comment.content"/>
    <div
      v-if="comment.comments && comment.comments.length"
      :class="{ open }"
      class="toggle"
    >
      <a
        @click="open = !open"
      >
        <!--
          We want minimal things going on here
          So that when it's time to do i18n, it's just
          going to be a matter of making sure we pass
          strings through i18n’s $t() helpers.
        -->
        {{ pluralize(open, comment.comments.length) }}
      </a>
    </div>
    <ul v-show="open" class="comment-children">
      <comment
        v-for="childComment in comment.comments"
        :key="childComment.id"
        :comment="childComment"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class Comment extends Vue {
  @Prop({ type: Object, required: true })
  comment: any

  open: boolean = true

  pluralize (open, n) {
    // Should we have vue-i18n;
    // We could also leverage Intl.NumberFormat
    // https://kazupon.github.io/vue-i18n/guide/number.html#custom-formatting
    const number = n // this.$n(n)

    // Should we have vue-i18n;
    // We could use vue-i18n $tc helper
    // Assuming 'replies' would be 'Replies collapsed | Reply collapsed | Replies collapsed'
    // https://kazupon.github.io/vue-i18n/guide/pluralization.html
    const textContent = n === 1 ? 'reply' : 'replies' // this.$tc('replies', n)

    const append = open ? '' : 'collapsed' // this.$t('collapsed')

    return `${number} ${textContent} ${append}`.trim()
  }
}
</script>

<style lang="stylus">
.comment-children {
  .comment-children {
    margin-left: 1.5em;
  }
}

.comment {
  border-top: 1px solid #eee;
  position: relative;

  .by, .text, .toggle {
    font-size: 0.9em;
    margin: 1em 0;
  }

  .by {
    color: #828282;

    a {
      color: #828282;
      text-decoration: underline;
    }
  }

  .text {
    overflow-wrap: break-word;

    a:hover {
      color: #ff6600;
    }

    pre {
      white-space: pre-wrap;
    }
  }

  .toggle {
    background-color: #fffbf2;
    padding: 0.3em 0.5em;
    border-radius: 4px;

    a:before {
      // +
      // https://unicode-table.com/en/002B/
      content: '\002B';
    }

    a {
      color: #828282;
      cursor: pointer;
    }

    &.open {
      background-color: transparent;
      a:before {
        // −
        // https://unicode-table.com/en/2212/
        content: '\2212';
      }
    }
  }
}
</style>
