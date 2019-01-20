import { Vue, Component } from "nuxt-property-decorator"
import { Context } from "index.d.ts"
import { validFeeds } from "~/common/api.js"

@Component({})
export default class Index extends Vue {
  fetch({ redirect }: Context) {
    redirect("/" + validFeeds[0])
  }
}
