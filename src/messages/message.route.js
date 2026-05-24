const express = require("express")
const { sendMessageController, markAsReadController, updateMessageController } = require("./message.controller")
const { authMiddleware } = require("../../middleware/auth.middleware")

const messageRoute = express.Router()

messageRoute.post("/send", authMiddleware, sendMessageController)
messageRoute.patch("/conversation/read/:conversationId", authMiddleware, markAsReadController)
messageRoute.put("/update/:id", authMiddleware, updateMessageController)

module.exports = messageRoute