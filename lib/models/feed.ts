export interface Feed {
  comments_count: number
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
