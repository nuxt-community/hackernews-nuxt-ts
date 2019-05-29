import { Vue, Component } from "vue-property-decorator"
import { validFeeds } from "~/common/api"

@Component({
  fetch({ redirect }) {
    // #DefaultRootRedirect
    // If you wondered how it knows how to redirect from / to /news
    // ... this is why
    redirect("/" + validFeeds[0])
  }
})
export default class Index extends Vue {}
