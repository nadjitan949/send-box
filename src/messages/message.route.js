const express = require("express")
const { sendMessageController, markAsReadController } = require("./message.controller")
const { authMiddleware } = require("../../middleware/auth.middleware")

const messageRoute = express.Router()

messageRoute.post("/send", authMiddleware, sendMessageController)
messageRoute.patch("/conversation/read/:conversationId", authMiddleware, markAsReadController)

module.exports = messageRoute