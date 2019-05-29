export interface Items {
  [key: number]: Item
}

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
  type: string
  url: string
  user: string
}
