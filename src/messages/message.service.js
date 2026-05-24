const { Conversation, Message, User } = require("../../database/relations/relations.model");
const RESPONSES = require("../../messages/responses");
const { Op } = require("sequelize");
const sequelize = require("../../database/connection/connect");

async function sendMessageService(req, res) {
    const transaction = await sequelize.transaction();

    try {
        const senderId = req.user.id;
        const { receiverId, content } = req.body;
        const sender = await User.findByPk(senderId)
        const receiver = await User.findByPk(receiverId)

        if(!sender || !receiver){
            return res.status(RESPONSES.NOT_FOUND.status).json({
                success: RESPONSES.NOT_FOUND.success,
                message: "Expéditeur ou destinataire non trouvé"
            })
        }

        if (senderId === receiverId) {
            return res.status(RESPONSES.BAD_REQUEST.status).json({
                success: RESPONSES.BAD_REQUEST.success,
                message: "Vous ne pouvez pas envoyer un message à vous-même"
            })
        }

        let conversation = await Conversation.findOne({
            include: [{
                model: User,
                as: "participants",
                where: {
                    id: { [Op.in]: [senderId, receiverId] }
                }
            }]
        });

        if (conversation && conversation.participants.length !== 2) {
            conversation = null;
        }
        if (!conversation) {
            conversation = await Conversation.create({}, { transaction });

            await conversation.addParticipants([senderId, receiverId], { transaction });
        }

        const newMessage = await Message.create({
            content,
            senderId,
            conversationId: conversation.id
        }, { transaction });

        await transaction.commit();

        const messageToSend = await Message.findByPk(newMessage.id, {
            include: [{
                model: User,
                as: "sender",
                attributes: ["id", "username"]
            }]
        });

        return res.status(RESPONSES.CREATED.status).json({
            success: RESPONSES.CREATED.success,
            message: "Message envoyé avec succès",
            data: messageToSend
        });

    } catch (error) {
        await transaction.rollback();
        console.error("Erreur envoi message:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }
}

module.exports = { sendMessageService };