export interface Items {
  [key: number]: Item
}

/**
 * Type of links
 *
 * To figure out what is possible;
 *
 * https://github.com/cheeaun/node-hnapi/blob/master/lib/hnapi.js
 */
export type ItemType = "job" | "link" | "ask" | "comment" | "poll" | string

export interface Item {
  comments: any[]
  comments_count: number
  content: string
  domain: string
  id: number
  points: number
  time: number | Date | undefined
  time_ago: string
  title: string
  type: ItemType
  url: string
  user: string
}
