import { Vue, Component } from "vue-property-decorator"
import { validFeeds } from "~/common/api"

@Component({
  fetch({ redirect }) {
    redirect("/" + validFeeds[0])
  }
})
export default class Index extends Vue {}
