import { Vue } from "vue-property-decorator"

export default Vue.extend({
  name: "Index",
  middleware: ["index-redirect"],
  render() {
    return <div />
  }
})
