let jsData = {
  id: 18772478,
  user: "thecosas",
  time: 1545943367,
  time_ago: "19 hours ago",
  type: "comment",
  content: "<p>Test</p>",
  comments: [],
  comments_count: 0,
  level: 0,
  url: "item?id=18772478"
}

import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import Comment from "@/components/comment.vue"
// import { timeAgo } from "../plugins/filters"

describe("Comment", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Comment, {
      propsData: {
        comment: jsData
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      filters: {
        timeAgo(value) {
          return value
        }
      }
    })
  })

  test("snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  // it's also easy to check for the existence of elements

  it("renders Comment", () => {
    //console.log(wrapper.html())
    expect(wrapper.find("div.text *").html()).toBe(jsData.content)
  })
})
