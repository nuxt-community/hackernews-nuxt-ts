// @ts-ignore
import express from "express"
import apicache from "apicache"

const app = express()

// https://github.com/kwhitley/apicache
app.use(apicache.middleware("15 minutes"))

const { NODE_ENV = "development" } = process.env

const debug = /^dev/i.test(NODE_ENV)

apicache.options({ debug })

export default {
  path: "/api/",
  handler: app
}
