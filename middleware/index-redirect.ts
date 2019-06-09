import { validFeeds } from "~/common/api"

export default async ({ redirect }) => {
  await redirect("/" + validFeeds[0])
}
