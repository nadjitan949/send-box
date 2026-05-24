const express = require("express")
const { sendMessageController } = require("./message.controller")
const { authMiddleware } = require("../../middleware/auth.middleware")

const messageRoute = express.Router()

messageRoute.post("/send", authMiddleware, sendMessageController)

module.exports = messageRoute