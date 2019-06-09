/* tslint:disable: no-empty-interface */

import { Vue } from "vue-property-decorator"

// https://github.com/vuejs/vue-class-component/blob/master/example/src/shims-tsx.d.ts
declare global {
  namespace JSX {
    interface Element extends Vue.VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
