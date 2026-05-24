const express = require("express")
const { signUpController, signInController } = require("./auth.controller")

const authRoute = express.Router()

authRoute.post("/sign-up", signUpController)
authRoute.post("/sign-in", signInController)

module.exports = authRoute