const express = require("express")
const authRoute = require("./src/auth/auth.route")

const appRoute = express.Router()

appRoute.use("/auth", authRoute)

module.exports = appRoute