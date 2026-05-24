const express = require("express")
const authRoute = require("./src/auth/auth.route")
const messageRoute = require("./src/messages/message.route")

const appRoute = express.Router()

appRoute.use("/auth", authRoute)
appRoute.use("/messages", messageRoute)

module.exports = appRoute