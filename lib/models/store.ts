import { User } from "./user"
import { Feed } from "./feed"
import { Items } from "./item"

export interface Dictionary<T> {
  [key: string]: T
}

// tslint:disable-next-line: no-empty-interface
export interface StoreStateRoot {}

export interface StoreStateUser {
  items: Dictionary<User>
}

export interface StoreStateFeed {
  feeds: Dictionary<Feed>
  items: Items
  selected: number | null
}
