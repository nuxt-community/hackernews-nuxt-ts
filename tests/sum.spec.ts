import sum from "./sum"

describe("sum", () => {
  it("create sum of 2 numbers", () => {
    expect(sum(15, 8)).toBe(23)
  })
})
