import { shallowMount } from "@vue/test-utils"
import Spinner from "@/components/spinner.vue"

describe("Spinner", () => {
  //   let wrapper = null

  beforeEach(() => {
    //wrapper = shallowMount(Spinner)
  })

  test("snapshot", () => {
    expect(
      shallowMount(Spinner, {
        propsData: {
          show: true
        }
      }).html()
    ).toMatchSnapshot()
  })

  // it's also easy to check for the existence of elements

  it("renders SVG if show", () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        show: true
      }
    })

    expect(wrapper.find("svg").isVisible()).toBe(true)
  })

  it("doesn't render svg if show false", () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        show: false
      }
    })

    expect(wrapper.find("svg").isVisible()).toBe(false)
  })

  afterEach(() => {
    // wrapper = null
  })
})
