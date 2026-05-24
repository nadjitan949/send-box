const Conversation = require("../models/conversations.model");
const Message = require("../models/messages.model");
const User = require("../models/users.model");

User.belongsToMany(Conversation, { through: "ConversationMembers", foreignKey: "userId", as: "conversations"})
Conversation.belongsToMany(User, { through: "ConversationMembers", foreignKey: "conversationId", as: "participants"})

Conversation.hasMany(Message, { foreignKey: "conversationId", onDelete: "CASCADE", as: "messages" })
Message.belongsTo(Conversation, { foreignKey: "conversationId" })

User.hasMany(Message, {foreignKey: "senderId", as: "sentMessages"})
Message.belongsTo(User, {foreignKey: "senderId", as: "sender"})

module.exports = { User, Message, Conversation }