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

        if (!sender || !receiver) {
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

        const senderConversations = await Conversation.findAll({
            include: [{
                model: User,
                as: "participants",
                where: { id: senderId },
                attributes: []
            }],
            attributes: ['id']
        });

        const senderConvIds = senderConversations.map(c => c.id);

        // ✅ let au lieu de const
        let conversation = null;

        if (senderConvIds.length > 0) {
            conversation = await Conversation.findOne({
                where: { id: { [Op.in]: senderConvIds } },
                include: [{
                    model: User,
                    as: "participants",
                    where: { id: receiverId },
                    attributes: []
                }]
            });
        }

        // ✅ Plus de vérification .length, on n'en a plus besoin
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

async function markAsReadService(req, res) {
    try {
        const currentUserId = req.user.id;
        const { conversationId } = req.params;

        // 1. Vérifier si la conversation existe
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) {
            return res.status(RESPONSES.NOT_FOUND.status).json({
                success: RESPONSES.NOT_FOUND.success,
                message: "Conversation non trouvée"
            });
        }

        const isMember = await conversation.hasParticipant(currentUserId);

        if (!isMember) {
            return res.status(RESPONSES.FORBIDDEN.status).json({
                success: RESPONSES.FORBIDDEN.success,
                message: "Accès refusé. Vous ne faites pas partie de cette conversation."
            });
        }

        // 3. Si c'est bon, on met à jour les messages
        const [updatedCount] = await Message.update(
            { isRead: true },
            {
                where: {
                    conversationId: conversation.id,
                    senderId: { [Op.ne]: currentUserId }, // Pas besoin de refaire un findByPk pour l'User, prends directement currentUserId
                    isRead: false
                },
            }
        );

        return res.status(RESPONSES.OK.status).json({
            success: RESPONSES.OK.success,
            message: `${updatedCount} message(s) marqué(s) comme lu(s).`,
            data: { conversationId, updatedCount }
        });

    } catch (error) {
        console.error("Erreur statut vu:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }
}

module.exports = { sendMessageService, markAsReadService };